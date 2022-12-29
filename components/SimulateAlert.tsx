import React, { FC, ReactNode } from "react";
import { useSimulation } from "./Simulatable";

export { SimulateAlert };

type Props = {
  children?: ReactNode;
};

const SimulateAlert: FC<Props> = ({ children }) => {
  const { onSimulate, simulating } = useSimulation();

  return (
    <div className="border-2 border-yellow-500 dark:border-yellow-700 bg-yellow-50 dark:bg-transparent rounded-xl p-3 pl-4 mb-6 text-yellow-600 dark:text-yellow-100 flex items-center justify-between space-x-3">
      <div>{children}</div>
      <div className="flex-shrink-0">
        <button
          type="button"
          onClick={onSimulate}
          disabled={simulating}
          className={`rounded-lg h-10 px-4 text-lg ${
            simulating
              ? "bg-stone-500 cursor-not-allowed text-white"
              : "transition-colors text-yellow-900 bg-yellow-400 hover:bg-yellow-500"
          }`}
        >
          {simulating ? "Please wait..." : <>Simulate &rarr;</>}
        </button>
      </div>
    </div>
  );
};
