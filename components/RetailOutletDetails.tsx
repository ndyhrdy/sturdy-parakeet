import _ from "lodash";
import axios from "axios";
import React, { FC, useCallback, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { api } from "../helpers/api";
import { Simulatable } from "./Simulatable";
import { SimulateAlert } from "./SimulateAlert";
import { usePaymentContext } from "./Payment";

export { RetailOutletDetails };

type Props = {
  channelLabel: string;
  roName: string;
};

const RetailOutletDetails: FC<Props> = ({ channelLabel, roName }) => {
  const { onLock, onUnlock } = usePaymentContext();
  const [instructions, setInstructions] = useState("");

  const [creatingPaymentCode, setCreatingPaymentCode] = useState(false);
  const [attemptedCreatingPaymentCode, setAttemptedCreatingPaymentCode] =
    useState(false);

  const { order } = usePaymentContext();
  const paymentCode = order?.paymentCodes?.[roName];

  const handleCreatePaymentCode = useCallback(async () => {
    if (paymentCode || creatingPaymentCode) {
      return;
    }

    setCreatingPaymentCode(true);
    setAttemptedCreatingPaymentCode(true);
    await api.post(`/payment/ro/${order?.id}`, { roName });
    setCreatingPaymentCode(false);
  }, [roName, creatingPaymentCode, paymentCode]);

  const handleSimulate = useCallback(async () => {
    if (!paymentCode) {
      return;
    }
    await api.post(`/simulate/${order.id}`, {
      paymentMethod: "ro",
      channel: paymentCode.retail_outlet_name,
      paymentCode: paymentCode.payment_code,
    });
  }, [order, paymentCode]);

  useEffect(() => {
    if (!attemptedCreatingPaymentCode) {
      handleCreatePaymentCode();
    }
  }, [handleCreatePaymentCode, attemptedCreatingPaymentCode]);

  useEffect(() => {
    if (creatingPaymentCode) {
      onLock();
    } else {
      onUnlock();
    }
  }, [creatingPaymentCode, onLock, onUnlock]);

  useEffect(() => {
    const getInstructions = async () => {
      if (paymentCode) {
        const { data } = await axios.get<string>(
          `/instructions/${_.lowerCase(roName)}.md`
        );
        let instructions = data;
        Object.entries(paymentCode).forEach(([key, value]) => {
          if (_.isString(value)) {
            instructions = instructions.replaceAll(`{{${key}}}`, value);
          }
        });
        setInstructions(instructions);
      }
    };

    getInstructions();
  }, [roName, paymentCode]);

  if (creatingPaymentCode) {
    return (
      <div className="p-6">
        <p>Looking for a payment destination...</p>
      </div>
    );
  }

  if (paymentCode) {
    return (
      <Simulatable onSimulate={handleSimulate}>
        <div className="p-6 flex flex-col space-y-3">
          <SimulateAlert>Simulate payment using {channelLabel}</SimulateAlert>
          <div>
            <h3 className="uppercase font-semibold text-sm text-stone-500 mb-1">
              Pay to Merchant
            </h3>
            <div className="text-xl">{paymentCode.name}</div>
          </div>
          <div>
            <h3 className="uppercase font-semibold text-sm text-stone-500 mb-1">
              Payment Code
            </h3>
            <div className="text-xl">{paymentCode.payment_code}</div>
          </div>
          <div>
            <h3 className="uppercase font-semibold text-sm text-stone-500 mb-1">
              Amount to Pay
            </h3>
            <div className="text-xl">
              {Intl.NumberFormat("id", {
                style: "currency",
                currency: "IDR",
              }).format(paymentCode.expected_amount)}
            </div>
          </div>
        </div>
        <h3 className="sticky top-0 px-6 py-2 uppercase font-semibold text-sm bg-stone-200 dark:bg-stone-800 dark:text-stone-200 mb-3">
          Instructions
        </h3>
        <ReactMarkdown className="px-6 pb-6 prose-sm prose-headings:font-semibold prose-code:bg-teal-100 dark:prose-code:bg-teal-800 prose-code:rounded prose-code:px-1 prose-code:py-0.5 prose-ol:list-decimal">
          {instructions}
        </ReactMarkdown>
      </Simulatable>
    );
  }

  return (
    <div className="p-6">
      <p>
        Failed to find a payment destination.{" "}
        <button
          type="button"
          onClick={handleCreatePaymentCode}
          className="text-teal-500 dark:text-teal-400 hover:underline"
        >
          Try again
        </button>
      </p>
    </div>
  );
};
