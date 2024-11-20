export interface IWalletConnectResponse {
  walletConnectId: string;
  accountId: string;
  accountName: string;
  instrumentId: string;
  symbol: string;
  instrumentName: string;
  contractAddress: string;
  contractName: string;
  walletConnectUri: string;
  contractDescription: string;
  linkedChainAddressId: string;
  linkedChainAddress: string;
  linkedChainAddressLabel: string;
  lastTransactionTime: string;
  numberOfTransactions: number;
  state: string;
}
