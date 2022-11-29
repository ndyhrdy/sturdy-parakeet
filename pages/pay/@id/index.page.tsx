import { UnsubscribeFunc } from "pocketbase";
import React, { FC, useEffect, useState } from "react";
import { Link } from "../../../renderer/Link";
import { PageProps } from "../../../renderer/types";
import { Payment } from "../../../components/Payment";
import { pb } from "../../../helpers/pocketbase";
import xenditLogo from "../../../assets/xendit-logo.svg";

export { Page };

type Props = {
  order: Order;
};

const Page: FC<PageProps<Props>> = ({ order: defaultOrder }) => {
  const [order, setOrder] = useState(defaultOrder);

  useEffect(() => {
    let unsubscribe: UnsubscribeFunc;
    const subscribe = async () => {
      unsubscribe = await pb
        .collection("orders")
        .subscribe<Order>(order.id, (e) => {
          setOrder(e.record);
        });
    };
    subscribe();

    return () => {
      unsubscribe?.();
    };
  }, [order.id]);

  return (
    <>
      <div className="container mx-auto max-w-screen-xl border-l border-r border-dashed bg-stone-50 dark:border-stone-800 dark:bg-stone-900">
        <div className="flex items-stretch min-h-screen">
          <div className="w-1/2 border-r border-dashed dark:border-stone-800 flex flex-col justify-center">
            <Link
              href="/"
              className="inline-flex self-start mb-12 items-center px-6 space-x-3 group"
            >
              <div className="bg-teal-500 group-hover:bg-teal-600 w-14 h-14 rounded-xl flex justify-center items-center shadow-lg transition-colors">
                <img src={xenditLogo} alt="Xendit logo" />
              </div>
              <span className="font-semibold text-xl text-teal-400 group-hover:text-teal-500 transition-colors">
                Xendit Checkout Demo
              </span>
            </Link>
            <div className="space-y-2 mb-12 px-6">
              <p className="text-stone-400 dark:text-stone-600">
                Hi! You need to pay
              </p>
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
            <p className="text-stone-400 dark:text-stone-600 px-6">
              Order ID: {order.id}
            </p>
          </div>
          <div className="w-1/2 flex flex-col justify-center">
            <Payment />
          </div>
        </div>
      </div>
    </>
  );
};
