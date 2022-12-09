import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { BankTransfer } from "./icons/BankTransfer";
import { CreditCardPayment } from "./CreditCardPayment";
import { CreditCard } from "./icons/CreditCard";
import { Ewallet } from "./icons/Ewallet";
import { EwalletPayment } from "./EwalletPayment";
import { QrCode } from "./icons/QrCode";
import { QrCodePayment } from "./QrCodePayment";
import { RetailOutlet } from "./icons/RetailOutlet";
import { RetailOutletPayment } from "./RetailOutletPayment";
import { VirtualAccountPayment } from "./VirtualAccountPayment";

export { Payment, usePaymentContext };

const PAYMENT_METHODS = [
  { key: "CARD", icon: CreditCard, label: "Card" },
  { key: "VIRTUAL_ACCOUNT", icon: BankTransfer, label: "Bank Transfer" },
  { key: "OVER_THE_COUNTER", icon: RetailOutlet, label: "Retail Outlet" },
  { key: "EWALLET", icon: Ewallet, label: "E-wallet" },
  { key: "QR_CODE", icon: QrCode, label: "QR Code" },
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
      <div className="flex flex-col relative">
        <PaymentMethodSelector />
        <div className="pb-6">
          {(() => {
            switch (selectedMethod) {
              case "CARD":
                return <CreditCardPayment />;
              case "VIRTUAL_ACCOUNT":
                return <VirtualAccountPayment />;
              case "OVER_THE_COUNTER":
                return <RetailOutletPayment />;
              case "EWALLET":
                return <EwalletPayment />;
              case "QR_CODE":
                return <QrCodePayment />;
              default:
                return null;
            }
          })()}
        </div>
      </div>
    </PaymentContext.Provider>
  );
};

const PaymentMethodSelector: FC = () => {
  const { locked, selectedMethod } = usePaymentContext();
  const [scrollableDistance, setScrollableDistance] = useState({
    left: 0,
    right: 0,
  });
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scroller.current) {
      const scrollerRef = scroller.current;
      const handleScrolled = () => {
        const containerWidth = scrollerRef.getBoundingClientRect().width;
        const totalScrollableDistance =
          scrollerRef.scrollWidth - containerWidth;
        if (totalScrollableDistance === 0) {
          setScrollableDistance({ left: 0, right: 0 });
          return;
        }
        const left = scrollerRef.scrollLeft;
        const right =
          scrollerRef.scrollWidth - (scrollerRef.scrollLeft + containerWidth);
        setScrollableDistance({
          left: left / totalScrollableDistance,
          right: right / totalScrollableDistance,
        });
      };
      handleScrolled();
      scrollerRef.addEventListener("scroll", handleScrolled);
      window.addEventListener("resize", handleScrolled);
      return () => {
        scrollerRef.removeEventListener("scroll", handleScrolled);
        window.removeEventListener("resize", handleScrolled);
      };
    }
  }, []);

  return (
    <div className="flex relative justify-center py-6 lg:sticky top-0 z-10">
      <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-b from-stone-50 dark:from-stone-900 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-6 bg-stone-50 dark:bg-stone-900" />
      <div
        ref={scroller}
        className="relative overflow-x-auto lg:overflow-x-hidden py-2 bg-stone-50 dark:bg-stone-900"
      >
        <ul className="flex justify-center space-x-2 w-fit px-6">
          {PAYMENT_METHODS.map((paymentMethod) => {
            const isSelected = selectedMethod === paymentMethod.key;

            return (
              <li key={paymentMethod.key}>
                <button
                  type="button"
                  onClick={() => {
                    if (!locked) {
                      window.location.hash = `#${paymentMethod.key.toLocaleLowerCase()}`;
                    }
                  }}
                  className={`w-28 lg:w-32 h-20 lg:h-24 p-2 lg:p-3 shadow border-2 bg-white dark:bg-stone-800 rounded-lg flex flex-col items-center space-y-2 justify-end ${
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
                    <paymentMethod.icon className="h-8 lg:h-10 w-8 lg:w-10" />
                  </span>
                  <span
                    className={`${
                      isSelected
                        ? "text-teal-600 dark:text-teal-400"
                        : "text-stone-500 dark:text-stone-400 group-hover:text-stone-600 dark:group-hover:text-stone-100"
                    } font-semibold transition-colors text-xs lg:text-sm`}
                  >
                    {paymentMethod.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      {scrollableDistance.left > 0 && (
        <div className="absolute left-0 top-6 bottom-6 w-24 flex justify-center items-center">
          <div
            className="absolute inset-0 bg-gradient-to-l from-transparent via-stone-50 dark:via-stone-900 to-stone-50 dark:to-stone-900"
            style={{ opacity: scrollableDistance.left }}
          />
          <button
            type="button"
            className="relative w-12 h-12 rounded-full bg-stone-50 dark:bg-stone-800 hover:bg-white hover:dark:bg-stone-700 shadow-lg flex justify-center items-center text-3xl dark:text-stone-500 hover:dark:text-stone-100 transition-colors"
            onClick={() => {
              if (scroller.current) {
                scroller.current.scroll({
                  left:
                    scroller.current.scrollLeft -
                    scroller.current.getBoundingClientRect().width / 2,
                  behavior: "smooth",
                });
              }
            }}
          >
            &larr;
          </button>
        </div>
      )}
      {scrollableDistance.right > 0 && (
        <div className="absolute right-0 top-6 bottom-6 w-24 flex justify-center items-center">
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-stone-50 dark:via-stone-900 to-stone-50 dark:to-stone-900"
            style={{ opacity: scrollableDistance.right }}
          />
          <button
            type="button"
            className="relative w-12 h-12 rounded-full bg-stone-50 dark:bg-stone-800 hover:bg-white hover:dark:bg-stone-700 shadow-lg flex justify-center items-center text-3xl dark:text-stone-500 hover:dark:text-stone-100 transition-colors"
            onClick={() => {
              if (scroller.current) {
                scroller.current.scroll({
                  left:
                    scroller.current.scrollLeft +
                    scroller.current.getBoundingClientRect().width / 2,
                  behavior: "smooth",
                });
              }
            }}
          >
            &rarr;
          </button>
        </div>
      )}
    </div>
  );
};
