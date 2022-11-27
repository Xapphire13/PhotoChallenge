import { css, cx } from "@linaria/core";
import React from "react";
import theme from "../../../theme";

const classNames = {
  container: css`
    margin-bottom: ${theme.spacing["16px"]};
    display: flex;
    align-items: center;
  `,
  title: css`
    ${theme.typography.title.small}
    flex-grow: 1;
    flex-basis: 0;
    text-align: center;
  `,
  before: css`
    flex-grow: 1;
    flex-basis: 0;
  `,
  after: css`
    flex-grow: 1;
    flex-basis: 0;
  `,
};

export interface SheetTitleProps {
  children: string;
  before?: React.ReactNode;
  after?: React.ReactNode;
}

export default function SheetTitle({
  children,
  before,
  after,
}: SheetTitleProps) {
  return (
    <div className={cx(classNames.container)}>
      <div className={cx(classNames.before)}>{before}</div>
      <h1 className={cx(classNames.title)}>{children}</h1>
      <div className={cx(classNames.after)}>{after}</div>
    </div>
  );
}
