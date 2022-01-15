import { css, cx } from "@linaria/core";
import React from "react";
import theme from "../../../theme";
import StylableProps from "../../../theme/StylableProps";

export const classNames = {
  container: css`
    ${theme.cornerRadius.small}
    border: none;
    padding: ${theme.spacing["8px"]};
    cursor: pointer;
    color: ${theme.palette.white};
  `,
};

export interface BaseButtonProps extends StylableProps {
  onClick: () => void;
}

export default function BaseButton({
  children,
  onClick,
  className,
}: React.PropsWithChildren<BaseButtonProps>) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(classNames.container, className)}
    >
      {children}
    </button>
  );
}
