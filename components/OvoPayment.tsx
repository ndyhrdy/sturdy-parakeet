import { isEmpty } from "lodash";
import { useFormik } from "formik";
import * as yup from "yup";
import React from "react";
import ReactInputMask from "react-input-mask";
import { usePaymentContext } from "./Payment";

export { OvoPayment };

const OvoPayment = () => {
  const { locked } = usePaymentContext();

  const { errors, handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      phone: "",
    },
    onSubmit: async () => {},
    validationSchema: yup.object({ phone: yup.string().required("Required") }),
  });

  return (
    <form className="p-6" onSubmit={handleSubmit}>
      <div className="px-1 w-full flex flex-col space-y-1">
        <label htmlFor="phone" className="text-sm dark:text-stone-400">
          OVO Registered Phone Number
        </label>
        <ReactInputMask
          type="tel"
          name="phone"
          mask={isEmpty(values.phone) ? "" : "+62 999 9999 9999"}
          maskChar={null}
          value={values.phone}
          onChange={handleChange}
          disabled={locked}
          className="h-10 px-3 rounded-md dark:bg-stone-800 focus:ring-2 ring-teal-500 outline-none dark:placeholder:text-stone-500"
          autoFocus
        />
        {!!errors.phone && (
          <p className="text-xs text-red-500">{errors.phone}</p>
        )}
      </div>
      <div className="mt-6">
        <button
          type="submit"
          disabled={locked}
          className={`rounded-lg text-white h-10 px-4 text-lg ${
            locked
              ? "bg-stone-500 cursor-not-allowed"
              : "transition-colors bg-teal-500 hover:bg-teal-600"
          }`}
        >
          Pay with OVO &rarr;
        </button>
      </div>
    </form>
  );
};
