import { css, cx } from "@linaria/core";
import React from "react";

const classNames = {
  container: css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
  `,
};

export interface FooterLayoutProps {
  children: React.ReactNode;
}

export default function FooterLayout({ children }: FooterLayoutProps) {
  return <div className={cx(classNames.container)}>{children}</div>;
}
