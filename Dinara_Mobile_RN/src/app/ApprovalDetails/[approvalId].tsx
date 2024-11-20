import { useState, useEffect } from "react";
import { View } from "react-native";
import { Stack } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import parseJwt from "src/utils/parseJWT";
import {
  IApprovalRowData,
  TQueryType,
} from "@components/Approvals/approvalTypes";
import LoadingScreen from "@components/ZCommon/LoadingScreen";
import LoginDetails from "@components/Approvals/ApprovalDetails/Login/LoginDetails";
import Erroring from "@components/ZCommon/Erroring";
import WalletConnectDetails from "@components/Approvals/ApprovalDetails/WalletConnect/WalletConnectDetails";
import WithdrawDetails from "@components/Approvals/ApprovalDetails/Withdraw/WithdrawDetails";
import SendDetails from "@components/Approvals/ApprovalDetails/Sends/SendDetails";
import AddressDetails from "@components/Approvals/ApprovalDetails/Address/AddressDetails";
import CashoutDetails from "@components/Approvals/ApprovalDetails/Cashout/CashoutDetails";
import BulkPaymentDetails from "@components/Approvals/ApprovalDetails/BulkPayment/BulkPaymentDetails";
import BulkCryptoAddressDetails from "@components/Approvals/ApprovalDetails/BulkCryptoAddress/BulkCryptoAddressDetails";
import BankAccountDetails from "@components/Approvals/ApprovalDetails/BankAccount/BankAccountDetails";
import identifyEnvURL from "src/utils/identifyEnvURL";
import useAppConfigStore from "src/stores/applicationConfigStore";
import useUserInfoStore from "src/stores/userInfoStore";

export default function ApprovalDetails() {
  const environment = useAppConfigStore((state) => state.env);
  const userInfo = useUserInfoStore((state) => state.userInfo);
  const parsedUserInfo = parseJwt(userInfo);

  const { approvalId, approvalType, subdirectory, rowData } =
    useLocalSearchParams<{
      approvalId: string;
      approvalType: IApprovalRowData["approvalType"];
      subdirectory: TQueryType;
      rowData: string;
    }>();

  const parsedRowData = JSON.parse(rowData!) as IApprovalRowData;
  // TODO: use approvalDetails in place of stubs
  const [approvalDetails, setApprovalDetails] = useState<any>({});
  const [ipAddressLookup, setIpAddressLookup] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setLoading(true);
    if (subdirectory !== null && subdirectory !== "login") {
      axios
        .get(
          `${identifyEnvURL(environment)}/api/pending-approval/${subdirectory}`,
          {
            headers: {
              deviceId: parsedUserInfo?.payload.deviceId,
              Signature: null,
              ApprovalId: approvalId,
            },
          }
        )
        .then(({ data }) => {
          setApprovalDetails(data);
        })
        .catch((error) => {
          setErrorMessage(error.message);
          setLoading(false);
        });
    }

    axios
      .get(
        `https://ipgeolocation.abstractapi.com/v1/?api_key=${process.env.EXPO_PUBLIC_GEO_API_KEY}&ip_address=${parsedRowData?.ipAddress}`
      )

      .then(({ data }) => {
        setIpAddressLookup(data);
        setLoading(false);
      })
      .catch((error) => {
        console.warn(error, "geoFetch");
        setLoading(false);
      });
  }, []);

  let ActiveComponent = <LoadingScreen />;

  switch (subdirectory) {
    case "login":
      ActiveComponent = (
        <LoginDetails
          approvalData={parsedRowData}
          latitude={ipAddressLookup?.latitude}
          longitude={ipAddressLookup?.longitude}
        />
      );
      break;
    case "wallet-connect":
      ActiveComponent = (
        <WalletConnectDetails
          approvalData={parsedRowData}
          approvalDetails={{
            walletConnectId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            accountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            accountName: "Legal Entity Additional Account 1",
            instrumentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            symbol: "ETH",
            instrumentName: "string",
            contractAddress: "string",
            contractName: "string",
            walletConnectUri: "string",
            contractDescription: "string",
            linkedChainAddressId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            linkedChainAddress:
              "0x14720f80bd90f999567eafa17635d266a13d7d122127575f97e47d80d57b8c85",
            linkedChainAddressLabel: "string",
            lastTransactionTime: "2024-02-29T16:39:59.441Z",
            numberOfTransactions: 0,
            state: "UNKNOWN",
          }}
          latitude={ipAddressLookup?.latitude}
          longitude={ipAddressLookup?.longitude}
        />
      );
      break;
    case "withdraw":
      ActiveComponent = (
        <WithdrawDetails
          approvalData={parsedRowData}
          approvalDetails={{
            withdrawActivityId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            transactionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            accountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            accountName: "Legal Entity Additional Account 1",
            instrumentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            symbol: "ETH",
            withdrawActivityStatus: "UNKNOWN",
            amount: 0.00004587,
            notionalAmount: 159753,
            note: "string",
            withdrawTransactionDetails: {
              withdrawActivityId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              fromAddress:
                "0x14720f80bd90f999567eafa17635d266a13d7d122127575f97e47d80d57b8c85",
              toAddress:
                "0x14720f80bd90f999567eafa17635d266a13d7d122127575f97e47d80d57b8c85",
              transactionId: "string",
              referenceId: "string",
              sourceStatus: "string",
              source: "string",
              quorumApprovals: 0,
              quorumApprovalsRequired: 0,
            },
            withdrawRecipient: {
              withdrawActivityId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              withdrawType: "WIRE",
              withdrawAddressId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              amount: 0.00004587,
              notionalAmount: 159753,
            },
            withdrawPriority: "UNKNOWN",
            createdAt: "2024-02-29T16:35:07.804Z",
            updatedAt: "2024-02-29T16:35:07.804Z",
          }}
          latitude={ipAddressLookup?.latitude}
          longitude={ipAddressLookup?.longitude}
        />
      );
      break;
    case "send":
      ActiveComponent = (
        <SendDetails
          approvalData={parsedRowData}
          approvalDetails={{
            sendActivityId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            transactionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            accountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            accountName: "Legal Entity Additional Account 1",
            instrumentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            symbol: "ETH",
            sendActivityStatus: "UNKNOWN",
            sendActivityEvent: "UNKNOWN",
            sendActivityEventAnnotation: "string",
            amount: 0.00004587,
            notionalAmount: 159753,
            networkFee: 0.00004217,
            networkFeeEstimate: 0.00004217,
            note: "string",
            createdAt: "2024-02-29T16:41:55.364Z",
            updatedAt: "2024-02-29T16:41:55.364Z",
            sendTransactionDetails: {
              sendActivityId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              fromAddress:
                "0x14720f80bd90f999567eafa17635d266a13d7d122127575f97e47d80d57b8c85",
              toAddress:
                "0x14720f80bd90f999567eafa17635d266a13d7d122127575f97e47d80d57b8c85",
              transactionId: "string",
              referenceId: "string",
              networkFee: 0,
              sourceStatus: "string",
              sourceSubStatus: "string",
              source: "string",
              confirmations: 0,
              quorumApprovals: 0,
              quorumApprovalsRequired: 0,
            },
            sendPriority: "UNKNOWN",
            sendRecipient: {
              sendActivityId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              sendAddressId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              externalWalletId: "string",
              address:
                "0x14720f80bd90f999567eafa17635d266a13d7d122127575f97e47d80d57b8c85",
              walletConnectId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              tag: "string",
              amount: 0,
              notionalAmount: 0,
            },
          }}
          latitude={ipAddressLookup?.latitude}
          longitude={ipAddressLookup?.longitude}
        />
      );
      break;
    case "crypto-address":
      ActiveComponent = (
        <AddressDetails
          approvalData={parsedRowData}
          approvalDetails={{
            addressId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            parentAccountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            accountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            accountName: "Legal Entity Additional Account 1",
            instrumentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            symbol: "ETH",
            instrumentName: "string",
            label: "string",
            address:
              "0x14720f80bd90f999567eafa17635d266a13d7d122127575f97e47d80d57b8c85",
            legacyAddress: "string",
            tag: "string",
            blockExplorerUrl:
              "https://etherscan.io/tx/0x14720f80bd90f999567eafa17635d266a13d7d122127575f97e47d80d57b8c85",
            balance: 0,
            notionalValue: 0,
            addressType: "UNKNOWN",
            lastTransactionTime: "2024-02-29T16:44:44.208Z",
            numberOfTransactions: 0,
            approvalStatus: "UNKNOWN",
          }}
          latitude={ipAddressLookup?.latitude}
          longitude={ipAddressLookup?.longitude}
        />
      );
      break;
    case "cashout":
      ActiveComponent = (
        <CashoutDetails
          approvalData={parsedRowData}
          approvalDetails={{
            cashOutActivityId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            accountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            accountName: "Legal Entity Additional Account 1",
            baseAssetId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            baseAssetSymbol: "ETH",
            quoteAssetId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            quoteAssetSymbol: "ETH",
            amount: 0,
            notionalAmount: 0,
            feeAssetId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            feeAssetSymbol: "ETH",
            feeAmount: 0,
            externalBankAccountInfo: {
              withdrawRecipientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              accountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              accountName: "Legal Entity Additional Account 1",
              instrumentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              symbol: "ETH",
              bankName: "string",
              label: "string",
              routingNumber: "string",
              accountNumber: "string",
              approvalStatus: "UNKNOWN",
              accountType: "UNKNOWN",
              accountOwnerName: "string",
              linkedCryptoAssetId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              linkedCryptoAssetSymbol: "ETH",
              linkedCryptoAssetName: "string",
            },
            destinationAddress: "string",
            note: "string",
            cashOutActivityState: "UNKNOWN",
            cashOutActivityEvent: "UNKNOWN",
            requestedAt: "2024-02-29T16:45:07.910Z",
          }}
          latitude={ipAddressLookup?.latitude}
          longitude={ipAddressLookup?.longitude}
        />
      );
      break;
    case "bulk-payment":
      ActiveComponent = (
        <BulkPaymentDetails
          approvalData={parsedRowData}
          approvalDetails={{
            bulkPaymentActivityId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            requestedBy: "string",
            sourceAccountName: "Legal Entity Additional Account 1",
            asset: "ETH_SEPOLIA",
            notes: "string",
            totalPaymentQty: 0,
            totalPaymentNotional: 0,
            averagePaymentQty: 0,
            averagePaymentNotional: 0,
            payments: [
              {
                paymentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                sourceAccountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                sourceAccountName: "Legal Entity Additional Account 1",
                sourceAddress: "string",
                asset: "ETH_SEPOLIA",
                label: "string",
                destinationAddress: "string",
                destinationAddressTag: "string",
                quantity: 0,
                notionalAmount: 0,
              },
              {
                paymentId: "f6a85f64-5717-4562-b3fc-2c963f66afa6",
                sourceAccountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                sourceAccountName: "Legal Entity Additional Account 1",
                sourceAddress: "string",
                asset: "ETH_SEPOLIA",
                label: "string",
                destinationAddress: "string",
                destinationAddressTag: "string",
                quantity: 0,
                notionalAmount: 0,
              },
              {
                paymentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                sourceAccountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                sourceAccountName: "Legal Entity Additional Account 1",
                sourceAddress: "string",
                asset: "ETH_SEPOLIA",
                label: "string",
                destinationAddress: "string",
                destinationAddressTag: "string",
                quantity: 0,
                notionalAmount: 0,
              },
              {
                paymentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                sourceAccountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                sourceAccountName: "Legal Entity Additional Account 1",
                sourceAddress: "string",
                asset: "ETH_SEPOLIA",
                label: "string",
                destinationAddress: "string",
                destinationAddressTag: "string",
                quantity: 0,
                notionalAmount: 0,
              },
              {
                paymentId: "fa85f64-5717-4562-b3fc-2c963f66afa6",
                sourceAccountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                sourceAccountName: "Legal Entity Additional Account 1",
                sourceAddress: "string",
                asset: "ETH_SEPOLIA",
                label: "string",
                destinationAddress: "string",
                destinationAddressTag: "string",
                quantity: 0,
                notionalAmount: 0,
              },
            ],
          }}
          latitude={ipAddressLookup?.latitude}
          longitude={ipAddressLookup?.longitude}
        />
      );
      break;
    case "bulk-crypto-address":
      ActiveComponent = (
        <BulkCryptoAddressDetails
          approvalData={parsedRowData}
          approvalDetails={[
            {
              addressId: "4fa85f64-5717-4562-b3fc-2c963f66afa6",
              parentAccountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              accountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              accountName: "Legal Entity Additional Account 1",
              instrumentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              symbol: "ETH",
              instrumentName: "string",
              label: "string",
              address:
                "0x14720f80bd90f999567eafa17635d266a13d7d122127575f97e47d80d57b8c85",
              legacyAddress: "string",
              tag: "string",
              blockExplorerUrl: "string",
              balance: 0,
              notionalValue: 0,
              addressType: "UNKNOWN",
              lastTransactionTime: "2024-02-29T16:46:05.287Z",
              numberOfTransactions: 0,
              approvalStatus: "UNKNOWN",
            },
            {
              addressId: "f485f64-5717-4562-b3fc-2c963f66afa6",
              parentAccountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              accountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              accountName: "Legal Entity Additional Account 1",
              instrumentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              symbol: "ETH",
              instrumentName: "string",
              label: "string",
              address:
                "0x14720f80bd90f999567eafa17635d266a13d7d122127575f97e47d80d57b8c85",
              legacyAddress: "string",
              tag: "string",
              blockExplorerUrl: "string",
              balance: 0,
              notionalValue: 0,
              addressType: "UNKNOWN",
              lastTransactionTime: "2024-02-29T16:46:05.287Z",
              numberOfTransactions: 0,
              approvalStatus: "UNKNOWN",
            },
            {
              addressId: "33fa85f64-5717-4562-b3fc-2c963f66afa6",
              parentAccountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              accountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              accountName: "Legal Entity Additional Account 1",
              instrumentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              symbol: "ETH",
              instrumentName: "string",
              label: "string",
              address:
                "0x14720f80bd90f999567eafa17635d266a13d7d122127575f97e47d80d57b8c85",
              legacyAddress: "string",
              tag: "string",
              blockExplorerUrl: "string",
              balance: 0,
              notionalValue: 0,
              addressType: "UNKNOWN",
              lastTransactionTime: "2024-02-29T16:46:05.287Z",
              numberOfTransactions: 0,
              approvalStatus: "UNKNOWN",
            },
          ]}
          latitude={ipAddressLookup?.latitude}
          longitude={ipAddressLookup?.longitude}
        />
      );
      break;
    case "bank-account":
      ActiveComponent = (
        <BankAccountDetails
          approvalData={parsedRowData}
          approvalDetails={{
            withdrawRecipientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            accountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            accountName: "Legal Entity Additional Account 1",
            instrumentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            symbol: "ETH",
            bankName: "string",
            label: "string",
            routingNumber: "string",
            accountNumber: "string",
            approvalStatus: "UNKNOWN",
            accountType: "UNKNOWN",
            accountOwnerName: "string",
            linkedCryptoAssetId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            linkedCryptoAssetSymbol: "ETH",
            linkedCryptoAssetName: "string",
          }}
          latitude={ipAddressLookup?.latitude}
          longitude={ipAddressLookup?.longitude}
        />
      );
      break;

    default:
      break;
  }

  if (loading) return <LoadingScreen />;
  if (errorMessage) return <Erroring errorMessage={errorMessage} />;

  return (
    <View style={{ backgroundColor: "#09090e", flex: 1 }}>
      <Stack.Screen
        options={{
          headerTitleAlign: "center",
          headerTitle: approvalType as string,
        }}
      />
      {ActiveComponent}
    </View>
  );
}
