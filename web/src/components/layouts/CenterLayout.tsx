import { css } from "@linaria/core";
import React from "react";

const classNames = {
  container: css`
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
  `,
};

export default function CenterLayout({
  children,
}: React.PropsWithChildren<unknown>) {
  return <div className={classNames.container}>{children}</div>;
}
