import { css, cx } from "@linaria/core";
import React from "react";
import theme from "../../../theme";

const classNames = {
  container: css`
    padding: ${theme.spacing["16px"]};
  `,
};

export interface CardContentProps {
  className?: string;
}

export default function CardContent({
  children,
  className,
}: React.PropsWithChildren<CardContentProps>) {
  return <div className={cx(classNames.container, className)}>{children}</div>;
}
