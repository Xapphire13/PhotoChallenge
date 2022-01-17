import { cx, css } from "@linaria/core";
import React from "react";
import theme from "../../../theme";
import StylableProps from "../../../theme/StylableProps";

const classNames = {
  container: css`
    ${theme.cornerRadius.medium}
    border: 1px solid ${theme.palette.background1};
  `,
};

export interface CardProps extends StylableProps {
  children: React.ReactNode;
}

export default function Card({ children, className }: CardProps) {
  return <div className={cx(classNames.container, className)}>{children}</div>;
}
