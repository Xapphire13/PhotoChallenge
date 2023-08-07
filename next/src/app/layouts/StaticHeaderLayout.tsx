import { css, cx } from "@linaria/core";
import React from "react";

const classNames = {
  container: css`
    display: grid;
    grid-template:
      auto
      1fr / 1fr;
    overflow: hidden;
  `,

  content: css`
    overflow-y: auto;
    display: grid;
    grid-template: 1fr / 1fr;
  `,
};

export interface StaticHeaderLayoutProps {
  children: React.ReactNode;
}

export default function StaticHeaderLayout({
  children,
}: StaticHeaderLayoutProps) {
  const [header, content] = React.Children.toArray(children);

  return (
    <div className={cx(classNames.container)}>
      {header}
      <div className={cx(classNames.content)}>{content}</div>
    </div>
  );
}
