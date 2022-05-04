import { css, cx } from "@linaria/core";
import React, { useRef, useState } from "react";
import useIsTouchDevice from "../../../../hooks/useIsTouchDevice";
import theme from "../../../../theme";
import HorizontalButtonGroup from "../../../core/buttons/HorizontalButtonGroup";
import PrimaryButton from "../../../core/buttons/PrimaryButton";
import SecondaryButton from "../../../core/buttons/SecondaryButton";
import TertiaryButton from "../../../core/buttons/TertiaryButton";
import VerticalButtonGroup from "../../../core/buttons/VerticalButtonGroup";
import Card from "../../../core/Card";
import CardContent from "../../../core/Card/CardContent";
import Clickable from "../../../core/Clickable";
import TextInput from "../../../core/forms/TextInput";
import ModalWithBackdrop from "../../../core/modal/ModalWithBackdrop";
import Sheet from "../../../core/modal/Sheet";
import SheetTitle from "../../../core/modal/SheetTitle";
import CenterLayout from "../../../layouts/CenterLayout";

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
  overlayWrapper: css`
    position: relative;
  `,
  overlay: css`
    position: absolute;
    background-color: ${theme.palette.modalBackdrop};
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  `,
  cancelConfirmButtons: css`
    margin-top: ${theme.spacing["16px"]};

    & > * {
      flex-grow: 1;
      flex-basis: 0px;
    }
  `,
};

export interface UploadedFileProps {
  file: File;
  uploadProgress: number;
  onRemove: () => void;
}

function getFileType(file: File): "video" | "image" {
  return file.type.startsWith("video") ? "video" : "image";
}

interface TouchWrapperProps {
  children: React.ReactNode;
  onClick?: () => void;
  onRemove?: () => void;
}

function TouchWrapper({ children, onClick, onRemove }: TouchWrapperProps) {
  const isTouchDevice = useIsTouchDevice();
  const [showPreviewOverlay, setShowPreviewOverlay] = useState(false);
  const overlayWrapperRef = useRef<HTMLDivElement | null>(null);

  const handleMouseOverPreview = () => {
    setShowPreviewOverlay(true);
  };

  const handleMouseLeavePreview = () => {
    setShowPreviewOverlay(false);
  };

  const handleOnBlur = () => {
    if (!overlayWrapperRef.current?.matches(":focus-within")) {
      handleMouseLeavePreview();
    }
  };

  if (isTouchDevice) {
    return <Clickable onClick={onClick}>{children}</Clickable>;
  }

  return (
    <div
      ref={overlayWrapperRef}
      className={cx(classNames.overlayWrapper)}
      onMouseOver={handleMouseOverPreview}
      onMouseLeave={handleMouseLeavePreview}
      onFocus={handleMouseOverPreview}
      onBlur={handleOnBlur}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
    >
      {children}
      {showPreviewOverlay && (
        <div className={cx(classNames.overlay)}>
          <CenterLayout>
            <SecondaryButton onClick={onRemove}>Remove</SecondaryButton>
          </CenterLayout>
        </div>
      )}
    </div>
  );
}

export default function UploadedFile({
  file,
  onRemove,
  uploadProgress,
}: UploadedFileProps) {
  const fileType = getFileType(file);
  const [objectUrl] = useState(() => URL.createObjectURL(file));
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [isConfirmRemoveModalOpen, setIsConfirmRemoveModalOpen] =
    useState(false);

  const handlePreviewClicked = () => {
    setIsActionSheetOpen(true);
  };

  const handleCloseActionSheet = () => {
    setIsActionSheetOpen(false);
  };

  const handleRemoveClicked = () => {
    setIsActionSheetOpen(false);
    setIsConfirmRemoveModalOpen(true);
  };

  const handleCancelRemoveClicked = () => {
    setIsConfirmRemoveModalOpen(false);
  };

  const handleConfirmRemoveClicked = () => {
    setIsConfirmRemoveModalOpen(false);
    onRemove();
  };

  return (
    <>
      <li className={cx(classNames.container)}>
        <TouchWrapper
          onClick={handlePreviewClicked}
          onRemove={handleRemoveClicked}
        >
          <div className={cx(classNames.preview)}>
            {fileType === "image" && (
              <img className={cx(classNames.image)} alt="" src={objectUrl} />
            )}
            {fileType === "video" && (
              //  eslint-disable-next-line jsx-a11y/media-has-caption
              <video className={cx(classNames.video)} src={objectUrl} />
            )}
          </div>
        </TouchWrapper>

        <TextInput
          id={`${file.name}-caption`}
          name={`${file.name}-caption`}
          placeholder="Optional caption"
          fullWidth
        />

        <div>Upload: {uploadProgress}%</div>
      </li>

      <Sheet isOpen={isActionSheetOpen} onClose={handleCloseActionSheet}>
        <SheetTitle
          before={
            <TertiaryButton onClick={handleCloseActionSheet}>
              close
            </TertiaryButton>
          }
        >
          {file.name}
        </SheetTitle>
        <VerticalButtonGroup>
          <SecondaryButton onClick={handleRemoveClicked}>
            Remove
          </SecondaryButton>
        </VerticalButtonGroup>
      </Sheet>

      <ModalWithBackdrop isOpen={isConfirmRemoveModalOpen}>
        <Card>
          <CardContent>
            <h1>Are you sure?</h1>
            <p>This will remove {file.name}</p>
            <HorizontalButtonGroup
              className={cx(classNames.cancelConfirmButtons)}
            >
              <SecondaryButton onClick={handleCancelRemoveClicked}>
                Cancel
              </SecondaryButton>
              <PrimaryButton onClick={handleConfirmRemoveClicked}>
                Yes
              </PrimaryButton>
            </HorizontalButtonGroup>
          </CardContent>
        </Card>
      </ModalWithBackdrop>
    </>
  );
}
