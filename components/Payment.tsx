import React, { FC, useEffect, useState } from "react";
import BankTransfer from "./icons/BankTransfer";
import CreditCard from "./icons/CreditCard";

export { Payment };

const PAYMENT_METHODS = [
  { key: "CREDIT_CARD", icon: CreditCard, label: "Credit Card" },
  { key: "BANK_TRANSFER", icon: BankTransfer, label: "Bank Transfer" },
];

const Payment: FC = () => {
  const [selectedMethod, setSelectedMethod] = useState(PAYMENT_METHODS[0].key);

  useEffect(() => {
    const handleHashChange = () => {
      const selectedMethodFromHash = PAYMENT_METHODS.find(
        ({ key }) => `#${key.toLocaleLowerCase()}` === window.location.hash
      );
      if (!selectedMethodFromHash) {
        window.location.hash = `#${PAYMENT_METHODS[0].key.toLocaleLowerCase()}`;
        return;
      }
      setSelectedMethod(selectedMethodFromHash.key);
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <div className="flex flex-col space-y-6">
      <ul className="flex px-5">
        {PAYMENT_METHODS.map((paymentMethod) => {
          const isSelected = selectedMethod === paymentMethod.key;

          return (
            <li key={paymentMethod.key} className="px-1">
              <button
                type="button"
                onClick={() => {
                  window.location.hash = `#${paymentMethod.key.toLocaleLowerCase()}`;
                }}
                className={`w-36 h-24 p-3 shadow border-2 bg-white dark:bg-stone-800 rounded-lg flex flex-col space-y-2 justify-end ${
                  isSelected
                    ? "border-teal-500 dark:border-teal-600"
                    : "border-white dark:border-stone-800 dark:hover:border-stone-700 dark:hover:bg-stone-700 hover:shadow-md group transition-all"
                }`}
              >
                <span
                  className={`transition-colors ${
                    isSelected
                      ? "text-teal-500"
                      : "text-stone-400 dark:text-stone-400 group-hover:text-stone-600 dark:group-hover:text-stone-100"
                  }`}
                >
                  <paymentMethod.icon />
                </span>
                <span
                  className={`${
                    isSelected
                      ? "text-teal-600 dark:text-teal-400"
                      : "text-stone-500 dark:text-stone-400 group-hover:text-stone-600 dark:group-hover:text-stone-100"
                  } font-semibold transition-colors`}
                >
                  {paymentMethod.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
