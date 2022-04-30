import { css, cx } from "@linaria/core";
import React from "react";
import theme from "../../../../theme";
import TextInput from "../../../core/forms/TextInput";

const classNames = {
  container: css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing["4px"]};
  `,
  image: css`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,
  video: css`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,
  preview: css`
    overflow: hidden;
    ${theme.cornerRadius.small}
    border: 1px solid ${theme.palette.faint};
    width: 400px;
    height: 400px;
  `,
};

export interface UploadedFileProps {
  file: File;
}

function getFileType(file: File): "video" | "image" {
  return file.type.startsWith("video") ? "video" : "image";
}

export default function UploadedFile({ file }: UploadedFileProps) {
  const fileType = getFileType(file);

  return (
    <li className={cx(classNames.container)}>
      <div className={cx(classNames.preview)}>
        {fileType === "image" && (
          <img
            className={cx(classNames.image)}
            alt=""
            src={URL.createObjectURL(file)}
          />
        )}
        {fileType === "video" && (
          //  eslint-disable-next-line jsx-a11y/media-has-caption
          <video
            className={cx(classNames.video)}
            src={URL.createObjectURL(file)}
          />
        )}
      </div>

      <TextInput
        id={`${file.name}-caption`}
        name={`${file.name}-caption`}
        placeholder="Optional caption"
        fullWidth
      />
    </li>
  );
}
