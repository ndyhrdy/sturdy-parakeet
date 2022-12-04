import { xenditApi } from "../../helpers/xendit";

export { createEwalletRedirectionCharge };

const createEwalletRedirectionCharge = async (
  order: PendingOrder,
  channel: string
) => {
  const { data: createEwalletRedirectionChargeResponse } =
    await xenditApi.post<{ actions: object }>("/ewallets/charges", {
      reference_id: order.id,
      currency: "IDR",
      amount: order.amount,
      checkout_method: "ONE_TIME_PAYMENT",
      channel_code: `ID_${channel}`,
      channel_properties: {
        success_redirect_url: `${process.env.VITE_BASE_URL}/pay/${order.id}#ewallet`,
      },
    });
  return createEwalletRedirectionChargeResponse;
};
