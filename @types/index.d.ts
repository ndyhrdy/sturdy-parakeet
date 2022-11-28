type PbRecord<T> = {
  collectionId: string;
  created: string;
  id: string;
  updated: string;
  collectionName: string;
} & T;

type Order = PbRecord<{
  amount: number;
  expiry: string;
  collectionName: "orders";
}>;
