import { css } from "@linaria/core";
import React from "react";

const classNames = {
  container: css`
    list-style: none;
    margin: 0;
    padding: 0;
  `,
};

export interface MenuProps {
  children: React.ReactNode;
}

export default function Menu({ children }: MenuProps) {
  return (
    <ul role="menu" className={classNames.container}>
      {children}
    </ul>
  );
}
