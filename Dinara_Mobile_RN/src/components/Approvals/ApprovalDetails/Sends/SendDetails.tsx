import { useMemo } from "react";
import { IApprovalRowData } from "@components/Approvals/approvalTypes";
import { View, ScrollView } from "react-native";
import Typography from "@components/ZCommon/Typography";
import MapViewComponent from "../MapView";
import ApprovalRowData from "../ApprovalRowData";
import ApproveRejectButtons from "../ApproveRejectButtons";
import { ISendActivityResponse } from "./sendResponseTypes";
import formatCondensedAddress from "src/utils/formatCondensedAddress";
import formatCryptoAndUsd from "src/utils/formatUSDandCrypto";
import KeyValuePairs from "../KeyValuePairs";

export default function SendDetails({
  approvalData,
  approvalDetails,
  latitude,
  longitude,
}: {
  approvalData: IApprovalRowData;
  approvalDetails: ISendActivityResponse;
  latitude: number;
  longitude: number;
}) {
  const chosenFields = useMemo(
    () => [
      {
        field: "Created at",
        value: approvalDetails?.createdAt
          ? new Date(approvalDetails?.createdAt).toLocaleString()
          : "",
      },
      { field: "Priority", value: approvalDetails?.sendPriority },
      { field: "Account", value: approvalDetails?.accountName },
      {
        field: "Amount",
        value: `${approvalDetails?.symbol} ${formatCryptoAndUsd(
          approvalDetails?.amount,
          approvalDetails?.symbol
        )}`,
      },
      {
        field: "Notional Amount",
        value: ` USD ${formatCryptoAndUsd(
          approvalDetails?.notionalAmount,
          "USD"
        )}`,
      },
      {
        field: "Network Fee",
        value: `${approvalDetails?.symbol} ${formatCryptoAndUsd(
          approvalDetails?.networkFee,
          approvalDetails?.symbol
        )}`,
      },
      {
        field: "Network Fee Est.",
        value: `${approvalDetails?.symbol} ${formatCryptoAndUsd(
          approvalDetails?.networkFeeEstimate,
          approvalDetails?.symbol
        )}`,
      },

      {
        field: "From",
        value: formatCondensedAddress(
          approvalDetails?.sendTransactionDetails?.fromAddress
        ),
      },
      {
        field: "To",
        value: formatCondensedAddress(
          approvalDetails?.sendTransactionDetails?.toAddress
        ),
      },
      {
        field: "Approvals",
        value: approvalDetails?.sendTransactionDetails?.quorumApprovals || "0",
      },
      {
        field: "Approvals Required",
        value:
          approvalDetails?.sendTransactionDetails?.quorumApprovalsRequired ||
          "0",
      },
      { field: "Note", value: approvalDetails?.note },
    ],
    []
  );

  return (
    <ScrollView style={{ marginTop: 20, padding: 20 }}>
      <ApprovalRowData approvalData={approvalData} />
      <Typography
        weight="semiBold"
        size={15}
        sx={{ alignSelf: "center", marginTop: 15, marginBottom: 5 }}
      >
        Send Activity Details
      </Typography>
      {chosenFields.map((item) => (
        <KeyValuePairs key={item.field} field={item.field} value={item.value} />
      ))}

      <View>
        {latitude && longitude && (
          <MapViewComponent lat={latitude} long={longitude} />
        )}
      </View>

      <ApproveRejectButtons approvalId={approvalData?.approvalId} />
    </ScrollView>
  );
}
