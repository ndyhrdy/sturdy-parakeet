import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { BankTransfer } from "./icons/BankTransfer";
import { CreditCardPayment } from "./CreditCardPayment";
import { CreditCard } from "./icons/CreditCard";
import { RetailOutlet } from "./icons/RetailOutlet";
import { RetailOutletPayment } from "./RetailOutletPayment";
import { VirtualAccountPayment } from "./VirtualAccountPayment";

export { Payment, usePaymentContext };

const PAYMENT_METHODS = [
  { key: "CARD", icon: CreditCard, label: "Card" },
  { key: "VIRTUAL_ACCOUNT", icon: BankTransfer, label: "Bank Transfer" },
  { key: "OVER_THE_COUNTER", icon: RetailOutlet, label: "Retail Outlet" },
];

type PaymentContextValues = {
  locked: boolean;
  onError: (message?: string) => any;
  onLock: () => any;
  onUnlock: () => any;
  onSubmit: () => any;
  order: PendingOrder | null;
  processing: boolean;
  selectedMethod: string | null;
};

const PaymentContext = createContext<PaymentContextValues>({
  locked: false,
  onError: () => {},
  onLock: () => {},
  onUnlock: () => {},
  onSubmit: () => {},
  order: null,
  processing: false,
  selectedMethod: null,
});

const usePaymentContext = () => useContext(PaymentContext);

type Props = {
  order: PendingOrder;
};

const Payment: FC<Props> = ({ order }) => {
  const [locked, setLocked] = useState(false);
  const [processing, setProcessing] = useState(false);
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

  const handleError = useCallback((message?: string) => {
    window.alert(message);
  }, []);

  const handleLock = useCallback(() => {
    setLocked(true);
  }, []);

  const handleSubmit = useCallback(() => {
    setProcessing(true);
  }, []);

  const handleUnlock = useCallback(() => {
    setLocked(false);
  }, []);

  return (
    <PaymentContext.Provider
      value={{
        locked,
        onError: handleError,
        onLock: handleLock,
        onSubmit: handleSubmit,
        onUnlock: handleUnlock,
        order,
        processing,
        selectedMethod,
      }}
    >
      <div className="flex flex-col space-y-6">
        <ul className="flex px-5">
          {PAYMENT_METHODS.map((paymentMethod) => {
            const isSelected = selectedMethod === paymentMethod.key;

            return (
              <li key={paymentMethod.key} className="px-1">
                <button
                  type="button"
                  onClick={() => {
                    if (!locked) {
                      window.location.hash = `#${paymentMethod.key.toLocaleLowerCase()}`;
                    }
                  }}
                  className={`w-36 h-24 p-3 shadow border-2 bg-white dark:bg-stone-800 rounded-lg flex flex-col space-y-2 justify-end ${
                    isSelected
                      ? "border-teal-500 dark:border-teal-600"
                      : "border-white dark:border-stone-800 dark:hover:border-stone-700 dark:hover:bg-stone-700 hover:shadow-md group transition-all"
                  } ${locked ? "cursor-not-allowed" : ""}`}
                >
                  <span
                    className={`transition-colors ${
                      isSelected
                        ? "text-teal-500"
                        : "text-stone-400 dark:text-stone-400 group-hover:text-stone-600 dark:group-hover:text-stone-100"
                    }`}
                  >
                    <paymentMethod.icon className="h-10 w-10" />
                  </span>
                  <span
                    className={`${
                      isSelected
                        ? "text-teal-600 dark:text-teal-400"
                        : "text-stone-500 dark:text-stone-400 group-hover:text-stone-600 dark:group-hover:text-stone-100"
                    } font-semibold transition-colors text-sm`}
                  >
                    {paymentMethod.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <div>
          {(() => {
            switch (selectedMethod) {
              case "CARD":
                return <CreditCardPayment />;
              case "VIRTUAL_ACCOUNT":
                return <VirtualAccountPayment />;
              case "OVER_THE_COUNTER":
                return <RetailOutletPayment />;
              default:
                return null;
            }
          })()}
        </div>
      </div>
    </PaymentContext.Provider>
  );
};
