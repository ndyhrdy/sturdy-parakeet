import { xenditApi } from "../../helpers/xendit";

export { createQrCode };

const createQrCode = async (order: PendingOrder) => {
  const { data: createQrCodeResponse } = await xenditApi.post("/qr_codes", {
    external_id: order.id,
    callback_url:
      process.env.DEVELOPMENT_CALLBACK_URL ||
      `${process.env.VITE_API_BASE_URL}/payment/qr/callback`,
    type: "DYNAMIC",
    currency: "IDR",
    amount: order.amount,
    expires_at: order.expiry,
  });
  return createQrCodeResponse;
};
