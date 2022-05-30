import React, { useMemo } from "react";
import { useMatch, useParams } from "react-router";
import { CombinedError, gql, useQuery } from "urql";
import Loader from "../components/core/Loader";
import CenterLayout from "../components/layouts/CenterLayout";
import useLoading from "../hooks/useLoading";
import useUserContext from "../hooks/useUserContext";
import { GROUP_LANDING_PAGE } from "../utils/paths";

interface RootQuery {
  group:
    | {
        id: string;
        name: string;

        currentChallenge: {
          id: string;
          name: string;
          endsAt: string;

          uploads: {
            id: string;
            url: string;
            caption: string;
            uploadedBy: {
              id: string;
              username: string;
            };
          }[];
        };

        futureChallengeCount: number;
      }
    | undefined;
}

export const RootQueryContext = React.createContext({
  data: undefined as RootQuery | undefined,
  fetching: false,
  error: undefined as CombinedError | undefined,
});

export type RootQueryContextType = React.ContextType<typeof RootQueryContext>;

export interface RootQueryProviderProps {
  children: React.ReactNode;
}

export const ROOT_QUERY = gql`
  query RootQuery($groupId: String!) {
    group(id: $groupId) {
      id
      name

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

      futureChallengeCount
    }
  }
`;

export default function RootQueryProvider({
  children,
}: RootQueryProviderProps) {
  const { loggedIn, user } = useUserContext();
  const match = useMatch(GROUP_LANDING_PAGE);
  const groupId = match?.params.groupId;
  const [{ data, fetching, error }] = useQuery<RootQuery>({
    query: ROOT_QUERY,
    variables: {
      groupId,
    },
    pause: !loggedIn || !user || !groupId,
  });
  const showLoading = useLoading((loggedIn && !user) || fetching);

  const value = useMemo<RootQueryContextType>(
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
