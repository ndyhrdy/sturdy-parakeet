import { AxiosInstance } from "axios";
import moment from "moment";

export { setOrderPaidByQrCode };

const setOrderPaidByQrCode = async (
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
        channel: "QR_CODE",
        data: callbackData,
      },
    }
  );

  return paidOrder;
};
