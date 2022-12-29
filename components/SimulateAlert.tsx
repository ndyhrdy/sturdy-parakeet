import React, { FC, ReactNode } from "react";
export { SimulateAlert };

type Props = {
  children?: ReactNode;
  disabled?: boolean;
  onSimulate: () => any;
};

const SimulateAlert: FC<Props> = ({ children, disabled, onSimulate }) => {
  return (
    <div className="border-2 border-yellow-500 dark:border-yellow-700 bg-yellow-50 dark:bg-transparent rounded-xl p-3 pl-6 mb-6 text-yellow-600 dark:text-yellow-100 flex items-start justify-between space-x-3">
      <div>{children}</div>
      <div className="flex-shrink-0">
        <button
          type="button"
          onClick={onSimulate}
          disabled={disabled}
          className={`rounded-lg h-10 px-4 text-lg ${
            disabled
              ? "bg-stone-500 cursor-not-allowed text-white"
              : "transition-colors text-yellow-900 bg-yellow-400 hover:bg-yellow-500"
          }`}
        >
          Simulate &rarr;
        </button>
      </div>
    </div>
  );
};
