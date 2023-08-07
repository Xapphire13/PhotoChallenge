import { css, cx } from "@linaria/core";
import React from "react";
import theme from "../../../theme";
import StylableProps from "../../../theme/StylableProps";

const classNames = {
  container: css`
    display: flex;
    gap: ${theme.spacing["8px"]};
    flex-direction: var(--baseButtonGroup_direction, row);
  `,
};

export interface BaseButtonGroupProps extends StylableProps {
  children: React.ReactNode;
}

export default function BaseButtonGroup({
  children,
  className,
}: BaseButtonGroupProps) {
  return <div className={cx(classNames.container, className)}>{children}</div>;
}
