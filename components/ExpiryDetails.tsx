import React, { FC } from "react";
import { Link } from "../renderer/Link";

export { ExpiryDetails };

type Props = {};

const ExpiryDetails: FC<Props> = () => {
  return (
    <div className="px-6 pt-6 lg:pt-0">
      <h1 className="font-semibold text-3xl mb-2 text-center lg:text-left">
        Payment for this order has expired :(
      </h1>
      <p className="mb-6 text-center lg:text-left">
        Oops! Unfortunately, you have missed the expiry date for this payment.
        Go back and create another order{" "}
        <Link href="/" className="dark:text-teal-400 hover:underline">
          here
        </Link>
        .
      </p>
    </div>
  );
};
