import { css, cx } from "@linaria/core";
import React from "react";
import StylableProps from "../../theme/StylableProps";

const classNames = {
  container: css`
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
  `,
};

export type CenterLayoutProps = {
  children: React.ReactNode;
} & StylableProps;

const CenterLayout = React.forwardRef<HTMLDivElement, CenterLayoutProps>(
  ({ children, className }, ref) => (
    <div ref={ref} className={cx(classNames.container, className)}>
      {children}
    </div>
  )
);

export default CenterLayout;
