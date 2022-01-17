import { css, cx } from "@linaria/core";
import React from "react";
import theme from "../../../theme";
import StylableProps from "../../../theme/StylableProps";
import TextLink from "../TextLink";

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
};

export interface BaseButtonProps extends StylableProps {
  children: React.ReactNode;
  onClick?: (ev: React.MouseEvent) => void;
  fullWidth?: boolean;
  disabled?: boolean;
  href?: string;
  newTab?: boolean;
}

export default function BaseButton({
  children,
  onClick,
  className,
  fullWidth,
  disabled,
  href,
  newTab,
}: BaseButtonProps) {
  if (href) {
    return (
      <TextLink
        className={cx(
          classNames.container,
          fullWidth && classNames.fullWidth,
          className
        )}
        onClick={disabled ? undefined : onClick}
        href={href}
        newTab={newTab}
      >
        {children}
      </TextLink>
    );
  }

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
