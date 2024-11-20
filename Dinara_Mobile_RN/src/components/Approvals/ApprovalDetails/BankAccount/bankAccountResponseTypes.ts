export interface IExternalBankAccountInfo {
  withdrawRecipientId: string;
  accountId: string;
  accountName: string;
  instrumentId: string;
  symbol: string;
  bankName: string;
  label: string;
  routingNumber: string;
  accountNumber: string;
  approvalStatus:
    | "UNKNOWN"
    | "PendingCustomerApproval"
    | "PendingApproval"
    | "Approved"
    | "Rejected"
    | "Canceled"
    | "Failed";
  accountType: "UNKNOWN" | "Checking" | "Savings" | "GeneralLedger" | "Loan";
  accountOwnerName: string;
  linkedCryptoAssetId: string;
  linkedCryptoAssetSymbol: string;
  linkedCryptoAssetName: string;
}
