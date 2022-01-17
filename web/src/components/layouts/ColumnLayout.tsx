import { css, cx } from "@linaria/core";
import React from "react";
import theme from "../../theme";
import StylableProps from "../../theme/StylableProps";

const classNames = {
  container: css`
    margin-left: auto;
    margin-right: auto;
    padding: ${theme.spacing["16px"]};
    max-width: 768px;
  `,
};

export interface ColumnLayoutProps extends StylableProps {
  children: React.ReactNode;
}

export default function ColumnLayout({
  children,
  className,
}: ColumnLayoutProps) {
  return <div className={cx(classNames.container, className)}>{children}</div>;
}
