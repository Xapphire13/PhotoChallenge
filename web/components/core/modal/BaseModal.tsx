import { css, cx } from "@linaria/core";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import FocusLock from "react-focus-lock";

const classNames = {
  wrapper: css`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  `,
  wrapper_clickThrough: css`
    pointer-events: none;
  `,
  focusLock: css`
    height: 100%;
  `,
};

export interface BaseModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  clickThroughWrapper?: boolean;
}

export default function BaseModal({
  isOpen,
  children,
  clickThroughWrapper = false,
}: BaseModalProps) {
  const [portalRef] = useState<HTMLDivElement>(() =>
    document.createElement("div")
  );

  useEffect(() => {
    portalRef.className = cx(
      classNames.wrapper,
      clickThroughWrapper && classNames.wrapper_clickThrough
    );
  }, [clickThroughWrapper, portalRef]);

  useEffect(() => {
    if (isOpen) {
      const portalTarget = portalRef;
      document.body.appendChild(portalTarget);

      return () => {
        portalTarget.remove();
      };
    }

    return () => undefined;
  }, [isOpen, portalRef]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <FocusLock className={cx(classNames.focusLock)} autoFocus={false}>
      {children}
    </FocusLock>,
    portalRef
  );
}
