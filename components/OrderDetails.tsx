import React, { FC } from "react";

export { OrderDetails };

type Props = BaseOrder;

const OrderDetails: FC<Props> = ({ ...order }) => {
  return (
    <div className="space-y-2 px-6">
      <p className="text-stone-400 dark:text-stone-600">Hi! You need to pay</p>
      <p className="text-5xl font-semibold">
        {Intl.NumberFormat("id", {
          style: "currency",
          currency: "IDR",
        }).format(order.amount)}
      </p>
      <p>
        by{" "}
        {Intl.DateTimeFormat("id", { dateStyle: "long" }).format(
          new Date(order.expiry)
        )}
        ,{" "}
        {Intl.DateTimeFormat("id", { timeStyle: "long" }).format(
          new Date(order.expiry)
        )}
      </p>
    </div>
  );
};
