import { xenditApi } from "../../helpers/xendit";

export { simulateVirtualAccountPayment };

const simulateVirtualAccountPayment = async (order: PendingOrder) => {
  await xenditApi.post(
    `callback_virtual_accounts/external_id=${order.id}/simulate_payment`,
    {
      amount: order.amount,
    }
  );
};
