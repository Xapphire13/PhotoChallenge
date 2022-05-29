import { css, cx } from "@linaria/core";
import useSize from "@react-hook/size";
import React, { useRef } from "react";
import theme from "../../theme";
import CSSVar from "../../types/CSSVar";
import Card from "../core/Card";
import useCurrentChallenge from "../pages/LandingPage/hooks/useCurrentChallenge";

const classNames = {
  container: css`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: ${theme.spacing["8px"]};
  `,
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

export interface GalleryProps {
  uploads: NonNullable<
    ReturnType<typeof useCurrentChallenge>["currentChallenge"]
  >["uploads"];
}

export default function Gallery({ uploads }: GalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth] = useSize(containerRef);

  const cardWidth = Math.min(containerWidth, 450);

  return (
    <div
      ref={containerRef}
      className={cx(classNames.container)}
      style={{ ["--gallery--upload-card-size" as CSSVar]: `${cardWidth}px` }}
    >
      {uploads.map((upload) => (
        <Card key={upload.id} className={cx(classNames.uploadCard)}>
          <img
            className={cx(classNames.upload)}
            src={upload.url}
            alt={`Uploaded by ${upload.uploadedBy.username}`}
          />
        </Card>
      ))}
    </div>
  );
}
