import React, { useMemo } from "react";
import { gql, useQuery } from "urql";

export const FeatureProviderContext = React.createContext({
  features: [] as string[],
  loading: false,
});

export type FeatureProviderContextType = React.ContextType<
  typeof FeatureProviderContext
>;

export interface FeatureProviderProps {
  children: React.ReactNode;
}

const GET_MY_FEATURES_QUERY = gql`
  query GetMyFeatures {
    me {
      id
      features
    }
  }
`;

interface GetMyFeaturesQuery {
  me: {
    id: string;
    features: string[];
  };
}

export default function FeatureProvider({ children }: FeatureProviderProps) {
  const [{ data, fetching }] = useQuery<GetMyFeaturesQuery>({
    query: GET_MY_FEATURES_QUERY,
  });
  const value = useMemo<FeatureProviderContextType>(
    () => ({
      features: data?.me.features ?? [],
      loading: fetching,
    }),
    [data?.me.features, fetching]
  );

  return (
    <FeatureProviderContext.Provider value={value}>
      {children}
    </FeatureProviderContext.Provider>
  );
}
