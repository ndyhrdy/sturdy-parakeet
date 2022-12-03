import { xenditApi } from "../../helpers/xendit";

export { createVirtualAccount };

const createVirtualAccount = async (order: PendingOrder, bankCode: string) => {
  const { data: createVirtualAccountResponse } = await xenditApi.post(
    "/callback_virtual_accounts",
    {
      external_id: order.id,
      bank_code: bankCode,
      name: "Xendit Checkout Demo",
      is_closed: true,
      expected_amount: order.amount,
      expiration_date: order.expiry,
    }
  );
  return createVirtualAccountResponse;
};
