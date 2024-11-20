import { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import Typography from "@components/ZCommon/Typography";
import ApprovalRow from "@components/Approvals/ApprovalRow";
import NoPendingApprovals from "@components/Approvals/NoPendingApprovals";
import { IApprovalRowData } from "@components/Approvals/approvalTypes";
import Erroring from "@components/ZCommon/Erroring";
import LoadingScreen from "@components/ZCommon/LoadingScreen";
import useUserInfoStore from "src/stores/userInfoStore";
import identifyEnvURL from "src/utils/identifyEnvURL";
import useAppConfigStore from "src/stores/applicationConfigStore";
import usePushNotifications from "src/utils/usePushNotifications";
import parseJwt from "src/utils/parseJWT";
import axios from "axios";
import { provideSignature } from "modules/crypto-keep";

export default function ApprovalList() {
  const environment = useAppConfigStore((state) => state.env);
  const userInfo = useUserInfoStore((state) => state.userInfo);
  const notification = usePushNotifications();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [pendingApprovals, setPendingApprovals] = useState<IApprovalRowData[]>(
    []
  );
  const [userEmail, setUserEmail] = useState("");

  const fetchPendingApprovals = async () => {
    setLoading(true);
    const parsedContext = parseJwt(userInfo);
    setUserEmail(parsedContext?.payload.email);
    const deviceId = parsedContext?.payload.deviceId;
    if (userInfo) {
      const sigResult = await provideSignature(
        deviceId,
        parsedContext?.payload.userId,
        "/api/pending-approvals"
      );

      // console.log(deviceId, parsedContext?.payload.userId, sigResult);

      if (sigResult?.includes("Signature Error:")) {
        setErrorMessage(sigResult);
      } else {
        await axios
          .get(`${identifyEnvURL(environment)}/api/pending-approvals`, {
            headers: {
              "Content-Type": "application/json",
              Signature: sigResult,
              deviceId,
            },
          })
          .then(({ data }) => {
            console.log("Pending approvals", data);
            setPendingApprovals(data);
            setLoading(false);
          })
          .catch((error) => {
            setErrorMessage(error.message);
            setLoading(false);
          });
      }
    }
  };

  useEffect(() => {
    fetchPendingApprovals();
  }, [userInfo, notification]);

  if (errorMessage) {
    return <Erroring errorMessage={errorMessage} />;
  }

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#09090e",
        padding: 23,
      }}
    >
      <View
        style={{
          marginTop: "13%",
        }}
      >
        <Typography weight="bold" sx={{ alignSelf: "center" }}>
          Welcome
        </Typography>
        <Typography weight="bold" sx={{ alignSelf: "center" }}>
          {userEmail}
        </Typography>
        <Typography
          weight="bold"
          sx={{ alignSelf: "center", marginTop: "13%", marginBottom: "13%" }}
        >
          Pending Approvals
        </Typography>
      </View>
      <FlatList
        style={{ flex: 1 }}
        scrollEnabled
        data={pendingApprovals}
        contentContainerStyle={{ gap: 15 }}
        renderItem={({ item }) => <ApprovalRow approvalData={item} />}
        ListEmptyComponent={<NoPendingApprovals />}
        keyExtractor={(item) => item.approvalId}
      />
    </View>
  );
}
