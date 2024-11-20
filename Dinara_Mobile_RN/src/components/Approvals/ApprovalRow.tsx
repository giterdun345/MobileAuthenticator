import { IApprovalRowData, TQueryType } from "./approvalTypes";
import Typography from "@components/ZCommon/Typography";
import { router } from "expo-router";
import { View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function ApprovalRow({
  approvalData,
}: {
  approvalData: IApprovalRowData;
}) {
  const time = new Date(approvalData.timestamp).toLocaleTimeString();
  const date = new Date(approvalData.timestamp).toLocaleDateString();

  let approvalTypeFormatted: string = approvalData.approvalType;
  let queryType: TQueryType = "";

  switch (approvalTypeFormatted) {
    case "AUTHENTICATION_REQUEST":
      approvalTypeFormatted = "Login Request";
      queryType = "login";
      break;
    case "SEND_ACTIVITY_REQUEST":
      approvalTypeFormatted = "Send Activity";
      queryType = "send";
      break;
    case "WITHDRAW_ACTIVITY_REQUEST":
      approvalTypeFormatted = "Withdraw Activity";
      queryType = "withdraw";
      break;
    case "EXTERNAL_CRYPTO_ADDRESS_REQUEST":
      approvalTypeFormatted = "External Address Request";
      queryType = "crypto-address";
      break;
    case "EXTERNAL_BANK_ACCOUNT_REQUEST_WIRE":
      approvalTypeFormatted = "Bank Request Wire";
      queryType = "bank-account";
      break;
    case "EXTERNAL_BANK_ACCOUNT_REQUEST_ACH":
      approvalTypeFormatted = "Bank Request ACH";
      queryType = "bank-account";
      break;
    case "CASHOUT_ACTIVITY_REQUEST":
      approvalTypeFormatted = "Cashout Activity";
      queryType = "cashout";
      break;
    case "WALLET_CONNECT_REQUEST":
      approvalTypeFormatted = "Wallet Connect Request";
      queryType = "wallet-connect";
      break;
    case "BULK_PAYMENT_ACTIVITY_REQUEST":
      approvalTypeFormatted = "Bulk Payment Activity";
      queryType = "bulk-payment";
      break;
    case "BULK_ADDRESS_REQUEST":
      approvalTypeFormatted = "Bulk Address Request";
      queryType = "bulk-crypto-address";
      break;
    default:
      approvalTypeFormatted = "Unknown Request";
      break;
  }

  return (
    <TouchableOpacity
      style={{ flex: 1 }}
      onPress={() => {
        router.push(
          `/ApprovalDetails/${
            approvalData.approvalId
          }?approvalType=${approvalTypeFormatted}&&subdirectory=${queryType}&&rowData=${JSON.stringify(
            approvalData
          )}`
        );
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "#16161d",
          margin: 10,
          height: 100,
          width: "95%",
          borderRadius: 10,
          padding: 13,
          shadowColor: "white",
          shadowOffset: { width: 50, height: 100 },
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 2,
        }}
      >
        <View
          style={{
            gap: 8,
          }}
        >
          <Typography weight="semiBold" size={13.5}>
            {approvalTypeFormatted}
          </Typography>
          <Typography weight="medium" size={13}>
            Requested by: {approvalData.requestorName}
          </Typography>
          <Typography weight="light" size={13}>
            Ip Address: {approvalData.ipAddress}
          </Typography>
        </View>

        <View>
          <View>
            <Typography weight="regular" size={10}>
              {time}
            </Typography>
            <Typography weight="regular" size={10}>
              {date}
            </Typography>
          </View>
          <AntDesign
            name="login"
            size={24}
            color="#017470"
            style={{ marginTop: "auto", alignSelf: "flex-end" }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
