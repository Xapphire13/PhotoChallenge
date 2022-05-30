import { useMemo } from "react";
import { gql, useQuery } from "urql";
import useUserContext from "../../../../hooks/useUserContext";

const CURRENT_USERS_GROUPS_QUERY = gql`
  query CurrentUsersGroups {
    me {
      id
      groups {
        id
      }
    }
  }
`;

interface CurrentUsersGroupsQuery {
  me: {
    id: string;
    groups: { id: string }[];
  };
}

export default function useCurrentUsersGroups() {
  const { loggedIn } = useUserContext();
  const [{ data, fetching }] = useQuery<CurrentUsersGroupsQuery>({
    query: CURRENT_USERS_GROUPS_QUERY,
    pause: !loggedIn,
  });

  const groups = useMemo(
    () => data?.me.groups.map((it) => it.id) ?? [],
    [data?.me.groups]
  );

  return { groups, fetching };
}
