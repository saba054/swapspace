import React, { createContext, useContext } from "react";

const TabsContext = createContext();

export function Tabs({ value, onValueChange, defaultValue, children }) {
  const [internalValue, setInternalValue] = React.useState(defaultValue || "");
  const currentValue = value !== undefined ? value : internalValue;
  const setValue = onValueChange || setInternalValue;
  return (
    <TabsContext.Provider value={{ value: currentValue, setValue }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className = "", children }) {
  return <div className={className + " flex gap-2"}>{children}</div>;
}

export function TabsTrigger({ value, className = "", children }) {
  const { value: currentValue, setValue } = useContext(TabsContext);
  const active = currentValue === value;
  return (
    <button
      className={
        className +
        ` px-4 py-2 focus:outline-none transition border-b-2 ` +
        (active ? " border-teal-600 text-teal-600" : " border-transparent text-gray-600 hover:text-teal-600")
      }
      data-state={active ? "active" : undefined}
      onClick={() => setValue(value)}
      type="button"
    >
      {children}
    </button>
  );
} 