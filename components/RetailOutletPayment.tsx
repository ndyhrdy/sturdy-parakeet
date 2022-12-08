import React, { FC } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemContent,
  AccordionItemHeader,
  useAccordionContext,
} from "./Accordion";
import { ChannelAlfamart } from "./icons/ChannelAlfamart";
import { ChannelIndomaret } from "./icons/ChannelIndomaret";
import { usePaymentContext } from "./Payment";
import { RetailOutletDetails } from "./RetailOutletDetails";

export { RetailOutletPayment };

const CHANNELS = [
  { key: "ALFAMART", icon: ChannelAlfamart, label: "Alfamart" },
  { key: "INDOMARET", icon: ChannelIndomaret, label: "Indomaret" },
];

const RetailOutletPayment: FC = () => {
  const { locked } = usePaymentContext();
  return (
    <div className="px-6">
      <Accordion disabled={locked}>
        {CHANNELS.map((channel) => {
          return <RetailOutlet key={channel.key} channel={channel} />;
        })}
      </Accordion>
    </div>
  );
};

type RetailOutletProps = {
  channel: typeof CHANNELS[number];
};

const RetailOutlet: FC<RetailOutletProps> = ({ channel }) => {
  const { selection } = useAccordionContext();

  const selected = selection === channel.key;

  return (
    <AccordionItem id={channel.key}>
      <AccordionItemHeader>
        <div className="flex-1 flex items-center space-x-3">
          <div className="w-16 p-1 flex">
            <channel.icon
              className={`max-h-6 w-16 ${
                selected
                  ? "text-teal-500"
                  : "text-stone-600 dark:text-stone-400"
              }`}
            />
          </div>
          <span
            className={`text-stone-600 font-semibold transition-all duration-300 line-clamp-1 ${
              selected ? "dark:text-stone-100 text-lg" : "dark:text-stone-300"
            }`}
          >
            {channel.label}
          </span>
        </div>
      </AccordionItemHeader>
      <AccordionItemContent>
        <RetailOutletDetails roName={channel.key} />
      </AccordionItemContent>
    </AccordionItem>
  );
};
