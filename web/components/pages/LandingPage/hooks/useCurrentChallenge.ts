import { useMemo } from "react";
import { gql, useQuery } from "urql";

const GET_CURRENT_CHALLENGE_QUERY = gql`
  query GetCurrentChallenge {
    currentChallenge {
      id
      name
      endsAt
    }
  }
`;

interface GetCurrentChallengeQuery {
  currentChallenge: {
    id: string;
    name: string;
    endsAt: string;
  };
}

export default function useCurrentChallenge() {
  const [{ data, error, fetching }] = useQuery<GetCurrentChallengeQuery>({
    query: GET_CURRENT_CHALLENGE_QUERY,
  });

  const currentChallenge = useMemo(() => {
    if (data?.currentChallenge) {
      const endsAt = new Date(data.currentChallenge.endsAt);

      return {
        ...data.currentChallenge,
        endsAt,
      };
    }

    return null;
  }, [data?.currentChallenge]);

  return {
    currentChallenge,
    error,
    fetching,
  };
}
