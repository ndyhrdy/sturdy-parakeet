import { AxiosInstance } from "axios";
import moment from "moment";

export { setOrderPaidByPaymentCode };

const setOrderPaidByPaymentCode = async (
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
        channel: callbackData.retail_outlet_name,
        data: callbackData,
      },
    }
  );

  return paidOrder;
};
