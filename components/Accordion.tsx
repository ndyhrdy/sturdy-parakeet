import React, {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export {
  Accordion,
  AccordionItem,
  AccordionItemHeader,
  AccordionItemContent,
  useAccordionContext,
};

type AccordionContextValues = {
  disabled?: boolean;
  isInitial: boolean;
  onToggle: (id: any) => any;
  selection: any;
};

const AccordionContext = createContext<AccordionContextValues>({
  disabled: false,
  isInitial: true,
  onToggle: () => {},
  selection: null,
});

const useAccordionContext = () => useContext(AccordionContext);

type AccordionProps = {
  children?: ReactNode;
  disabled?: boolean;
};

const Accordion: FC<AccordionProps> = ({ children, disabled }) => {
  const [selection, setSelection] = useState<any>(null);
  const isInitial = selection === null;

  const handleToggle = useCallback(
    (id: any) => {
      if (selection === id) {
        setSelection(null);
      } else {
        setSelection(id);
      }
    },
    [selection]
  );

  return (
    <AccordionContext.Provider
      value={{
        disabled,
        isInitial,
        onToggle: handleToggle,
        selection,
      }}
    >
      <ul className="flex flex-col items-stretch space-y-2">{children}</ul>
    </AccordionContext.Provider>
  );
};

type AccordionItemContextValues = {
  id: any;
};

const AccordionItemContext = createContext<AccordionItemContextValues>({
  id: null,
});

const useAccordionItemContext = () => useContext(AccordionItemContext);

type AccordionItemProps = {
  children?: ReactNode;
  id: any;
};

const AccordionItem: FC<AccordionItemProps> = ({ children, id }) => {
  const { isInitial, selection } = useAccordionContext();

  const selected = selection === id;

  return (
    <AccordionItemContext.Provider value={{ id }}>
      <li
        className={`overflow-hidden border-2 border-stone-200 dark:border-stone-800 ${
          selected || isInitial ? "rounded-xl" : "rounded-lg"
        }`}
      >
        {children}
      </li>
    </AccordionItemContext.Provider>
  );
};

type AccordionItemHeaderProps = {
  children?: ReactNode;
};

const AccordionItemHeader: FC<AccordionItemHeaderProps> = ({ children }) => {
  const { disabled, isInitial, onToggle, selection } = useAccordionContext();
  const { id } = useAccordionItemContext();

  const selected = selection === id;

  return (
    <button
      type="button"
      onClick={() => {
        onToggle(id);
      }}
      disabled={disabled}
      className={`w-full text-left flex items-center justify-between px-6 transition-all duration-300 dark:bg-stone-800 ${
        selected || isInitial ? "h-16" : "h-10"
      } ${
        !selected && !disabled
          ? "hover:bg-stone-200 dark:hover:bg-stone-700"
          : ""
      }
      ${selected ? "bg-stone-200" : "bg-stone-50"}
      ${disabled ? "cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );
};

type AccordionItemContentProps = {
  children?: ReactNode;
};

const AccordionItemContent: FC<AccordionItemContentProps> = ({ children }) => {
  const { selection } = useAccordionContext();
  const { id } = useAccordionItemContext();
  const [show, setShow] = useState(false);

  const open = selection === id;

  useEffect(() => {
    if (open) {
      setShow(true);
    } else {
      setTimeout(() => {
        setShow(false);
      }, 300);
    }
  }, [open]);

  return (
    <div
      className={`${
        open ? "max-h-96" : "max-h-0"
      } transition-all duration-300 overflow-y-auto`}
    >
      {show && children}
    </div>
  );
};
