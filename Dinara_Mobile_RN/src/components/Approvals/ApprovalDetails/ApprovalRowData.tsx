import { View } from "react-native";
import { IApprovalRowData } from "../approvalTypes";
import Typography from "@components/ZCommon/Typography";

export default function ApprovalRowData({
  approvalData,
}: {
  approvalData: IApprovalRowData;
}) {
  const timestampDate = new Date(approvalData.timestamp);
  const time = timestampDate.toLocaleTimeString();
  const date = timestampDate.toLocaleDateString();

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 15,
        }}
      >
        <Typography weight="medium">{date}</Typography>
        <Typography weight="medium">{time}</Typography>
      </View>
      <Typography weight="medium" size={15}>
        Requesed by: {approvalData?.requestorName}
      </Typography>
      <Typography weight="medium" size={15} sx={{ marginTop: 15 }}>
        Ip Address: {approvalData?.ipAddress}
      </Typography>
      <Typography weight="medium" size={15} sx={{ marginTop: 15 }}>
        Expires: {new Date(approvalData?.expiry).toLocaleString()}
      </Typography>
      <Typography weight="medium" size={15} sx={{ marginTop: 15 }}>
        User Agent: {approvalData?.userAgent}
      </Typography>
    </>
  );
}
