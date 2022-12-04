import moment from "moment";
import { pbApi } from "../../helpers/pocketbase-server";

export { setOrderPaidByEwallet };

const setOrderPaidByEwallet = async (
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
