export interface IBulkCryptoAddressResponse {
  addressId: string;
  parentAccountId: string;
  accountId: string;
  accountName: string;
  instrumentId: string;
  symbol: string;
  instrumentName: string;
  label: string;
  address: string;
  legacyAddress: string;
  tag: string;
  blockExplorerUrl: string;
  balance: number;
  notionalValue: number;
  addressType:
    | "UNKNOWN"
    | "External"
    | "Internal"
    | "ColdStorage"
    | "SettlementReceive"
    | "CashOut";
  lastTransactionTime: string;
  numberOfTransactions: number;
  approvalStatus:
    | "UNKNOWN"
    | "PendingCustomerApproval"
    | "PendingApproval"
    | "Approved"
    | "Rejected"
    | "Canceled"
    | "Failed";
}
