import { useMemo } from "react";
import { IApprovalRowData } from "@components/Approvals/approvalTypes";
import { View, ScrollView } from "react-native";
import MapViewComponent from "../MapView";
import Typography from "@components/ZCommon/Typography";
import ApprovalRowData from "../ApprovalRowData";
import ApproveRejectButtons from "../ApproveRejectButtons";
import { IWalletConnectResponse } from "./walletConnectResponseTypes";
import formatCondensedAddress from "src/utils/formatCondensedAddress";
import KeyValuePairs from "../KeyValuePairs";

export default function WalletConnectDetails({
  approvalData,
  approvalDetails,
  latitude,
  longitude,
}: {
  approvalData: IApprovalRowData;
  approvalDetails: IWalletConnectResponse;
  latitude: number;
  longitude: number;
}) {
  const chosenFields = useMemo(
    () => [
      { field: "Account", value: approvalDetails?.accountName },
      { field: "Asset", value: approvalDetails?.instrumentName },
      {
        field: "Contract Name",
        value: approvalDetails?.contractName,
      },
      {
        field: "Contract Address",
        value: approvalDetails?.contractAddress,
      },
      {
        field: "Contract Description",
        value: approvalDetails?.contractDescription,
      },

      {
        field: "Chain Address Label",
        value: approvalDetails?.linkedChainAddressLabel,
      },
      {
        field: "Chain Address",
        value: formatCondensedAddress(approvalDetails?.linkedChainAddress),
      },
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
        Wallet Connect Details
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
