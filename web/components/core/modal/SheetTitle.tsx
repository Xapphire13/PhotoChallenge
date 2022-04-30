import { css, cx } from "@linaria/core";
import React from "react";
import theme from "../../../theme";

const classNames = {
  title: css`
    ${theme.typography.title.small}
    text-align: center;
    margin-bottom: ${theme.spacing["16px"]};
  `,
};

export interface SheetTitleProps {
  children: string;
}

export default function SheetTitle({ children }: SheetTitleProps) {
  return <h1 className={cx(classNames.title)}>{children}</h1>;
}
