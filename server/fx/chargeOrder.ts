import { xenditApi } from "../../helpers/xendit";

export { chargeOrder };

const chargeOrder = async (order: PendingOrder, token: string) => {
  const { data: chargeResponse } = await xenditApi.post(
    "/credit_card_charges",
    {
      token_id: token,
      external_id: order.id,
      amount: order.amount,
    }
  );
  return chargeResponse;
};
