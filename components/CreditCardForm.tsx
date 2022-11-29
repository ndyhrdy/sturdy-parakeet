import { useFormik } from "formik";
import * as yup from "yup";
import React, { FC } from "react";
import { usePaymentContext } from "./Payment";

export { CreditCardForm };

const CreditCardForm: FC = () => {
  const { busy, onError, onSubmit, onSuccess } = usePaymentContext();

  const { errors, handleChange, handleSubmit, isSubmitting, values } =
    useFormik({
      initialValues: {
        cardNumber: "",
        validThru: "",
        cvv: "",
      },
      onSubmit: async () => {},
      validationSchema: yup.object({
        cardNumber: yup.string().required("Required"),
        validThru: yup.string().required("Required"),
        cvv: yup.string().required("Required"),
      }),
    });

  return (
    <form className="px-6" onSubmit={handleSubmit}>
      <div className="flex -mx-1">
        <div className="px-1 w-1/2 flex flex-col space-y-1">
          <label htmlFor="cardNumber" className="text-sm dark:text-stone-400">
            Card Number
          </label>
          <input
            type="tel"
            name="cardNumber"
            value={values.cardNumber}
            onChange={handleChange}
            className="h-10 px-3 rounded-md dark:bg-stone-800 focus:ring-2 ring-teal-500 outline-none dark:placeholder:text-stone-500"
            placeholder="4000 0000 0000 0002"
            autoFocus
          />
          {!!errors.cardNumber && (
            <p className="text-xs text-red-500">{errors.cardNumber}</p>
          )}
        </div>
        <div className="px-1 w-1/4 flex flex-col space-y-1">
          <label htmlFor="validThru" className="text-sm dark:text-stone-400">
            Valid Thru
          </label>
          <input
            type="tel"
            name="validThru"
            value={values.validThru}
            onChange={handleChange}
            className="h-10 px-3 rounded-md dark:bg-stone-800 focus:ring-2 ring-teal-500 outline-none dark:placeholder:text-stone-500"
            placeholder="12/34"
          />
          {!!errors.validThru && (
            <p className="text-xs text-red-500">{errors.validThru}</p>
          )}
        </div>
        <div className="px-1 w-1/4 flex flex-col space-y-1">
          <label htmlFor="cvv" className="text-sm dark:text-stone-400">
            Security Code
          </label>
          <input
            type="tel"
            name="cvv"
            value={values.cvv}
            onChange={handleChange}
            className="h-10 px-3 rounded-md dark:bg-stone-800 focus:ring-2 ring-teal-500 outline-none dark:placeholder:text-stone-500"
            placeholder="123"
          />
          {!!errors.cvv && <p className="text-xs text-red-500">{errors.cvv}</p>}
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          disabled={busy}
          className={`rounded-lg text-white h-10 px-4 text-lg ${
            busy
              ? "bg-stone-500 cursor-not-allowed"
              : "transition-colors bg-teal-500 hover:bg-teal-600"
          }`}
        >
          Pay with Credit Card &rarr;
        </button>
      </div>
    </form>
  );
};
