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
  disabled?: boolean;
  href?: string;
  newTab?: boolean;
  submit?: boolean;
}

export default function BaseButton({
  children,
  onClick,
  className,
  disabled,
  href,
  newTab,
  submit,
}: BaseButtonProps) {
  if (href) {
    return (
      <TextLink
        className={cx(classNames.container, className)}
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
      type={submit ? "submit" : "button"}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={cx(classNames.container, className)}
    >
      {children}
    </button>
  );
}
