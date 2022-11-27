import React, { useMemo, useState } from "react";

export const MainMenuContext = React.createContext({
  isOpen: false,
  toggle: (() => undefined) as () => void,
});

type MainMenuContextType = React.ContextType<typeof MainMenuContext>;

export interface MainMenuContextProviderProps {
  children: React.ReactNode;
}

export default function MainMenuContextProvider({
  children,
}: MainMenuContextProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleMenu = () => setIsOpen((prev) => !prev);

  const value = useMemo<MainMenuContextType>(
    () => ({
      isOpen,
      toggle: handleToggleMenu,
    }),
    [isOpen]
  );

  return (
    <MainMenuContext.Provider value={value}>
      {children}
    </MainMenuContext.Provider>
  );
}
