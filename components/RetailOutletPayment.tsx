import React, { FC } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemContent,
  AccordionItemHeader,
  useAccordionContext,
} from "./Accordion";
import { ChannelAlfamart } from "./icons/ChannelAlfamart";
import { usePaymentContext } from "./Payment";

export { RetailOutletPayment };

const CHANNELS = [
  { key: "ALFAMART", icon: ChannelAlfamart, label: "Alfamart" },
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
              className={`max-h-4 ${selected ? "text-teal-500" : ""}`}
            />
          </div>
          <span
            className={`font-semibold transition-all duration-300 ${
              selected ? "text-lg" : "text-stone-300"
            }`}
          >
            {channel.label}
          </span>
        </div>
      </AccordionItemHeader>
      <AccordionItemContent></AccordionItemContent>
    </AccordionItem>
  );
};
