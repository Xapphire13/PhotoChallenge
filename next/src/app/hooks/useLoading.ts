import { useEffect, useState } from "react";

export default function useLoading(
  isLoading: boolean,
  options: {
    delay?: number;
  } = {}
) {
  const [showResult, setShowResult] = useState(!isLoading);

  useEffect(() => {
    if (!showResult) {
      const handle = window.setTimeout(() => {
        setShowResult(true);
      }, options.delay ?? 500);

      return () => {
        window.clearTimeout(handle);
      };
    }

    return () => undefined;
  }, [options.delay, showResult]);

  return showResult ? isLoading : true;
}
