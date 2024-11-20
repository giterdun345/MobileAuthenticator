import { IExternalBankAccountInfo } from "../BankAccount/bankAccountResponseTypes";

export interface ICashOutActivityResponse {
  cashOutActivityId: string;
  accountId: string;
  accountName: string;
  baseAssetId: string;
  baseAssetSymbol: string;
  quoteAssetId: string;
  quoteAssetSymbol: string;
  amount: number;
  notionalAmount: number;
  feeAssetId: string;
  feeAssetSymbol: string;
  feeAmount: number;
  externalBankAccountInfo: IExternalBankAccountInfo;
  destinationAddress: string;
  note: string;
  cashOutActivityState: string;
  cashOutActivityEvent: string;
  requestedAt: string;
}
