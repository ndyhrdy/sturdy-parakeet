import React, {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

export { Simulatable, useSimulation };

type SimulationContextValues = {
  onCancel: () => any;
  onSimulate: () => any;
  simulating: boolean;
};

const SimulationContext = createContext<SimulationContextValues>({
  onCancel: async () => {},
  onSimulate: async () => {},
  simulating: false,
});

type Props = {
  children?: ReactNode;
  onSimulate: () => any;
};

const Simulatable: FC<Props> = ({ children, onSimulate }) => {
  const [simulating, setSimulating] = useState(false);

  const handleCancel = useCallback(() => {
    setSimulating(false);
  }, []);

  const handleSimulate = useCallback(async () => {
    setSimulating(true);
    try {
      await onSimulate();
    } catch (error) {
      window.alert(`Failed to simulate: ${error}`);
      setSimulating(false);
    }
  }, [onSimulate]);

  return (
    <SimulationContext.Provider
      value={{
        onCancel: handleCancel,
        onSimulate: handleSimulate,
        simulating,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

const useSimulation = () => useContext(SimulationContext);
