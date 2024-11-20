import { useMemo, Fragment } from "react";
import { IApprovalRowData } from "@components/Approvals/approvalTypes";
import { View, ScrollView } from "react-native";
import Typography from "@components/ZCommon/Typography";
import MapViewComponent from "../MapView";
import ApprovalRowData from "../ApprovalRowData";
import ApproveRejectButtons from "../ApproveRejectButtons";
import { IBulkCryptoAddressResponse } from "./bulkcryptoaddressTypes";
import formatCondensedAddress from "src/utils/formatCondensedAddress";
import KeyValuePairs from "../KeyValuePairs";

export default function BulkCryptoAddressDetails({
  approvalData,
  approvalDetails,
  latitude,
  longitude,
}: {
  approvalData: IApprovalRowData;
  approvalDetails: IBulkCryptoAddressResponse[];
  latitude: number;
  longitude: number;
}) {
  const PaymentAddresses = useMemo(
    () =>
      approvalDetails?.map((paymentAddress, index) => (
        <Fragment key={paymentAddress?.addressId}>
          <Typography
            weight="extraLight"
            size={15}
            sx={{ marginTop: 15, alignSelf: "flex-end", marginRight: 15 }}
          >
            Payment Address {index + 1}
          </Typography>
          <KeyValuePairs
            field="Address Type"
            value={paymentAddress?.addressType}
          />
          <KeyValuePairs field="Label" value={paymentAddress?.label} />
          <KeyValuePairs field="Asset" value={paymentAddress?.symbol} />
          <KeyValuePairs
            field="Address"
            value={formatCondensedAddress(paymentAddress?.address)}
          />
          <KeyValuePairs field="Tag" value={paymentAddress?.tag} />
        </Fragment>
      )),
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
        Payment Addresses
      </Typography>
      {PaymentAddresses}
      <View>
        {latitude && longitude && (
          <MapViewComponent lat={latitude} long={longitude} />
        )}
      </View>

      <ApproveRejectButtons approvalId={approvalData?.approvalId} />
    </ScrollView>
  );
}
