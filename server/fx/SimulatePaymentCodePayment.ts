import { xenditApi } from "../../helpers/xendit";

export { simulatePaymentCodePayment };

const simulatePaymentCodePayment = async (
  order: PendingOrder,
  channel: string,
  paymentCode: string
) => {
  await xenditApi.post(`/fixed_payment_code/simulate_payment`, {
    retail_outlet_name: channel,
    payment_code: paymentCode,
    transfer_amount: order.amount,
  });
};
