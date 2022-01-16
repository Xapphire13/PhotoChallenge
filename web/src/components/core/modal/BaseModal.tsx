import { css } from "@linaria/core";
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const classNames = {
  wrapper: css`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  `,
};

export interface BaseModalProps {
  isOpen: boolean;
  children: React.ReactNode;
}

export default function BaseModal({ isOpen, children }: BaseModalProps) {
  const portalRef = useRef<HTMLDivElement>(document.createElement("div"));

  useEffect(() => {
    portalRef.current.className = classNames.wrapper;
  }, []);

  useEffect(() => {
    if (isOpen) {
      const portalTarget = portalRef.current;
      document.body.appendChild(portalTarget);

      return () => {
        portalTarget.remove();
      };
    }

    return () => undefined;
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return createPortal(children, portalRef.current);
}
