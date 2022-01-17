import { css, cx } from "@linaria/core";
import React from "react";
import theme from "../../theme";

const classNames = {
  container: css`
    margin-left: auto;
    margin-right: auto;
    padding: ${theme.spacing["16px"]} 0;
    max-width: 768px;
  `,
};

export interface ColumnLayoutProps {
  children: React.ReactNode;
}

export default function ColumnLayout({ children }: ColumnLayoutProps) {
  return <div className={cx(classNames.container)}>{children}</div>;
}
