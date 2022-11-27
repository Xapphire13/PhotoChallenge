import React, { useMemo } from "react";
import {
  FeatureProviderContext,
  FeatureProviderContextType,
} from "../contexts/FeatureProvider";
import { Feature } from "../hooks/useFeature";

export interface MockFeatureProviderProps {
  features: Feature[];
  children: React.ReactNode;
}

export default function MockFeatureProvider({
  children,
  features,
}: MockFeatureProviderProps) {
  const value = useMemo<FeatureProviderContextType>(
    () => ({ loading: false, features }),
    [features]
  );

  return (
    <FeatureProviderContext.Provider value={value}>
      {children}
    </FeatureProviderContext.Provider>
  );
}
