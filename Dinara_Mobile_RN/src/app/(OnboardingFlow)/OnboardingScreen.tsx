import { useState } from "react";
import Constants from "expo-constants";
import { router, Stack } from "expo-router";
import OnboardingItem from "@components/Onboarding/OnboardingItem";
import { Platform, SafeAreaView } from "react-native";
import StepIndicator from "@components/Onboarding/StepIndicator";
import registerForPushNotificationsAsync from "@components/Onboarding/registerForPushNotificationsAsync";
import { biometricAuthentication } from "src/utils/biometrics";
import { IUserData } from "@components/ZCommon/commonTypes/commonTypes";
import parseJwt from "src/utils/parseJWT";
import axios from "axios";
import Erroring from "@components/ZCommon/Erroring";
import useBiometricsStore from "src/stores/biometricsStore";
import useUserInfoStore from "src/stores/userInfoStore";
import useAppConfigStore from "src/stores/applicationConfigStore";
import identifyEnvURL from "src/utils/identifyEnvURL";
import { getPublicKey } from "../../../modules/crypto-keep/index";

export type TOnboardingScreenTitles =
  | "Enable Notifications"
  | "Biometric Authentication"
  | "Enabled Secure Crypto Processor"
  | "End Setup"
  | "Success";

interface IOnboardingItems {
  title: TOnboardingScreenTitles;
  description: string;
  onContinue: () => void;
  buttonText: string;
  onSkip?: () => void;
  disabledButton?: boolean;
}

export default function OnboardingScreen() {
  const version = Constants.expoConfig?.version;
  const getUserInfo = useUserInfoStore((state) => state.getUserInfo);
  const hasBiometricsEnrolled = useBiometricsStore(
    (state) => state.hasBiometricsEnrolled
  );
  const hasCompatibleHardware = useBiometricsStore(
    (state) => state.hasCompatibleHardware
  );
  const environment = useAppConfigStore((state) => state.env);
  const setConfigurationComplete = useAppConfigStore(
    (state) => state.setConfigurationComplete
  );
  const configurationComplete = useAppConfigStore(
    (state) => state.configurationComplete
  );

  const notCompatibleOrEnrolled =
    !hasCompatibleHardware || !hasBiometricsEnrolled;

  const [screenIndex, setScreenIndex] = useState(0);
  const [loadingRegisterDevice, setLoadingRegisterDevice] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [publicKey, setPublicKey] = useState<String | null>(null);

  const chooseAuthenticationDescription = () => {
    switch (true) {
      case !hasCompatibleHardware && environment === "dev":
        return "Your device does not support biometric authentication. Please use your password to continue.";
      case !hasBiometricsEnrolled:
        return "Unable to complete setup. Your device does not have saved fingerprints or facial data to use for authentication. Please close the app, add them in your device settings and try again.";
      default:
        return `Test ${
          Platform.OS === "ios"
            ? "Face ID, Touch ID or Optic ID"
            : "face or fingerprint authentication"
        } for securely logging in and signing transactions.`;
    }
  };

  const onboardingItems: IOnboardingItems[] = [
    {
      title: "Enable Notifications",
      description:
        "We need your permission to send you notifications about your transactions and account activity.",
      onContinue: async () => {
        // TODO: what to do with the push token? {"type":"expo"; "data":string}
        // expo token remains same on redo onboarding by default
        const expoPushToken = await registerForPushNotificationsAsync(
          environment
        );
        setScreenIndex((prev: number) => prev + 1);
      },
      buttonText: "Enable",
      onSkip: () => {
        setScreenIndex((prev: number) => prev + 1);
      },
    },
    {
      title: "Enabled Secure Crypto Processor",
      description:
        // TODO: change copy
        "We are generating your high security keys and storing them within the Titan M/M2 chip inside your device.",
      onContinue: () => {
        const createdKey = getPublicKey();
        // public key remains same on redo onboarding by default
        setPublicKey(
          createdKey === "There was an error trying to load keys from KeyChain."
            ? null
            : createdKey
        );
        console.log("public key", createdKey);
        setScreenIndex((prev: number) => prev + 1);
      },
      buttonText: "Continue",
    },
    {
      title: "Biometric Authentication",
      description: chooseAuthenticationDescription(),
      onContinue: async () => {
        const authResult = await biometricAuthentication();
        switch (true) {
          case typeof authResult === "string":
            setErrorMessage(authResult);
            break;
          // @ts-ignore
          case authResult?.error:
            // @ts-ignore
            alert(authResult.warning);
            break;
          // @ts-ignore
          case authResult?.success:
            setScreenIndex((prev: number) => prev + 1);
            break;
          default:
            // do something else
            setScreenIndex((prev: number) => prev + 1);
        }
      },
      buttonText: notCompatibleOrEnrolled ? "Continue" : "Test",
    },
    {
      title: notCompatibleOrEnrolled ? "End Setup" : "Success",
      description: notCompatibleOrEnrolled
        ? "Your device has not been not been set up correctly. Please close the app and try again."
        : "Your digital vault is now ready and your device has been paired. Transactions and account activity from your Dinara console will appear on the List View for approval.",
      onContinue: async () => {
        await getUserInfo(environment);
        setLoadingRegisterDevice(true);

        const userInfo = useUserInfoStore.getState().userInfo;
        if (userInfo && !configurationComplete) {
          const parsedUserInfo: IUserData = parseJwt(userInfo)?.payload;
          const body = {
            publicKey,
            platform: Platform.OS.toUpperCase(),
            version: version,
            supportsLoginCode: true,
          };

          console.log(`Registering...  ${JSON.stringify(body)}`);

          await axios
            .put(
              `${identifyEnvURL(environment)}/api/device-manager/devices/${
                parsedUserInfo.deviceId
              }/register`,
              body,
              {
                headers: {
                  "Content-Type": "application/json",
                  Signature: userInfo,
                },
              }
            )
            .then(async (res) => {
              console.log("Response from register: ", res.data);
              await setConfigurationComplete(true, environment);
              if (res.data) router.replace("/");
            })
            .catch((e) => {
              // setUserInfo("", environment); dont delete userInfo because a rescan of qr requires disable device
              setLoadingRegisterDevice(false);
              setErrorMessage(e.message);
            });
        } else if (userInfo && configurationComplete) {
          setConfigurationComplete(true, environment);
          router.replace("/");
        } else {
          console.log("No Request made");
          setConfigurationComplete(false, environment);
          setLoadingRegisterDevice(false);
          setErrorMessage(
            "There is no user information associated with this device."
          );
        }
      },
      buttonText: notCompatibleOrEnrolled ? "End Setup" : "Complete Setup",
      disabledButton: loadingRegisterDevice,
    },
  ];

  if (errorMessage) {
    return <Erroring errorMessage={errorMessage} allowRedirect />;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#09090e",
        padding: 20,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Stack.Screen options={{ headerShown: false }} />

      <StepIndicator screenIndex={screenIndex} />

      <OnboardingItem
        itemTitle={onboardingItems[screenIndex].title}
        itemDescription={onboardingItems[screenIndex].description}
        errorDescription={notCompatibleOrEnrolled}
        onContinue={onboardingItems[screenIndex].onContinue}
        buttonText={onboardingItems[screenIndex].buttonText}
        onSkip={onboardingItems[screenIndex].onSkip}
      />
    </SafeAreaView>
  );
}
