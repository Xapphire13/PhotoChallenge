import { css, cx } from "@linaria/core";
import React, { useLayoutEffect, useState } from "react";
import FocusLock from "react-focus-lock";
import theme from "../../../theme";
import CSSVar from "../../../types/CSSVar";

const classNames = {
  overlay: css`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 255, 0);
  `,
  container: css`
    position: absolute;
    top: var(--popover--top, 0);
    background-color: ${theme.palette.background1};
    ${theme.cornerRadius.medium}
    overflow: hidden;
  `,
};

export interface PopOverProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
  anchorElement?: React.RefObject<HTMLElement>;
}

export default function PopOver({
  isOpen,
  children,
  onClose,
  anchorElement,
}: PopOverProps) {
  const [top, setTop] = useState(0);

  useLayoutEffect(() => {
    if (anchorElement?.current) {
      setTop(anchorElement.current.clientHeight);
    }
  }, [anchorElement]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className={cx(classNames.overlay)} onClick={onClose} aria-hidden />
      <div
        className={cx(classNames.container)}
        style={{
          ["--popover--top" as CSSVar]: `${top}px`,
        }}
      >
        <FocusLock>{children}</FocusLock>
      </div>
    </>
  );
}
