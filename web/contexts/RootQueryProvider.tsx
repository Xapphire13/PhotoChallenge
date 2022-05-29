import React, { useContext, useMemo } from "react";
import { CombinedError, gql, useQuery } from "urql";
import Loader from "../components/core/Loader";
import CenterLayout from "../components/layouts/CenterLayout";
import useLoading from "../hooks/useLoading";
import { UserContext } from "./UserContextProvider";

export const RootQueryContext = React.createContext({
  data: null as any,
  fetching: false,
  error: undefined as CombinedError | undefined,
});

type ContextType = React.ContextType<typeof RootQueryContext>;

export interface RootQueryProviderProps {
  children: React.ReactNode;
}

export const ROOT_QUERY = gql`
  query RootQuery {
    currentChallenge {
      id
      name
      endsAt

      uploads {
        id
        url
        caption
        uploadedBy {
          id
          username
        }
      }
    }

    futureChallengeCount {
      count
    }
  }
`;

export default function RootQueryProvider({
  children,
}: RootQueryProviderProps) {
  const { loggedIn, user } = useContext(UserContext);
  const [{ data, fetching, error }] = useQuery({
    query: ROOT_QUERY,
    pause: !loggedIn || !user,
  });
  const showLoading = useLoading((loggedIn && !user) || fetching);

  const value = useMemo<ContextType>(
    () => ({
      data,
      fetching,
      error,
    }),
    [data, error, fetching]
  );

  return (
    <RootQueryContext.Provider value={value}>
      {showLoading ? (
        <CenterLayout>
          <Loader />
        </CenterLayout>
      ) : (
        children
      )}
    </RootQueryContext.Provider>
  );
}
