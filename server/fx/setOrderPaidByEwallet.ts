import moment from "moment";
import { pbApi } from "../../helpers/pocketbase-server";

export { setOrderPaidByEwallet };

const setOrderPaidByEwallet = async (
  order: PendingOrder,
  channel: string,
  callbackData: any
) => {
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
