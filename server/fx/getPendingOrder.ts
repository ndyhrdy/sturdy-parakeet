import { AxiosInstance } from "axios";

export { getPendingOrder };

const getPendingOrder = async (pbApi: AxiosInstance, orderId: string) => {
  const { data: order } = await pbApi.get<Order>(
    `/api/collections/orders/records/${orderId}`
  );
  if (order.status !== "PENDING") {
    return Promise.reject("not-found");
  }

  return order;
};
