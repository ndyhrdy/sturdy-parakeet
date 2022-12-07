import React, { FC } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemContent,
  AccordionItemHeader,
  useAccordionContext,
} from "./Accordion";
import { ChannelBri } from "./icons/ChannelBri";
import { ChannelBca } from "./icons/ChannelBca";
import { ChannelBni } from "./icons/ChannelBni";
import { ChannelMandiri } from "./icons/ChannelMandiri";
import { ChannelPermata } from "./icons/ChannelPermata";
import { usePaymentContext } from "./Payment";
import { VirtualAccountDetails } from "./VirtualAccountDetails";

export { VirtualAccountPayment };

const CHANNELS = [
  { key: "BRI", icon: ChannelBri, label: "Bank Rakyat Indonesia (BRI)" },
  { key: "BCA", icon: ChannelBca, label: "Bank Central Asia (BCA)" },
  { key: "BNI", icon: ChannelBni, label: "Bank Negara Indonesia (BNI46)" },
  { key: "MANDIRI", icon: ChannelMandiri, label: "Bank Mandiri" },
  { key: "PERMATA", icon: ChannelPermata, label: "Bank Permata" },
];

const VirtualAccountPayment = () => {
  const { locked } = usePaymentContext();
  return (
    <div className="px-6">
      <Accordion disabled={locked}>
        {CHANNELS.map((channel) => {
          return <VirtualAccount key={channel.key} channel={channel} />;
        })}
      </Accordion>
    </div>
  );
};

type VirtualAccountProps = {
  channel: typeof CHANNELS[number];
};

const VirtualAccount: FC<VirtualAccountProps> = ({ channel }) => {
  const { selection } = useAccordionContext();

  const selected = selection === channel.key;

  return (
    <AccordionItem id={channel.key}>
      <AccordionItemHeader>
        <div className="flex-1 flex items-center space-x-3">
          <div className="w-16 p-1 flex">
            <channel.icon
              className={`max-h-6 ${
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
        <VirtualAccountDetails bankCode={channel.key} />
      </AccordionItemContent>
    </AccordionItem>
  );
};
