import { gql, useQuery } from "@apollo/client";
import { useMemo } from "react";

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
  const { data, error, loading } = useQuery<GetCurrentChallengeQuery>(
    GET_CURRENT_CHALLENGE_QUERY
  );

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
    loading,
  };
}
