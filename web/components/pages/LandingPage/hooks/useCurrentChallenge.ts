import { useMemo } from "react";
import useRootQuery from "../../../../hooks/useRootQuery";

interface GetCurrentChallengeQuery {
  currentChallenge: {
    id: string;
    name: string;
    endsAt: string;

    uploads: {
      id: string;
      url: string;
      caption?: string;
      uploadedBy: {
        id: string;
        username: string;
      };
    }[];
  };
}

export default function useCurrentChallenge() {
  const { data, error, fetching } = useRootQuery<GetCurrentChallengeQuery>();

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
