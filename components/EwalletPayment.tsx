import React, { FC } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemContent,
  AccordionItemHeader,
  useAccordionContext,
} from "./Accordion";
import { EwalletQrCode } from "./EwalletQrCode";
import { EwalletRedirection } from "./EwalletRedirection";
import { ChannelDana } from "./icons/ChannelDana";
import { ChannelLinkaja } from "./icons/ChannelLinkaja";
import { ChannelOvo } from "./icons/ChannelOvo";
import { ChannelShopeepay } from "./icons/ChannelShopeepay";
import { OvoPayment } from "./OvoPayment";
import { usePaymentContext } from "./Payment";

export { EwalletPayment };

const CHANNELS = [
  { key: "OVO", label: "OVO", icon: ChannelOvo },
  { key: "DANA", label: "Dana", icon: ChannelDana },
  { key: "SHOPEEPAY", label: "ShopeePay", icon: ChannelShopeepay },
  { key: "LINKAJA", label: "LinkAja!", icon: ChannelLinkaja },
];

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
              className={`max-h-6 w-16 ${
                selected
                  ? "text-teal-500"
                  : "text-stone-600 dark:text-stone-400"
              }`}
            />
          </div>
          <span
            className={`text-stone-600 font-semibold transition-all duration-300 ${
              selected ? "dark:text-stone-100 text-lg" : "dark:text-stone-300"
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
            case "LINKAJA":
            case "DANA":
              return (
                <EwalletRedirection
                  channelKey={channel.key}
                  channelLabel={channel.label}
                />
              );
            case "SHOPEEPAY":
              return <EwalletQrCode />;
            default:
              return null;
          }
        })()}
      </AccordionItemContent>
    </AccordionItem>
  );
};
