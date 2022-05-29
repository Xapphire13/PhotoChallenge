import React, { useMemo } from "react";
import {
  RootQueryContext,
  RootQueryContextType,
} from "../contexts/RootQueryProvider";

export interface MockRootQueryProps {
  children: React.ReactNode;
}

export default function MockRootQuery({ children }: MockRootQueryProps) {
  const value = useMemo<RootQueryContextType>(
    () => ({ data: undefined, error: undefined, fetching: false }),
    []
  );

  return (
    <RootQueryContext.Provider value={value}>
      {children}
    </RootQueryContext.Provider>
  );
}
