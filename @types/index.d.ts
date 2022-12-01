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
  paymentMethod?: { id: string };
}>;

type OrderStatus = "PENDING" | "EXPIRED" | "PAID";

type PendingOrder = BaseOrder & {
  status: "PENDING";
};

type PaidOrder = BaseOrder & {
  status: "PAID";
  paid: string;
  paymentChannel: string;
};

type ExpiredOrder = BaseOrder & {
  status: "EXPIRED";
};

type Order = PendingOrder | PaidOrder | ExpiredOrder;
