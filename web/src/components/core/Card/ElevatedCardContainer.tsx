import { css, cx } from "@linaria/core";
import React from "react";
import theme from "../../../theme";

const classNames = {
  container: css`
    ${theme.cornerRadius.small}
    ${theme.elevation.primary}
  `,
};

export interface ElevatedCardContainerProps {
  children: React.ReactNode;
}

export default function ElevatedCardContainer({
  children,
}: ElevatedCardContainerProps) {
  return <div className={cx(classNames.container)}>{children}</div>;
}
