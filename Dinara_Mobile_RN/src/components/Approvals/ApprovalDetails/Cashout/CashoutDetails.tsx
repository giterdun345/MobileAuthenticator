import { useMemo } from "react";
import { IApprovalRowData } from "@components/Approvals/approvalTypes";
import { View, ScrollView } from "react-native";
import Typography from "@components/ZCommon/Typography";
import MapViewComponent from "../MapView";
import ApprovalRowData from "../ApprovalRowData";
import ApproveRejectButtons from "../ApproveRejectButtons";
import { ICashOutActivityResponse } from "./cashoutResponseTypes";
import KeyValuePairs from "../KeyValuePairs";
import formatCryptoAndUsd from "src/utils/formatUSDandCrypto";
import formatCondensedAddress from "src/utils/formatCondensedAddress";

export default function CashoutDetails({
  approvalData,
  approvalDetails,
  latitude,
  longitude,
}: {
  approvalData: IApprovalRowData;
  approvalDetails: ICashOutActivityResponse;
  latitude: number;
  longitude: number;
}) {
  const chosenFields = useMemo(
    () => [
      {
        field: "Requested at",
        value: approvalDetails?.requestedAt
          ? new Date(approvalDetails?.requestedAt).toLocaleString()
          : "",
      },
      { field: "Account", value: approvalDetails?.accountName },
      { field: "Base Asset", value: approvalDetails?.baseAssetSymbol },
      { field: "Quote Asset", value: approvalDetails?.quoteAssetSymbol },
      {
        field: "Amount",
        value: `${approvalDetails?.quoteAssetSymbol} ${formatCryptoAndUsd(
          approvalDetails?.amount,
          approvalDetails?.quoteAssetSymbol
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
        field: "Fee Amount",
        value: `${approvalDetails?.feeAssetSymbol} ${formatCryptoAndUsd(
          approvalDetails?.feeAmount,
          approvalDetails?.feeAssetSymbol
        )}`,
      },
      {
        field: "Destination Address",
        value: formatCondensedAddress(approvalDetails?.destinationAddress),
      },
      {
        field: "Bank Name",
        value: approvalDetails?.externalBankAccountInfo?.bankName,
      },
      {
        field: "Bank Label",
        value: approvalDetails?.externalBankAccountInfo?.bankName,
      },
      {
        field: "Account Type",
        value: approvalDetails?.externalBankAccountInfo?.accountType,
      },
      {
        field: "Account Number",
        value: formatCondensedAddress(
          approvalDetails?.externalBankAccountInfo?.accountNumber
        ),
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
        Cashout Activity Details
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
