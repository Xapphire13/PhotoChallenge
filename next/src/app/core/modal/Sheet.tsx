import { css, cx } from "@linaria/core";
import React from "react";
import theme from "../../../theme";
import BaseModal from "./BaseModal";

const classNames = {
  backdrop: css`
    position: absolute;
    background-color: ${theme.palette.modalBackdrop};
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  `,
  container: css`
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: end;
    pointer-events: none;
  `,
  sheet: css`
    padding: ${theme.spacing["16px"]};
    background-color: ${theme.palette.background1};
    border-top-left-radius: ${theme.cornerRadius.medium.borderRadius};
    border-top-right-radius: ${theme.cornerRadius.medium.borderRadius};
    pointer-events: auto;
  `,
};

export interface SheetProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose?: () => void;
}

export default function Sheet({ isOpen, children, onClose }: SheetProps) {
  return (
    <BaseModal isOpen={isOpen}>
      <div className={cx(classNames.backdrop)} onClick={onClose} aria-hidden />
      <div className={cx(classNames.container)}>
        <div className={cx(classNames.sheet)}>{children}</div>
      </div>
    </BaseModal>
  );
}
