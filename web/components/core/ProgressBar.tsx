import { css, cx } from "@linaria/core";
import React from "react";
import theme from "../../theme";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CSSVar = any;

const classNames = {
  container: css`
    height: ${theme.spacing["4px"]};
    background-color: rgba(0, 0, 0, 0.7);

    ::before {
      display: block;
      width: var(--progress-bar__percentage);
      background-color: ${theme.palette.primary};
      content: "";
      height: 100%;
      transition: width 100ms;
    }
  `,
};

export interface ProgressBarProps {
  value: number;
}

export default function ProgressBar({ value }: ProgressBarProps) {
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      className={cx(classNames.container)}
      style={{ ["--progress-bar__percentage" as CSSVar]: `${value}%` }}
    />
  );
}
