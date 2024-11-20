export interface IApprovalRowData {
  approvalId: string;
  approvalType:
    | "UNKNOWN"
    | "SEND_ACTIVITY_REQUEST"
    | "WITHDRAW_ACTIVITY_REQUEST"
    | "AUTHENTICATION_REQUEST"
    | "EXTERNAL_CRYPTO_ADDRESS_REQUEST"
    | "EXTERNAL_BANK_ACCOUNT_REQUEST_WIRE"
    | "EXTERNAL_BANK_ACCOUNT_REQUEST_ACH"
    | "CASHOUT_ACTIVITY_REQUEST"
    | "WALLET_CONNECT_REQUEST"
    | "BULK_PAYMENT_ACTIVITY_REQUEST"
    | "BULK_ADDRESS_REQUEST";
  expiry: string;
  ipAddress: string;
  referenceId: string;
  requestorId: string | null;
  requestorName: string;
  timestamp: string;
  userAgent: string;
}

export type TQueryType =
  | "login"
  | "bank-account"
  | "bulk-crypto-address"
  | "bulk-payment"
  | "cashout"
  | "crypto-address"
  | "send"
  | "wallet-connect"
  | "withdraw"
  | "";
