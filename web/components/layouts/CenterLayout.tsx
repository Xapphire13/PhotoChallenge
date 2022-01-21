import { css, cx } from "@linaria/core";
import React from "react";
import StylableProps from "../../theme/StylableProps";

const classNames = {
  container: css`
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
  `,
};

export default function CenterLayout({
  children,
  className,
}: React.PropsWithChildren<unknown> & StylableProps) {
  return <div className={cx(classNames.container, className)}>{children}</div>;
}
