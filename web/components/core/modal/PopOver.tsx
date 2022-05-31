import { css, cx } from "@linaria/core";
import useEvent from "@react-hook/event";
import React, { useEffect, useRef } from "react";
import theme from "../../../theme";
import BaseModal from "./BaseModal";

const classNames = {
  container: css`
    position: absolute;
    background-color: ${theme.palette.background1};
    ${theme.cornerRadius.medium}
    overflow: hidden;
    top: -9999px;
    left: -9999px;
    pointer-events: all;
  `,
};

export interface PopOverProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
  anchorElement: React.RefObject<HTMLElement>;
}

export default function PopOver({
  isOpen,
  children,
  onClose,
  anchorElement: anchorElementRef,
}: PopOverProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEvent(window, "click", (ev) => {
    if (
      ev.target instanceof Element &&
      !containerRef.current?.contains(ev.target)
    ) {
      onClose();
    }
  });

  useEvent(window, "keyup", (ev) => {
    if (ev.key === "Escape") {
      onClose();
    }
  });

  useEffect(() => {
    if (isOpen) {
      const handle = window.setInterval(() => {
        const anchorElement = anchorElementRef.current;
        const containerElement = containerRef.current;

        if (anchorElement && containerElement) {
          const anchorBounds = anchorElement.getBoundingClientRect();
          const containerBounds = containerElement.getBoundingClientRect();

          containerElement.style.top = `${anchorBounds.bottom}px`;
          containerElement.style.left = `${
            anchorBounds.left + anchorBounds.width - containerBounds.width
          }px`;
        }
      }, 1000 / 60);

      return () => window.clearInterval(handle);
    }

    return () => undefined;
  }, [anchorElementRef, isOpen]);

  return (
    <BaseModal isOpen={isOpen} clickThroughWrapper>
      <div ref={containerRef} className={cx(classNames.container)}>
        {children}
      </div>
    </BaseModal>
  );
}
