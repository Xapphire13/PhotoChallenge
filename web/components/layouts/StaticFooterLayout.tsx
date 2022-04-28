import { css, cx } from "@linaria/core";
import React from "react";

const classNames = {
  container: css`
    display: grid;
    grid-template:
      1fr
      auto / 1fr;
    overflow: hidden;
  `,

  content: css`
    overflow-y: auto;
    display: grid;
    grid-template: 1fr / 1fr;
  `,
};

export interface StaticFooterLayoutProps {
  children: React.ReactNode;
}

export default function StaticFooterLayout({
  children,
}: StaticFooterLayoutProps) {
  const [content, footer] = React.Children.toArray(children);

  return (
    <div className={cx(classNames.container)}>
      <div className={cx(classNames.content)}>{content}</div>
      {footer}
    </div>
  );
}
