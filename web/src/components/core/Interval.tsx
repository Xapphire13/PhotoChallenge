import React, { useEffect, useState } from "react";

export interface IntervalProps {
  interval: number;
  children: () => React.ReactNode;
}

export default function Interval({ interval, children }: IntervalProps) {
  const [, setRenderToken] = useState(0);

  useEffect(() => {
    let handle = 0;

    if (interval) {
      handle = window.setInterval(
        () => setRenderToken((prev) => prev + 1),
        interval
      );
    }

    return () => window.clearInterval(handle);
  }, [interval]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children()}</>;
}
