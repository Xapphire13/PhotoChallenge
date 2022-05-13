import { css, cx } from "@linaria/core";
import React, { useEffect, useState } from "react";
import { ChevronDown } from "react-feather";
import theme from "../../../../theme";

const classNames = {
  container: css`
    position: relative;
  `,
  topChevron: css`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    top: -16px;
    bottom: 16px;
    transition: color 400ms ease-out;
  `,
  middleChevron: css`
    display: flex;
    flex-direction: column;
    transition: color 400ms ease-out;
  `,
  bottomChevron: css`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    top: 16px;
    bottom: -16px;
    transition: color 400ms ease-out;
  `,
  active: css`
    color: ${theme.palette.primary};
  `,
};

const NUM_FRAMES = 6;
const SPEED = 400;

export default function SwipeDown() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const handle = window.setInterval(
      () => setFrame((prev) => (prev + 1) % NUM_FRAMES),
      SPEED
    );

    return () => window.clearInterval(handle);
  }, []);

  return (
    <div className={cx(classNames.container)}>
      <div
        className={cx(classNames.topChevron, frame === 2 && classNames.active)}
      >
        <ChevronDown size={64} />
      </div>
      <div
        className={cx(
          classNames.middleChevron,
          frame === 1 && classNames.active
        )}
      >
        <ChevronDown size={64} />
      </div>
      <div
        className={cx(
          classNames.bottomChevron,
          frame === 0 && classNames.active
        )}
      >
        <ChevronDown size={64} />
      </div>
    </div>
  );
}
