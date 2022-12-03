import { pbApi } from "../../helpers/pocketbase-server";

export { setOrderVirtualAccount };

const setOrderVirtualAccount = async (
  order: PendingOrder,
  bankCode: string,
  virtualAccount: object
) => {
  const { data: updatedOrder } = await pbApi.patch<PendingOrder>(
    `/api/collections/orders/records/${order.id}`,
    {
      virtualAccounts: {
        ...order.virtualAccounts,
        [bankCode]: virtualAccount,
      },
    }
  );

  return updatedOrder;
};
