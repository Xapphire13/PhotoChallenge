import { css, cx } from "@linaria/core";
import React from "react";
import theme from "../../../theme";

const classNames = {
  container: css`
    position: fixed;
    right: ${theme.spacing["16px"]};
    bottom: ${theme.spacing["16px"]};
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing["8px"]};
  `,
};

export interface ToastContainerProps {
  children: React.ReactNode;
}

export default function ToastContainer({ children }: ToastContainerProps) {
  return <div className={cx(classNames.container)}>{children}</div>;
}
