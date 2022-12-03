type PbRecord<T> = {
  collectionId: string;
  created: string;
  id: string;
  updated: string;
  collectionName: string;
} & T;

type BaseOrder = PbRecord<{
  collectionName: "orders";
  amount: number;
  expiry: string;
  status: OrderStatus;
  virtualAccounts?: { [bankCode: string]: XenditVirtualAccountResponse };
}>;

type OrderStatus = "PENDING" | "EXPIRED" | "PAID";

type PendingOrder = BaseOrder & {
  status: "PENDING";
};

type PaidOrder = BaseOrder & {
  status: "PAID";
  paid: string;
  paymentMethod: { channel: string; data: object };
};

type ExpiredOrder = BaseOrder & {
  status: "EXPIRED";
};

type Order = PendingOrder | PaidOrder | ExpiredOrder;

type XenditVirtualAccountResponse = {
  id: string;
  external_id: string;
  owner_id: string;
  bank_code: string;
  merchant_code: string;
  account_number: string;
  name: string;
  currency: string;
  is_single_use: boolean;
  is_closed: boolean;
  expected_amount: number;
  suggested_amount: number;
  expiration_date: string;
  description: string;
  status: string;
};
