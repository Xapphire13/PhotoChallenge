import { cx, css } from "@linaria/core";
import React from "react";
import theme from "../../../theme";
import StylableProps from "../../../theme/StylableProps";

const classNames = {
  container: css`
    position: relative;
    ${theme.cornerRadius.medium}
    border: 1px solid ${theme.palette.background1};
    background: ${theme.palette.background0};
    overflow: hidden;
  `,
};

export interface CardProps extends StylableProps {
  children: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className }, ref) => (
    <div ref={ref} className={cx(classNames.container, className)}>
      {children}
    </div>
  )
);

export default Card;
