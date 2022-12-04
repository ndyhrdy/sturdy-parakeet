import { xenditApi } from "../../helpers/xendit";

export { createOvoCharge };

const createOvoCharge = async (order: PendingOrder, phoneNumber: string) => {
  const { data: createOvoChargeResponse } = await xenditApi.post(
    "/ewallets/charges",
    {
      reference_id: order.id,
      currency: "IDR",
      amount: order.amount,
      checkout_method: "ONE_TIME_PAYMENT",
      channel_code: "ID_OVO",
      channel_properties: {
        mobile_number: phoneNumber,
      },
    }
  );
  return createOvoChargeResponse;
};
