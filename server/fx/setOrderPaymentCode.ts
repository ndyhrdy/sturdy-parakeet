import { AxiosInstance } from "axios";

export { setOrderPaymentCode };

const setOrderPaymentCode = async (
  pbApi: AxiosInstance,
  order: PendingOrder,
  roName: string,
  paymentCode: object
) => {
  const { data: updatedOrder } = await pbApi.patch<PendingOrder>(
    `/api/collections/orders/records/${order.id}`,
    {
      paymentCodes: {
        ...order.paymentCodes,
        [roName]: paymentCode,
      },
    }
  );

  return updatedOrder;
};
