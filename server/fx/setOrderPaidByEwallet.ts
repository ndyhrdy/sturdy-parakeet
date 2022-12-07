import { AxiosInstance } from "axios";
import moment from "moment";

export { setOrderPaidByEwallet };

const setOrderPaidByEwallet = async (
  pbApi: AxiosInstance,
  order: PendingOrder,
  callbackData: any
) => {
  const channel = (callbackData.data.channel_code as string)
    .split("_")
    .slice(1)
    .join("_");

  const { data: paidOrder } = await pbApi.patch<PaidOrder>(
    `/api/collections/orders/records/${order.id}`,
    {
      status: "PAID",
      paid: moment().toISOString(),
      paymentMethod: {
        channel,
        data: callbackData,
      },
    }
  );

  return paidOrder;
};
