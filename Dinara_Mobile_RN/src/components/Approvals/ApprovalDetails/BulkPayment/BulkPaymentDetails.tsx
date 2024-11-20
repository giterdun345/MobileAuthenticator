import { useMemo, Fragment } from "react";
import { IApprovalRowData } from "@components/Approvals/approvalTypes";
import { View, ScrollView } from "react-native";
import Typography from "@components/ZCommon/Typography";
import MapViewComponent from "../MapView";
import ApprovalRowData from "../ApprovalRowData";
import ApproveRejectButtons from "../ApproveRejectButtons";
import { IBulkPaymentResponse } from "./bulkpaymentTypes";
import KeyValuePairs from "../KeyValuePairs";
import formatCryptoAndUsd from "src/utils/formatUSDandCrypto";
import formatCondensedAddress from "src/utils/formatCondensedAddress";

export default function BulkPaymentDetails({
  approvalData,
  approvalDetails,
  latitude,
  longitude,
}: {
  approvalData: IApprovalRowData;
  approvalDetails: IBulkPaymentResponse;
  latitude: number;
  longitude: number;
}) {
  const bulkPaymentFields = useMemo(
    () => [
      { field: "Requested by", value: approvalDetails?.requestedBy },
      { field: "Account", value: approvalDetails?.sourceAccountName },

      {
        field: "Total In Payments",
        value: `${approvalDetails?.asset} ${formatCryptoAndUsd(
          approvalDetails?.totalPaymentQty,
          approvalDetails?.asset
        )}`,
      },
      {
        field: "Total Notional Amount",
        value: `USD ${formatCryptoAndUsd(
          approvalDetails?.totalPaymentNotional,
          "USD"
        )}`,
      },
      {
        field: "Average Payment",
        value: `${approvalDetails?.asset} ${formatCryptoAndUsd(
          approvalDetails?.averagePaymentQty,
          approvalDetails?.asset
        )}`,
      },
      {
        field: "Average Payment Notional",
        value: `USD ${formatCryptoAndUsd(
          approvalDetails?.averagePaymentNotional,
          "USD"
        )}`,
      },
      { field: "Notes", value: approvalDetails?.notes },
    ],
    []
  );

  const PaymentDetails = useMemo(
    () =>
      approvalDetails?.payments.map((payment, index) => (
        <Fragment key={payment?.paymentId}>
          <Typography
            weight="extraLight"
            size={15}
            sx={{ marginTop: 15, alignSelf: "flex-end", marginRight: 15 }}
          >
            Payment {index + 1}
          </Typography>
          <KeyValuePairs field="Label" value={payment?.label} />
          <KeyValuePairs
            field="Source Address"
            value={formatCondensedAddress(payment?.sourceAddress)}
          />
          <KeyValuePairs
            field="Destination Address"
            value={formatCondensedAddress(payment?.destinationAddress)}
          />

          <KeyValuePairs
            field="Quantity"
            value={`${payment?.asset} ${formatCryptoAndUsd(
              payment?.quantity,
              payment?.asset
            )}`}
          />
          <KeyValuePairs
            field="Notional Amount"
            value={`USD ${formatCryptoAndUsd(payment?.notionalAmount, "USD")}`}
          />
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
        Bulk Payment Details
      </Typography>
      {bulkPaymentFields.map((item) => (
        <KeyValuePairs key={item.field} field={item.field} value={item.value} />
      ))}

      <Typography
        weight="semiBold"
        size={15}
        sx={{ alignSelf: "center", marginTop: 15, marginBottom: 5 }}
      >
        Payments
      </Typography>

      {PaymentDetails}
      <View>
        {latitude && longitude && (
          <MapViewComponent lat={latitude} long={longitude} />
        )}
      </View>

      <ApproveRejectButtons approvalId={approvalData?.approvalId} />
    </ScrollView>
  );
}
