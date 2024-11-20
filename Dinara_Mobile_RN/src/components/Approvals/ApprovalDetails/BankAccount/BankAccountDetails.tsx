import { useMemo } from "react";
import { IApprovalRowData } from "@components/Approvals/approvalTypes";
import { View, ScrollView } from "react-native";
import Typography from "@components/ZCommon/Typography";
import MapViewComponent from "../MapView";
import ApprovalRowData from "../ApprovalRowData";
import ApproveRejectButtons from "../ApproveRejectButtons";
import { IExternalBankAccountInfo } from "./bankAccountResponseTypes";
import KeyValuePairs from "../KeyValuePairs";
import formatCondensedAddress from "src/utils/formatCondensedAddress";

export default function BankAccountDetails({
  approvalData,
  approvalDetails,
  latitude,
  longitude,
}: {
  approvalData: IApprovalRowData;
  approvalDetails: IExternalBankAccountInfo;
  latitude: number;
  longitude: number;
}) {
  const chosenFields = useMemo(
    () => [
      { field: "Dinara Account", value: approvalDetails?.accountName },
      { field: "Asset", value: approvalDetails?.symbol },
      {
        field: "Linked Asset",
        value: `${approvalDetails?.linkedCryptoAssetName} (${approvalDetails?.linkedCryptoAssetSymbol})`,
      },
      {
        field: "Account Type",
        value: approvalDetails?.accountType,
      },
      {
        field: "Labeled",
        value: approvalDetails?.label,
      },
      {
        field: "Bank Name",
        value: approvalDetails?.bankName,
      },
      {
        field: "Owner",
        value: approvalDetails?.accountOwnerName,
      },
      {
        field: "Account Number",
        value: formatCondensedAddress(approvalDetails?.accountNumber),
      },
      {
        field: "Routing Number",
        value: approvalDetails?.routingNumber,
      },
      // {
      //   field: "Block Explorer URL",
      //   value: approvalDetails?.blockExplorerUrl,
      // },
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
        Bank Account Details
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
