import { AxiosInstance } from "axios";

export { setOrderQrCode };

const setOrderQrCode = async (
  pbApi: AxiosInstance,
  order: PendingOrder,
  qrCode: object
) => {
  const { data: updatedOrder } = await pbApi.patch<PendingOrder>(
    `/api/collections/orders/records/${order.id}`,
    {
      qrCode,
    }
  );

  return updatedOrder;
};
