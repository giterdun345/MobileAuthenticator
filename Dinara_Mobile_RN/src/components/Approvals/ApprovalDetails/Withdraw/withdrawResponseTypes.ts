export interface IWithdrawActivityResponse {
  withdrawActivityId: string;
  transactionId: string;
  accountId: string;
  accountName: string;
  instrumentId: string;
  symbol: string;
  withdrawActivityStatus: WithdrawActivityStatus;
  amount: number;
  notionalAmount: number;
  note: string;
  withdrawTransactionDetails: WithdrawTransactionDetails;
  withdrawRecipient: WithdrawRecipient;
  withdrawPriority: WithdrawPriority;
  createdAt: string;
  updatedAt: string;
}

interface WithdrawTransactionDetails {
  withdrawActivityId: string;
  fromAddress: string;
  toAddress: string;
  transactionId: string;
  referenceId: string;
  sourceStatus: string;
  source: string;
  quorumApprovals: number;
  quorumApprovalsRequired: number;
}

type WithdrawActivityStatus =
  | "UNKNOWN"
  | "New"
  | "CustomerApprovalPending"
  | "CustomerApproved"
  | "TreasuryAgentSubmitted"
  | "TreasuryAgentAuthorizationPending"
  | "TreasuryAgentProcessing"
  | "Completed"
  | "Failed";
// Add your status options here

interface WithdrawRecipient {
  withdrawActivityId: string;
  withdrawType: "UNKNOWN" | "WIRE" | "ACH";
  withdrawAddressId: string;
  amount: number;
  notionalAmount: number;
}

type WithdrawPriority = "UNKNOWN" | "Low" | "Normal" | "High";
