import { useMemo } from "react";
import { IApprovalRowData } from "@components/Approvals/approvalTypes";
import { View, ScrollView } from "react-native";
import Typography from "@components/ZCommon/Typography";
import MapViewComponent from "../MapView";
import ApprovalRowData from "../ApprovalRowData";
import ApproveRejectButtons from "../ApproveRejectButtons";
import KeyValuePairs from "../KeyValuePairs";
import formatCondensedAddress from "src/utils/formatCondensedAddress";

export default function AddressDetails({
  approvalData,
  approvalDetails,
  latitude,
  longitude,
}: {
  approvalData: IApprovalRowData;
  approvalDetails: IAddressResponse;
  latitude: number;
  longitude: number;
}) {
  const chosenFields = useMemo(
    () => [
      { field: "Account", value: approvalDetails?.accountName },
      { field: "Asset", value: approvalDetails?.instrumentName },
      {
        field: "Address Type",
        value: approvalDetails?.addressType,
      },
      {
        field: "Address Label",
        value: approvalDetails?.label,
      },
      {
        field: "Address",
        value: formatCondensedAddress(approvalDetails?.address),
      },
      {
        field: "Tag",
        value: approvalDetails?.tag,
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
        Crypto Address Details
      </Typography>
      {chosenFields.map((item) => (
        <KeyValuePairs key={item.field} field={item.field} value={item.value} />
      ))}

      <View>
        {latitude && longitude && (
          <MapViewComponent lat={latitude} long={longitude} /> // Add conditional rendering for MapViewComponent
        )}
      </View>

      <ApproveRejectButtons approvalId={approvalData?.approvalId} />
    </ScrollView>
  );
}
