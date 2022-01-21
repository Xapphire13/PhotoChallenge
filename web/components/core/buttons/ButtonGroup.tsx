import { css, cx } from "@linaria/core";
import React from "react";
import theme from "../../../theme";
import StylableProps from "../../../theme/StylableProps";

const classNames = {
  container: css`
    display: flex;
    gap: ${theme.spacing["8px"]};
  `,
};

export interface ButtonGroupProps extends StylableProps {
  children: React.ReactNode;
}

export default function ButtonGroup({ children, className }: ButtonGroupProps) {
  return <div className={cx(classNames.container, className)}>{children}</div>;
}
