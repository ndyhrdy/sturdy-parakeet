import React, { FC } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemContent,
  AccordionItemHeader,
  useAccordionContext,
} from "./Accordion";
import { ChannelOvo } from "./icons/ChannelOvo";
import { OvoPayment } from "./OvoPayment";
import { usePaymentContext } from "./Payment";

export { EwalletPayment };

const CHANNELS = [{ key: "OVO", label: "OVO", icon: ChannelOvo }];

const EwalletPayment: FC = () => {
  const { locked } = usePaymentContext();

  return (
    <div className="px-6">
      <Accordion disabled={locked}>
        {CHANNELS.map((channel) => {
          return <Ewallet key={channel.key} channel={channel} />;
        })}
      </Accordion>
    </div>
  );
};

type EwalletProps = {
  channel: typeof CHANNELS[number];
};

const Ewallet: FC<EwalletProps> = ({ channel }) => {
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
      <AccordionItemContent>
        {(() => {
          switch (channel.key) {
            case "OVO":
              return <OvoPayment />;
            default:
              return null;
          }
        })()}
      </AccordionItemContent>
    </AccordionItem>
  );
};