import React, { FC, useMemo } from "react";
import {
  getPaymentChannelLabel,
  PaymentChannel,
} from "../helpers/payment-channel";
import { Link } from "../renderer/Link";

export { PaymentDetails };

type Props = PaidOrder;

const PaymentDetails: FC<Props> = ({ ...order }) => {
  const details = useMemo(() => {
    return [
      {
        label: "Paid Amount",
        value: Intl.NumberFormat("id", {
          style: "currency",
          currency: "IDR",
        }).format(order.amount),
      },
      {
        label: "Payment Channel",
        value: getPaymentChannelLabel(
          order.paymentMethod.channel as PaymentChannel
        ),
      },
      {
        label: "Payment Received",
        value: `${Intl.DateTimeFormat("id", { dateStyle: "long" }).format(
          new Date(order.paid)
        )}, ${Intl.DateTimeFormat("id", { timeStyle: "long" }).format(
          new Date(order.paid)
        )}`,
      },
    ];
  }, [order]);

  return (
    <div className="px-6 pt-6 lg:pt-0">
      <h1 className="font-semibold text-3xl mb-2 text-center lg:text-left">
        Thank you for your payment!
      </h1>
      <p className="mb-6 text-center lg:text-left">
        We have successfully received your payment for this order.
      </p>
      <h2 className="uppercase font-semibold text-sm text-stone-500 mb-3">
        Payment Details
      </h2>
      <ul className="space-y-2 mb-12">
        {details.map(({ label, value }) => {
          return (
            <li key={label} className="flex -mx-1">
              <div className="px-1 w-1/2 lg:w-1/3">{label}</div>
              <div className="px-1 w-1/2 lg:w-2/3">{value}</div>
            </li>
          );
        })}
      </ul>
      <p className="text-center lg:text-left">
        Click{" "}
        <Link
          href="/"
          className="text-teal-500 dark:text-teal-400 hover:underline"
        >
          here
        </Link>{" "}
        to return to the home page.
      </p>
    </div>
  );
};
