import { AxiosInstance } from "axios";
import moment from "moment";

export { setOrderPaidByVirtualAccount };

const setOrderPaidByVirtualAccount = async (
  pbApi: AxiosInstance,
  order: PendingOrder,
  callbackData: any
) => {
  const { data: paidOrder } = await pbApi.patch<PaidOrder>(
    `/api/collections/orders/records/${order.id}`,
    {
      status: "PAID",
      paid: moment().toISOString(),
      paymentMethod: {
        channel: callbackData.bank_code,
        data: callbackData,
      },
    }
  );

  return paidOrder;
};
