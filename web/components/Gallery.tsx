import { css, cx } from "@linaria/core";
import React from "react";
import Card from "./core/Card";
import useCurrentChallenge from "./pages/LandingPage/hooks/useCurrentChallenge";

const classNames = {
  container: css`
    display: flex;
    justify-content: center;
  `,
  uploadCard: css`
    width: 450px;
    height: 450px;
  `,
  upload: css`
    width: 100%;
    height: 100%;
    object-fit: fill;
  `,
};

export interface GalleryProps {
  uploads: NonNullable<
    ReturnType<typeof useCurrentChallenge>["currentChallenge"]
  >["uploads"];
}

export default function Gallery({ uploads }: GalleryProps) {
  return (
    <div className={cx(classNames.container)}>
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
