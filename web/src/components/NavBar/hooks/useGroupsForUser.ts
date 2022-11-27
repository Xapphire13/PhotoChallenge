import { useMemo } from "react";
import { gql, useQuery } from "urql";

const GROUPS_FOR_USER_QUERY = gql`
  query GroupsForUser {
    me {
      groups {
        id
        name
      }
    }
  }
`;

interface GroupsForUserQuery {
  me: {
    groups: {
      id: string;
      name: string;
    }[];
  };
}

// TODO, consolidate with other group hook
export default function useGroupsForUser() {
  const [{ data, fetching }] = useQuery<GroupsForUserQuery>({
    query: GROUPS_FOR_USER_QUERY,
  });

  const groups = useMemo(() => data?.me.groups ?? [], [data?.me.groups]);

  return {
    groups,
    fetching,
  };
}
