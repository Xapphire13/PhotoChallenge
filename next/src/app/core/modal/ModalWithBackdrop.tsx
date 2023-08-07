import { css, cx } from "@linaria/core";
import React from "react";
import theme from "../../../theme";
import CenterLayout from "../../layouts/CenterLayout";
import BaseModal, { BaseModalProps } from "./BaseModal";

const classNames = {
  container: css`
    background: ${theme.palette.modalBackdrop};
  `,
};

export type ModalWithBackdropProps = BaseModalProps;

export default function ModalWithBackdrop({
  isOpen,
  children,
}: ModalWithBackdropProps) {
  return (
    <BaseModal isOpen={isOpen}>
      <CenterLayout className={cx(classNames.container)}>
        {children}
      </CenterLayout>
    </BaseModal>
  );
}
