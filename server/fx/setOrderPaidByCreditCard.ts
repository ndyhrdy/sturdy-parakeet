import moment from "moment";
import { pbApi } from "../../helpers/pocketbase-server";

export { setOrderPaidByCreditCard };

const setOrderPaidByCreditCard = async (
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
