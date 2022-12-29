import { useFormik } from "formik";
import _ from "lodash";
import InputMask from "react-input-mask";
import React, { FC, useCallback, useEffect } from "react";
import { api } from "../helpers/api";
import { usePaymentContext } from "./Payment";
import { SimulateAlert } from "./SimulateAlert";

export { CreditCardForm };

type FormValues = {
  cardNumber: string;
  validThru: string;
  cvv: string;
};

type Props = {
  onReset: () => any;
  onReview: (reviewUrl: string) => any;
};

declare global {
  interface Window {
    Xendit: any;
  }
}

const formatValues = (values: FormValues) => {
  const cardNumber = values.cardNumber.replaceAll(" ", "");
  const [expiryMonth, expiryYear] = values.validThru.split("/");

  return {
    cardNumber,
    expiryMonth,
    expiryYear: `20${expiryYear}`,
  };
};

const CreditCardForm: FC<Props> = ({ onReset, onReview }) => {
  const {
    locked: busy,
    onError,
    onLock,
    onSubmit,
    order,
  } = usePaymentContext();

  const { errors, handleChange, handleSubmit, setFieldValue, values } =
    useFormik<FormValues>({
      initialValues: {
        cardNumber: "",
        validThru: "",
        cvv: "",
      },
      onSubmit: async (values) => {
        if (!order) {
          return;
        }

        onLock();
        type TokenizationResponse = {
          id: string; // Token identifier
          status: "IN_REVIEW" | "VERIFIED" | "FAILED"; // Token identifier status
          failure_reason: string; // Token identifier failure reason
          payer_authentication_url: string; // URL where your customer can perform 3DS verification
        };

        const { cardNumber, expiryMonth, expiryYear } = formatValues(values);

        const handleVerified = async (token: string) => {
          try {
            await api.post(`/payment/charge/${order.id}`, {
              token,
            });
          } catch (error) {
            onError(error as string);
            onReset();
            return Promise.reject(error);
          }
          onSubmit();
        };

        window.Xendit.card.createToken(
          {
            amount: order.amount,
            card_number: cardNumber,
            card_exp_month: expiryMonth,
            card_exp_year: expiryYear,
            card_cvn: values.cvv,
            is_multiple_use: false,
            should_authenticate: true,
          },
          (err: any, response: TokenizationResponse) => {
            if (err) {
              onError();
              return Promise.reject(err);
            }
            if (response.status === "VERIFIED") {
              return handleVerified(response.id);
            }
            if (response.status === "IN_REVIEW") {
              return onReview(response.payer_authentication_url);
            }
            return onError(response.failure_reason);
          }
        );
      },
      validate: (values) => {
        let errors: any = {};
        const { cardNumber, expiryMonth, expiryYear } = formatValues(values);
        if (!window.Xendit.card.validateCardNumber(cardNumber)) {
          errors.cardNumber = "Card number is not valid";
        }
        if (!window.Xendit.card.validateExpiry(expiryMonth, expiryYear)) {
          errors.validThru = "Invalid";
        }
        if (!window.Xendit.card.validateCvn(values.cvv)) {
          errors.cvv = "Invalid";
        }

        if (!_.isEmpty(errors)) {
          return errors;
        }
      },
    });

  const handleSimulate = useCallback(() => {
    setFieldValue("cardNumber", "4000 0000 0000 1091");
    setFieldValue("validThru", "12/34");
    setFieldValue("cvv", "123");
    setTimeout(() => {
      handleSubmit();
    }, 0);
  }, [setFieldValue, handleSubmit]);

  useEffect(() => {
    window.Xendit.setPublishableKey(import.meta.env.VITE_XENDIT_PUBLIC_KEY);
  }, []);

  return (
    <form
      className="px-6 max-w-lg lg:max-w-none mx-auto"
      onSubmit={handleSubmit}
    >
      <SimulateAlert disabled={busy} onSimulate={handleSimulate}>
        <p>Simulate payment using Credit Card.</p>
        <small className="opacity-75">
          Note: Enter <code>"1234"</code> in the 3DS authentication page.
        </small>
      </SimulateAlert>
      <div className="flex -mx-1 flex-wrap">
        <div className="px-1 w-full lg:w-1/2 flex flex-col space-y-1 mb-4">
          <label htmlFor="cardNumber" className="text-sm dark:text-stone-400">
            Card Number
          </label>
          <InputMask
            type="tel"
            name="cardNumber"
            mask={_.isEmpty(values.cardNumber) ? "" : "9999 9999 9999 9999"}
            maskChar={null}
            value={values.cardNumber}
            onChange={handleChange}
            disabled={busy}
            className="h-10 px-3 rounded-md dark:bg-stone-800 border dark:border-none focus:border-transparent focus:ring-2 ring-teal-500 outline-none dark:placeholder:text-stone-500"
            placeholder="4000 0000 0000 1091"
            autoFocus
          />
          {!!errors.cardNumber && (
            <p className="text-xs text-red-500">{errors.cardNumber}</p>
          )}
        </div>
        <div className="px-1 w-1/2 lg:w-1/4 flex flex-col space-y-1 mb-4">
          <label htmlFor="validThru" className="text-sm dark:text-stone-400">
            Valid Thru
          </label>
          <InputMask
            type="tel"
            name="validThru"
            mask={_.isEmpty(values.validThru) ? "" : "99/99"}
            maskChar={null}
            value={values.validThru}
            onChange={handleChange}
            disabled={busy}
            className="h-10 px-3 rounded-md dark:bg-stone-800 border dark:border-none focus:border-transparent focus:ring-2 ring-teal-500 outline-none dark:placeholder:text-stone-500"
            placeholder="12/34"
          />
          {!!errors.validThru && (
            <p className="text-xs text-red-500">{errors.validThru}</p>
          )}
        </div>
        <div className="px-1 w-1/2 lg:w-1/4 flex flex-col space-y-1 mb-4">
          <label htmlFor="cvv" className="text-sm dark:text-stone-400">
            Security Code
          </label>
          <InputMask
            type="tel"
            name="cvv"
            mask={_.isEmpty(values.cvv) ? "" : "999"}
            maskChar={null}
            value={values.cvv}
            onChange={handleChange}
            disabled={busy}
            className="h-10 px-3 rounded-md dark:bg-stone-800 border dark:border-none focus:border-transparent focus:ring-2 ring-teal-500 outline-none dark:placeholder:text-stone-500"
            placeholder="123"
          />
          {!!errors.cvv && <p className="text-xs text-red-500">{errors.cvv}</p>}
        </div>
      </div>

      <div className="pt-4 flex justify-center lg:justify-start">
        <button
          type="submit"
          disabled={busy}
          className={`rounded-lg text-white h-10 px-4 text-lg ${
            busy
              ? "bg-stone-500 cursor-not-allowed"
              : "transition-colors bg-teal-500 hover:bg-teal-600"
          }`}
        >
          Pay with Card &rarr;
        </button>
      </div>
    </form>
  );
};
