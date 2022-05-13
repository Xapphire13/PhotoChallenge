import { css, cx } from "@linaria/core";
import React from "react";
import theme from "../../theme";
import StylableProps from "../../theme/StylableProps";

const classNames = {
  container: css`
    display: flex;
    flex-direction: column;
    padding: ${theme.spacing["16px"]};
    max-width: 768px;
  `,
};

export interface ColumnLayoutProps extends StylableProps {
  children: React.ReactNode;
}

const ColumnLayout = React.forwardRef<HTMLDivElement, ColumnLayoutProps>(
  ({ children, className }, ref) => (
    <div ref={ref} className={cx(classNames.container, className)}>
      {children}
    </div>
  )
);

export default ColumnLayout;
