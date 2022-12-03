import React, { FC, useCallback, useEffect, useState } from "react";
import { CreditCardForm } from "./CreditCardForm";
import { usePaymentContext } from "./Payment";

export { CreditCardPayment };

const CreditCardPayment: FC = () => {
  const { onError, onUnlock } = usePaymentContext();

  const [reviewing, setReviewing] = useState<false | string>(false);

  const handleIframeError = useCallback(() => {
    onError(
      "There was a problem redirecting to the authentication page. Please try again."
    );
    onUnlock();
  }, [onError, onUnlock]);

  const handleReset = useCallback(() => {
    setReviewing(false);
    onUnlock();
  }, [onUnlock]);

  const handleReview = useCallback((reviewUrl: string) => {
    setReviewing(reviewUrl);
  }, []);

  useEffect(() => {
    onUnlock();
  }, [onUnlock]);

  if (reviewing) {
    return (
      <div className="px-6">
        <iframe
          src={reviewing}
          seamless
          className="bg-white h-96 w-full rounded-lg"
          onError={handleIframeError}
        />
      </div>
    );
  }

  return <CreditCardForm onReset={handleReset} onReview={handleReview} />;
};
