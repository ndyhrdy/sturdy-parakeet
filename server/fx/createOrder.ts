import { AxiosInstance } from "axios";
import moment from "moment";

export { createOrder };

const createOrder = async (pbApi: AxiosInstance) => {
  const orderData = {
    amount: 500_000,
    expiry: moment().add(1, "day").toISOString(),
    status: "PENDING",
  };

  const { data: order } = await pbApi.post<PendingOrder>(
    "/api/collections/orders/records",
    orderData
  );
  return order;
};
