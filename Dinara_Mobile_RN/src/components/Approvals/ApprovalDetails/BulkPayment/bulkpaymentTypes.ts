interface PaymentItem {
  paymentId: string;
  sourceAccountId: string;
  sourceAccountName: string;
  sourceAddress: string;
  asset: string;
  label: string;
  destinationAddress: string;
  destinationAddressTag: string;
  quantity: number;
  notionalAmount: number;
}

export interface IBulkPaymentResponse {
  bulkPaymentActivityId: string;
  requestedBy: string;
  sourceAccountName: string;
  asset: string;
  notes: string;
  totalPaymentQty: number;
  totalPaymentNotional: number;
  averagePaymentQty: number;
  averagePaymentNotional: number;
  payments: PaymentItem[];
}
