export { getPaymentChannelLabel, PaymentChannel, paymentChannels };

const paymentChannels = ["CARD"] as const;

type PaymentChannel = typeof paymentChannels[number];

const getPaymentChannelLabel = (channel: PaymentChannel): string => {
  switch (channel) {
    case "CARD":
      return "Credit/Debit Card";
    default:
      return "N/A";
  }
};
