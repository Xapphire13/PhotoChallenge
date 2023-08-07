import React from "react";
import TextLink from "../TextLink";
import styles from "./BaseButton.module.css";
import cx from "@/app/utils/cx";

export interface BaseButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
  onClick?: (ev: React.MouseEvent) => void;
  disabled?: boolean;
  href?: string;
  newTab?: boolean;
  submit?: boolean;
  accessibilityLabel?: string;
  className?: string;
}

export default function BaseButton({
  children,
  onClick,
  className,
  disabled,
  href,
  newTab,
  submit,
  accessibilityLabel,
}: BaseButtonProps) {
  if (href) {
    return (
      <TextLink
        className={cx(styles.container, className)}
        onClick={disabled ? undefined : onClick}
        href={href}
        newTab={newTab}
        aria-label={accessibilityLabel}
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
      className={cx(styles.container, className)}
      aria-label={accessibilityLabel}
    >
      {children}
    </button>
  );
}
