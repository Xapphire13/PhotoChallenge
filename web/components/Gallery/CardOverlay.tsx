import { css, cx } from "@linaria/core";
import React from "react";
import theme from "../../theme";

const classNames = {
  container: css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: end;
  `,
  overlay: css`
    display: flex;
    justify-content: end;
    padding: ${theme.spacing["8px"]};
    background-color: ${theme.palette.modalBackdrop};
    backdrop-filter: blur(5px);
    border-radius: 0px 0px ${theme.cornerRadius.medium.borderRadius} /*  */
      ${theme.cornerRadius.medium.borderRadius};
  `,
};

export interface CardOverlayProps {
  uploadedBy: { id: string; username: string };
  caption?: string;
}

export default function CardOverlay({ uploadedBy, caption }: CardOverlayProps) {
  return (
    <div className={cx(classNames.container)}>
      <div className={cx(classNames.overlay)}>
        {caption && `${caption} - `}by {uploadedBy.username}
      </div>
    </div>
  );
}
