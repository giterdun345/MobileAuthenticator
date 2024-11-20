import { useState, useEffect } from "react";
import { router } from "expo-router";
import { View } from "react-native";
import JkButton from "@components/ZCommon/JkButton";
import axios from "axios";
import parseJwt from "src/utils/parseJWT";
import LoadingScreen from "@components/ZCommon/LoadingScreen";
import Erroring from "@components/ZCommon/Erroring";
import useAppConfigStore from "src/stores/applicationConfigStore";
import useUserInfoStore from "src/stores/userInfoStore";
import identifyEnvURL from "src/utils/identifyEnvURL";
import { provideSignature } from "modules/crypto-keep";
import { biometricAuthentication } from "src/utils/biometrics";

export default function ApproveRejectButtons({
  code,
  approvalId,
}: {
  code?: string;
  approvalId: string;
}) {
  const environment = useAppConfigStore((state) => state.env);
  const userInfo = useUserInfoStore((state) => state.userInfo);
  const parsedUserInfo = parseJwt(userInfo);

  const [loadingApproval, setLoadingApproval] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleApproval = async (action: "APPROVE" | "DENY") => {
    setLoadingApproval(true);

    const signature = await provideSignature(
      parsedUserInfo?.payload?.deviceId,
      parsedUserInfo?.payload?.userId,
      "/api/approval"
    );
    const authResult = await biometricAuthentication();
    // @ts-ignore
    if (authResult?.success) {
      axios
        .post(
          `${identifyEnvURL(environment)}/api/approval`,
          {
            approvalId,
            action,
            code,
            comment: "string",
          },
          {
            headers: {
              "Content-Type": "application/json",
              DeviceId: parsedUserInfo?.payload?.deviceId,
              Signature: signature || "",
            },
          }
        )
        .then(() => {
          router.replace("/");
          setLoadingApproval(false);
        })
        .catch((e) => {
          console.warn(e);
          setErrorMessage(e.message);
          setLoadingApproval(false);
        });
    } else {
      setLoadingApproval(false);
      setErrorMessage(
        "Failed to authenticate. Hit the back button and please try again."
      );
    }
  };

  if (loadingApproval) return <LoadingScreen />;

  if (errorMessage) return <Erroring errorMessage={errorMessage} smallText />;

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 30,
      }}
    >
      <JkButton
        title="Reject"
        onPress={() => handleApproval("DENY")}
        variant="outlined"
        sx={{ width: "45%", height: 70 }}
      />
      <JkButton
        title="Approve"
        onPress={() => handleApproval("APPROVE")}
        variant="contained"
        sx={{ width: "45%", height: 70 }}
        disabled={code ? code.length < 2 : false}
      />
    </View>
  );
}
