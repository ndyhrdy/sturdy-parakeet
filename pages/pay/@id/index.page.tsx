import { UnsubscribeFunc } from "pocketbase";
import React, { FC, useEffect, useState } from "react";
import { ExpiryDetails } from "../../../components/ExpiryDetails";
import { MerchantDetails } from "../../../components/MerchantDetails";
import { OrderDetails } from "../../../components/OrderDetails";
import { PageProps } from "../../../renderer/types";
import { Payment } from "../../../components/Payment";
import { PaymentDetails } from "../../../components/PaymentDetails";
import { pb } from "../../../helpers/pocketbase";

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
      <div className="container mx-auto max-w-screen-xl lg:border-l lg:border-r border-dashed bg-stone-50 dark:border-stone-800 dark:bg-stone-900">
        <div className="flex flex-col lg:flex-row items-stretch min-h-screen">
          <div className="lg:w-1/2 lg:border-r border-dashed dark:border-stone-800 flex flex-col justify-center mb-6 lg:mb-0 lg:h-screen lg:sticky top-0">
            <MerchantDetails />
            <div className="mb-6 lg:mb-12">
              {(() => {
                switch (order.status) {
                  case "PENDING":
                    return <OrderDetails {...order} />;
                  case "PAID":
                    return <PaymentDetails {...order} />;
                  case "EXPIRED":
                    return <ExpiryDetails />;
                  default:
                    return null;
                }
              })()}
            </div>
            <p className="text-stone-400 dark:text-stone-600 px-6 text-center lg:text-left">
              Order ID: {order.id}
            </p>
          </div>
          <div className="lg:w-1/2 flex flex-col justify-center">
            {order.status === "PENDING" && <Payment order={order} />}
          </div>
        </div>
      </div>
    </>
  );
};
