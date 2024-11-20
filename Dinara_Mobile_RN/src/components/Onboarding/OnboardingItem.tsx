import { View, Image } from "react-native";
import JkButton from "@components/ZCommon/JkButton";
import Typography from "@components/ZCommon/Typography";
import Animated, {
  FadeInLeft,
  FadeOutRight,
  FlipInEasyY,
  FlipOutEasyY,
} from "react-native-reanimated";
import { TOnboardingScreenTitles } from "@/(OnboardingFlow)/OnboardingScreen";

interface IOnboardingItemProps {
  itemTitle: TOnboardingScreenTitles;
  itemDescription: string;
  errorDescription?: boolean;
  buttonText: string;
  onContinue: () => void;
  onSkip?: () => void;
  disabledButton?: boolean;
}

export default function OnboardingItem({
  itemTitle,
  itemDescription,
  errorDescription,
  onContinue,
  buttonText,
  onSkip,
  disabledButton = false,
}: IOnboardingItemProps) {
  const sourceIcon = () => {
    switch (itemTitle) {
      case "Enable Notifications":
        return require("@assets/notificationsIcon.png");
      case "Biometric Authentication":
        return require("@assets/touchIdIcon.png");
      case "Enabled Secure Crypto Processor":
        return require("@assets/secureIcon.png");
      case "Success":
      case "End Setup":
        return require("@assets/successIcon.png");
      default:
        console.warn("no icon found");
    }
  };

  return (
    <>
      <Animated.View
        style={{
          marginTop: "auto",
          alignSelf: "center",
        }}
        entering={FlipInEasyY.delay(150)}
        exiting={FlipOutEasyY.delay(150)}
        key={itemTitle + Math.random().toString()}
      >
        <Image source={sourceIcon()} />
      </Animated.View>

      <Animated.View
        entering={FadeInLeft}
        exiting={FadeOutRight}
        key={itemTitle + Math.random().toString()}
      >
        <Typography
          weight="semiBold"
          size={20}
          color="#00e29e"
          sx={{ marginTop: 50, marginBottom: 20 }}
        >
          {itemTitle}
        </Typography>
      </Animated.View>
      <Animated.View
        entering={FadeInLeft.delay(150)}
        exiting={FadeOutRight}
        key={itemTitle + Math.random().toString()}
        style={{ marginHorizontal: 10 }}
      >
        {errorDescription &&
          (itemTitle === "Biometric Authentication" ||
            itemTitle === "End Setup") && (
            <Typography weight="semiBold" color="#E00043">
              Error
            </Typography>
          )}
        <Typography
          weight="extraLight"
          color={
            errorDescription && itemTitle === "Biometric Authentication"
              ? "#efce6c"
              : undefined
          }
        >
          {itemDescription}
        </Typography>
      </Animated.View>
      <View
        style={{
          width: "100%",
          marginTop: 30,
          marginBottom: 30,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <JkButton
          title={buttonText}
          onPress={onContinue}
          variant="contained"
          sx={{ marginTop: 20 }}
          disabled={
            (process.env.NODE_ENV !== "development" &&
              errorDescription &&
              itemTitle === "Biometric Authentication") ||
            disabledButton
          }
        />
        {onSkip && (
          <JkButton
            title="Skip"
            onPress={onSkip}
            variant="outlined"
            sx={{ marginTop: 20 }}
          />
        )}
      </View>
    </>
  );
}
