import { useMemo } from "react";
import { IApprovalRowData } from "@components/Approvals/approvalTypes";
import { View, ScrollView } from "react-native";
import Typography from "@components/ZCommon/Typography";
import MapViewComponent from "../MapView";
import ApprovalRowData from "../ApprovalRowData";
import ApproveRejectButtons from "../ApproveRejectButtons";
import { IWithdrawActivityResponse } from "./withdrawResponseTypes";
import KeyValuePairs from "../KeyValuePairs";
import formatCryptoAndUsd from "src/utils/formatUSDandCrypto";
import formatCondensedAddress from "src/utils/formatCondensedAddress";

export default function WithdrawDetails({
  approvalData,
  approvalDetails,
  latitude,
  longitude,
}: {
  approvalData: IApprovalRowData;
  approvalDetails: IWithdrawActivityResponse;
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
      { field: "Priority", value: approvalDetails?.withdrawPriority },
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
        field: "From",
        value: formatCondensedAddress(
          approvalDetails?.withdrawTransactionDetails?.fromAddress
        ),
      },
      {
        field: "To",
        value: formatCondensedAddress(
          approvalDetails?.withdrawTransactionDetails?.toAddress
        ),
      },
      {
        field: "Approvals",
        value:
          approvalDetails?.withdrawTransactionDetails?.quorumApprovals || "0",
      },
      {
        field: "Approvals Required",
        value:
          approvalDetails?.withdrawTransactionDetails
            ?.quorumApprovalsRequired || "0",
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
        Withdraw Details
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
