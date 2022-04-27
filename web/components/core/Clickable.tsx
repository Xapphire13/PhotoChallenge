import { css, cx } from "@linaria/core";
import React from "react";

const classNames = {
  container: css`
    cursor: pointer;
  `,
  link: css`
    text-decoration: none;
    color: inherit;
  `,
};

export interface ClickableProps {
  onClick?: () => void;
  href?: string;
  newTab?: boolean;
  children: React.ReactNode;
}

export default function Clickable({
  children,
  onClick,
  href,
  newTab,
}: ClickableProps) {
  const handleKeyDown = (ev: React.KeyboardEvent) => {
    if (ev.key === " " || ev.key === "Enter") {
      onClick?.();

      ev.preventDefault();
    }
  };

  if (href) {
    return (
      <a
        className={cx(classNames.container, classNames.link)}
        onClick={onClick}
        href={href}
        target={newTab ? "_blank" : undefined}
        rel="noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <div
      className={cx(classNames.container)}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
}
