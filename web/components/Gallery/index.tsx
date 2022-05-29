import { css, cx } from "@linaria/core";
import useSize from "@react-hook/size";
import React, { useRef } from "react";
import theme from "../../theme";
import CSSVar from "../../types/CSSVar";
import useCurrentChallenge from "../pages/LandingPage/hooks/useCurrentChallenge";
import GalleryCard from "./GalleryCard";

const classNames = {
  container: css`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: ${theme.spacing["8px"]};
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
        <GalleryCard
          key={upload.id}
          src={upload.url}
          uploadedBy={upload.uploadedBy}
        />
      ))}
    </div>
  );
}
