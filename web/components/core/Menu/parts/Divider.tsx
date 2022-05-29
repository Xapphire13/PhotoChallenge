import { css, cx } from "@linaria/core";
import React from "react";
import theme from "../../../../theme";

const classNames = {
  container: css`
    height: 1px;
    background-color: ${theme.palette.faint};
  `,
};

export default function Divider() {
  return <div className={cx(classNames.container)} />;
}
