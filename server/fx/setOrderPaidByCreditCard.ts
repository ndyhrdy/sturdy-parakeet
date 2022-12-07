import { AxiosInstance } from "axios";
import moment from "moment";

export { setOrderPaidByCreditCard };

const setOrderPaidByCreditCard = async (
  pbApi: AxiosInstance,
  order: PendingOrder,
  chargeResponse: object
) => {
  const { data: paidOrder } = await pbApi.patch<PaidOrder>(
    `/api/collections/orders/records/${order.id}`,
    {
      status: "PAID",
      paid: moment().toISOString(),
      paymentMethod: {
        channel: "CARD",
        data: chargeResponse,
      },
    }
  );

  return paidOrder;
};
