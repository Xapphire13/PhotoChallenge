import { css, cx } from "@linaria/core";
import React from "react";
import theme from "../../../theme";
import StylableProps from "../../../theme/StylableProps";

export const classNames = {
  container: css`
    ${theme.typography.base.medium}
    ${theme.cornerRadius.small}
    border: none;
    padding: ${theme.spacing["8px"]};
    cursor: pointer;
    color: ${theme.palette.white};

    :disabled {
      cursor: not-allowed;
      color: ${theme.palette.faint};
    }
  `,
  fullWidth: css`
    width: 100%;
  `,
};

export interface BaseButtonProps extends StylableProps {
  children: React.ReactNode;
  onClick?: () => void;
  fullWidth?: boolean;
  disabled?: boolean;
}

export default function BaseButton({
  children,
  onClick,
  className,
  fullWidth,
  disabled,
}: BaseButtonProps) {
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={cx(
        classNames.container,
        fullWidth && classNames.fullWidth,
        className
      )}
    >
      {children}
    </button>
  );
}
