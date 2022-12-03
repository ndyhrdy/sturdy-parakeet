import { xenditApi } from "../../helpers/xendit";

export { createPaymentCode };

const createPaymentCode = async (order: PendingOrder, roName: string) => {
  const { data: createPaymentCodeResponse } = await xenditApi.post(
    "/fixed_payment_code",
    {
      external_id: order.id,
      retail_outlet_name: roName,
      name: "Xendit Checkout Demo",
      is_single_use: true,
      expected_amount: order.amount,
      expiration_date: order.expiry,
    }
  );
  return createPaymentCodeResponse;
};
