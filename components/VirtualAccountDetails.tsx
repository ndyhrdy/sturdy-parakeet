import _ from "lodash";
import axios from "axios";
import React, { FC, useCallback, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { api } from "../helpers/api";
import { Simulatable } from "./Simulatable";
import { SimulateAlert } from "./SimulateAlert";
import { usePaymentContext } from "./Payment";

export { VirtualAccountDetails };

type Props = {
  bankCode: string;
  channelLabel: string;
};

const VirtualAccountDetails: FC<Props> = ({ bankCode, channelLabel }) => {
  const { onLock, onUnlock } = usePaymentContext();
  const [instructions, setInstructions] = useState("");

  const [creatingVirtualAccount, setCreatingVirtualAccount] = useState(false);
  const [attemptedCreatingVirtualAccount, setAttemptedCreatingVirtualAccount] =
    useState(false);

  const { order } = usePaymentContext();
  const virtualAccount = order?.virtualAccounts?.[bankCode];

  const handleCreateVirtualAccount = useCallback(async () => {
    if (virtualAccount || creatingVirtualAccount) {
      return;
    }

    setCreatingVirtualAccount(true);
    setAttemptedCreatingVirtualAccount(true);
    await api.post(`/payment/va/${order?.id}`, { bankCode });
    setCreatingVirtualAccount(false);
  }, [bankCode, creatingVirtualAccount, virtualAccount]);

  const handleSimulate = useCallback(async () => {
    if (!virtualAccount) {
      return;
    }
    await api.post(`/simulate/${order.id}`, {
      paymentMethod: "va",
    });
  }, [order, virtualAccount]);

  useEffect(() => {
    if (!attemptedCreatingVirtualAccount) {
      handleCreateVirtualAccount();
    }
  }, [handleCreateVirtualAccount, attemptedCreatingVirtualAccount]);

  useEffect(() => {
    if (creatingVirtualAccount) {
      onLock();
    } else {
      onUnlock();
    }
  }, [creatingVirtualAccount, onLock, onUnlock]);

  useEffect(() => {
    const getInstructions = async () => {
      if (virtualAccount) {
        const { data } = await axios.get<string>(
          `/instructions/${_.lowerCase(bankCode)}.md`
        );
        let instructions = data;
        Object.entries(virtualAccount).forEach(([key, value]) => {
          if (_.isString(value)) {
            instructions = instructions.replaceAll(`{{${key}}}`, value);
          }
        });
        setInstructions(instructions);
      }
    };

    getInstructions();
  }, [bankCode, virtualAccount]);

  if (creatingVirtualAccount) {
    return (
      <div className="p-6">
        <p>Looking for a payment destination...</p>
      </div>
    );
  }

  if (virtualAccount) {
    return (
      <Simulatable onSimulate={handleSimulate}>
        <div className="p-6 flex flex-col space-y-3">
          <SimulateAlert>Simulate payment using {channelLabel}</SimulateAlert>
          <div>
            <h3 className="uppercase font-semibold text-sm text-stone-500 mb-1">
              Account Name
            </h3>
            <div className="text-xl">{virtualAccount.name}</div>
          </div>
          <div>
            <h3 className="uppercase font-semibold text-sm text-stone-500 mb-1">
              Account Number
            </h3>
            <div className="text-xl">{virtualAccount.account_number}</div>
          </div>
          <div>
            <h3 className="uppercase font-semibold text-sm text-stone-500 mb-1">
              Amount to Transfer
            </h3>
            <div className="text-xl">
              {Intl.NumberFormat("id", {
                style: "currency",
                currency: "IDR",
              }).format(virtualAccount.expected_amount)}
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
          onClick={handleCreateVirtualAccount}
          className="text-teal-500 dark:text-teal-400 hover:underline"
        >
          Try again
        </button>
      </p>
    </div>
  );
};
