import React from "react";
import { OvoForm } from "./OvoForm";
import { usePaymentContext } from "./Payment";

export { OvoPayment };

const OvoPayment = () => {
  const { processing } = usePaymentContext();

  if (processing) {
    return (
      <div className="p-6">
        <p>
          A notification has been sent to your OVO app. Head to the mobile app
          to complete the payment.
        </p>
      </div>
    );
  }

  return <OvoForm />;
};
