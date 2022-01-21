import { css, cx } from "@linaria/core";
import React from "react";
import StylableProps from "../../theme/StylableProps";

const classNames = {
  container: css`
    display: flex;
    flex-direction: column;
    height: 100%;
  `,
};

export interface NavBarLayoutProps extends StylableProps {
  children: React.ReactNode;
}

export default function NavBarLayout({
  children,
  className,
}: NavBarLayoutProps) {
  return <div className={cx(classNames.container, className)}>{children}</div>;
}
