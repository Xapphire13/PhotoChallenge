import { css, cx } from "@linaria/core";
import React, { useEffect, useState } from "react";
import { ChevronDown } from "react-feather";

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
    opacity: 0.05;
    transition: opacity 1000ms ease-in;
  `,
  middleChevron: css`
    display: flex;
    flex-direction: column;
    opacity: 0.05;
    transition: opacity 1000ms ease-in;
  `,
  bottomChevron: css`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    top: 16px;
    bottom: -16px;
    opacity: 0.05;
    transition: opacity 1000ms ease-in;
  `,
  active: css`
    transition: none;
    opacity: 1;
  `,
};

const NUM_FRAMES = 18;
const SPEED = 100;

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
