interface IAddressResponse {
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
  addressType: string;
  lastTransactionTime: string;
  numberOfTransactions: number;
  approvalStatus: string;
}
