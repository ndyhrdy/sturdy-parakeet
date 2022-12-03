import axios from "axios";
import { isString, lowerCase } from "lodash";
import React, { FC, useCallback, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { api } from "../helpers/api";
import { usePaymentContext } from "./Payment";

export { VirtualAccountDetails };

type Props = {
  bankCode: string;
};

const VirtualAccountDetails: FC<Props> = ({ bankCode }) => {
  const { onLock, onUnlock } = usePaymentContext();
  const [instructions, setInstructions] = useState("");

  const [creatingVirtualAccount, setCreatingVirtualAccount] = useState(false);

  const { order } = usePaymentContext();
  const virtualAccount = order?.virtualAccounts?.[bankCode];

  const handleCreateVirtualAccount = useCallback(async () => {
    if (virtualAccount || creatingVirtualAccount) {
      return;
    }

    setCreatingVirtualAccount(true);
    await api.post(`/payment/va/${order?.id}`, { bankCode });
    setCreatingVirtualAccount(false);
  }, [bankCode, creatingVirtualAccount, virtualAccount]);

  useEffect(() => {
    handleCreateVirtualAccount();
  }, [handleCreateVirtualAccount]);

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
          `/instructions/${lowerCase(bankCode)}.md`
        );
        let instructions = data;
        Object.entries(virtualAccount).forEach(([key, value]) => {
          if (isString(value)) {
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
      <>
        <div className="p-6 flex flex-col space-y-3">
          <div>
            <h3 className="uppercase font-semibold text-sm dark:text-stone-500 mb-1">
              Virtual Account Name
            </h3>
            <div className="text-xl">{virtualAccount.name}</div>
          </div>
          <div>
            <h3 className="uppercase font-semibold text-sm dark:text-stone-500 mb-1">
              Virtual Account Number
            </h3>
            <div className="text-xl">{virtualAccount.account_number}</div>
          </div>
          <div>
            <h3 className="uppercase font-semibold text-sm dark:text-stone-500 mb-1">
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
        <h3 className="sticky top-0 px-6 py-2 uppercase font-semibold text-sm dark:bg-stone-800 dark:text-stone-200 mb-3">
          Instructions
        </h3>
        <ReactMarkdown className="px-6 pb-6 prose-sm prose-headings:font-semibold dark:prose-code:bg-teal-800 prose-code:rounded prose-code:px-1 prose-code:py-0.5 prose-ol:list-decimal">
          {instructions}
        </ReactMarkdown>
      </>
    );
  }

  return null;
};
