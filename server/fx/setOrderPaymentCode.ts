import { pbApi } from "../../helpers/pocketbase-server";

export { setOrderPaymentCode };

const setOrderPaymentCode = async (
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
