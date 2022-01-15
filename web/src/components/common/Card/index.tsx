import { cx, css } from "@linaria/core";
import React from "react";
import theme from "../../../theme";

const classNames = {
  container: css`
    ${theme.cornerRadius.small}
    border: 1px solid ${theme.palette.lightGray};
  `,
};

export default function Card({ children }: React.PropsWithChildren<{}>) {
  return <div className={cx(classNames.container)}>{children}</div>;
}
