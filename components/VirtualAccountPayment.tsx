import React, { FC, useEffect, useState } from "react";
import { ChannelBca } from "./icons/ChannelBca";
import { ChannelBni } from "./icons/ChannelBni";
import { ChannelMandiri } from "./icons/ChannelMandiri";
import { VirtualAccountDetails } from "./VirtualAccountDetails";

export { VirtualAccountPayment };

const CHANNELS = [
  { key: "BCA", icon: ChannelBca, label: "Bank Central Asia (BCA)" },
  { key: "BNI", icon: ChannelBni, label: "Bank Negara Indonesia (BNI46)" },
  { key: "MANDIRI", icon: ChannelMandiri, label: "Bank Mandiri" },
];

const VirtualAccountPayment = () => {
  const [selection, setSelection] = useState<string | null>(null);
  const isInitial = selection === null;

  return (
    <div className="px-6">
      <ul className="flex flex-col items-stretch space-y-2">
        {CHANNELS.map((channel) => {
          const isSelected = selection === channel.key;
          return (
            <VirtualAccount
              key={channel.key}
              selected={isSelected}
              initial={isInitial}
              channel={channel}
              onToggle={() => {
                setSelection(isSelected ? null : channel.key);
              }}
            />
          );
        })}
      </ul>
    </div>
  );
};

type VirtualAccountProps = {
  initial: boolean;
  selected: boolean;
  channel: typeof CHANNELS[number];
  onToggle: () => any;
};

const VirtualAccount: FC<VirtualAccountProps> = ({
  initial,
  selected,
  channel,
  onToggle,
}) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (selected) {
      setShowContent(true);
    } else {
      setTimeout(() => {
        setShowContent(false);
      }, 300);
    }
  }, [selected]);

  return (
    <li
      className={`overflow-hidden border-2 dark:border-stone-800 ${
        selected || initial ? "rounded-xl" : "rounded-lg"
      }`}
    >
      <button
        type="button"
        onClick={() => {
          onToggle();
        }}
        className={`w-full text-left flex items-center justify-between px-6 transition-all duration-300 dark:bg-stone-800 ${
          selected || initial ? "h-16" : "h-10"
        } ${!selected ? "dark:hover:bg-stone-700" : ""}`}
      >
        <div className="flex-1 flex items-center space-x-3">
          <div className="w-16 flex">
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
      </button>
      <div
        className={`${
          selected ? "max-h-96" : "max-h-0"
        } transition-all duration-300`}
      >
        {showContent && <VirtualAccountDetails />}
      </div>
    </li>
  );
};
