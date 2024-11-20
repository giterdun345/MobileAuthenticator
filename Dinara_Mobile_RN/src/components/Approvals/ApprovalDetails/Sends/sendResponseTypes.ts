export interface ISendActivityResponse {
  sendActivityId: string;
  transactionId: string;
  accountId: string;
  accountName: string;
  instrumentId: string;
  symbol: string;
  sendActivityStatus: string;
  sendActivityEvent: string;
  sendActivityEventAnnotation: string;
  amount: number;
  notionalAmount: number;
  networkFee: number;
  networkFeeEstimate: number;
  note: string;
  createdAt: string;
  updatedAt: string;
  sendTransactionDetails: SendTransactionDetails;
  cryptoSendActivities?: any[];
  sendPriority: string;
  sendRecipient: SendRecipient;
}

interface SendTransactionDetails {
  sendActivityId: string;
  fromAddress: string;
  toAddress: string;
  transactionId: string;
  referenceId: string;
  networkFee: number;
  sourceStatus: string;
  sourceSubStatus: string;
  source: string;
  confirmations: number;
  quorumApprovals: number;
  quorumApprovalsRequired: number;
}

interface SendRecipient {
  sendActivityId: string;
  sendAddressId: string;
  externalWalletId: string;
  address: string;
  walletConnectId: string;
  tag: string;
  amount: number;
  notionalAmount: number;
}
