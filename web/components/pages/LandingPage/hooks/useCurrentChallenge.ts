import { useMemo } from "react";
import useRootQuery from "../../../../hooks/useRootQuery";

export default function useCurrentChallenge() {
  const { data, error, fetching } = useRootQuery();

  const currentChallenge = useMemo(() => {
    if (data?.group?.currentChallenge) {
      const endsAt = new Date(data.group.currentChallenge.endsAt);

      return {
        ...data.group.currentChallenge,
        endsAt,
      };
    }

    return null;
  }, [data?.group?.currentChallenge]);

  return {
    currentChallenge,
    error,
    fetching,
  };
}
