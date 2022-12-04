export { getPaymentChannelLabel, PaymentChannel, paymentChannels };

const paymentChannels = [
  "CARD",
  "BRI",
  "BNI",
  "BCA",
  "MANDIRI",
  "PERMATA",
  "ALFAMART",
  "INDOMARET",
  "OVO",
] as const;

type PaymentChannel = typeof paymentChannels[number];

const getPaymentChannelLabel = (channel: PaymentChannel): string => {
  switch (channel) {
    case "CARD":
      return "Credit/Debit Card";
    case "BRI":
      return "Bank Transfer – BRI";
    case "BNI":
      return "Bank Transfer – BNI";
    case "BCA":
      return "Bank Transfer – BCA";
    case "MANDIRI":
      return "Bank Transfer – Bank Mandiri";
    case "PERMATA":
      return "Bank Transfer – Bank Permata";
    case "ALFAMART":
      return "Retail Outlet – Alfamart";
    case "INDOMARET":
      return "Retail Outlet – Indomaret";
    case "OVO":
      return "E-wallet – OVO";
    default:
      return "N/A";
  }
};
