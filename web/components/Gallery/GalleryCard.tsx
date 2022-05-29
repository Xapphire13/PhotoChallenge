import React, { useRef } from "react";
import { css, cx } from "@linaria/core";
import Card from "../core/Card";
import useHoverOrFocus from "../../hooks/useHoverOrFocus";
import CardOverlay from "./CardOverlay";

const classNames = {
  uploadCard: css`
    width: var(--gallery--upload-card-size, 450px);
    height: var(--gallery--upload-card-size, 450px);
  `,
  upload: css`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,
};

export interface GalleryCardProps {
  src: string;
  uploadedBy: {
    id: string;
    username: string;
  };

  caption?: string;
}

export default function GalleryCard({
  src,
  uploadedBy,
  caption,
}: GalleryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const hoveredOrFocused = useHoverOrFocus(cardRef);

  return (
    <Card className={cx(classNames.uploadCard)} ref={cardRef}>
      <img
        className={cx(classNames.upload)}
        src={src}
        alt={`Uploaded by ${uploadedBy.username}`}
      />
      {hoveredOrFocused && (
        <CardOverlay uploadedBy={uploadedBy} caption={caption} />
      )}
    </Card>
  );
}
