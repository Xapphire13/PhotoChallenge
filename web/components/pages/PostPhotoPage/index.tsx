import { css, cx } from "@linaria/core";
import React, { useCallback, useEffect, useState } from "react";
import { PlusSquare } from "react-feather";
import { useNavigate } from "react-router";
import { ROOT } from "../../../constants/paths";
import useDeviceType from "../../../hooks/useDeviceType";
import useToast from "../../../hooks/useToast";
import theme from "../../../theme";
import HorizontalButtonGroup from "../../core/buttons/HorizontalButtonGroup";
import PrimaryButton from "../../core/buttons/PrimaryButton";
import SecondaryButton from "../../core/buttons/SecondaryButton";
import VerticalButtonGroup from "../../core/buttons/VerticalButtonGroup";
import Sheet from "../../core/modal/Sheet";
import SheetTitle from "../../core/modal/SheetTitle";
import CenterLayout from "../../layouts/CenterLayout";
import MainMenuLayout from "../../layouts/MainMenuLayout";
import NavBarLayout from "../../layouts/NavBarLayout";
import StaticFooterLayout from "../../layouts/StaticFooterLayout";
import MainTabBar from "../../MainTabBar";
import useFileUpload from "./hooks/useFileUpload";
import UploadedFile from "./parts/UploadedFile";

const classNames = {
  container: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: ${theme.spacing["24px"]};
  `,
  fileList: css`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: ${theme.spacing["16px"]};
    justify-content: center;
  `,
  buttonGroup: css`
    margin-top: ${theme.spacing["16px"]};
  `,
};

interface Upload {
  id: string;
  file: File;
  uploadProgress: number;
  caption: string | undefined;
  cancel: () => void;
}

export default function PostPhotoPage() {
  const { selectFiles, uploadFile, removeFile, submitUploads } =
    useFileUpload();
  const [uploadSourceSheetOpen, setUploadSourceSheetOpen] = useState(false);
  const deviceType = useDeviceType();
  const [uploads, setUploads] = useState<Upload[]>([]);
  const uploadPercentage = Math.floor(
    uploads.reduce((total, current) => total + current.uploadProgress, 0) /
      uploads.length
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleUploadSourceSheetClosed = () => {
    setUploadSourceSheetOpen(false);
  };

  const handleSelectFiles = useCallback(
    (fromCameraRoll: boolean) => async () => {
      const selectedFiles = await selectFiles({ capture: fromCameraRoll });

      if (selectedFiles) {
        const newFiles = await Promise.all(
          [...selectedFiles].map(async (file) => {
            const { uploadProgress, cancel, id } = await uploadFile(file);
            const subscription = uploadProgress.subscribe({
              next: (value) => {
                if (value === 100) {
                  subscription.unsubscribe();
                }

                setUploads((prev) =>
                  prev.map((upload) => {
                    if (upload.file === file) {
                      return {
                        ...upload,
                        uploadProgress: value,
                      };
                    }

                    return upload;
                  })
                );
              },
            });

            return {
              id,
              file,
              cancel: () => {
                subscription.unsubscribe();
                cancel();
              },
              uploadProgress: 0,
              caption: undefined,
            };
          })
        );
        setUploads((prev) => [...prev, ...newFiles]);
      }
    },
    [selectFiles, uploadFile]
  );

  const handleAddMore = useCallback(() => {
    if (deviceType === "mobile") {
      setUploadSourceSheetOpen(true);
    } else {
      handleSelectFiles(true)();
    }
  }, [deviceType, handleSelectFiles]);

  const handleRemoveUpload = (upload: Upload) => async () => {
    if (upload.uploadProgress < 100) {
      upload.cancel();
    } else {
      await removeFile(upload.id);
    }

    setUploads((prev) => prev.filter((it) => it !== upload));
  };

  const handleCaptionChanged = (upload: Upload) => (caption: string) => {
    setUploads((prev) =>
      prev.map((it) => {
        if (it === upload) {
          // eslint-disable-next-line no-param-reassign
          it.caption = caption;
        }

        return it;
      })
    );
  };

  const handleOnSubmit = async () => {
    setIsSubmitting(true);

    try {
      await submitUploads(uploads);
      addToast({
        title: "Success!",
      });
      navigate(ROOT);
    } catch {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    handleAddMore();
  }, [handleAddMore]);

  return (
    <>
      <NavBarLayout>
        <MainMenuLayout>
          <StaticFooterLayout>
            <CenterLayout>
              <div className={cx(classNames.container)}>
                {uploads.length === 0 && (
                  <PrimaryButton onClick={handleAddMore}>
                    <PlusSquare /> Choose a file
                  </PrimaryButton>
                )}
                {uploads.length > 0 && (
                  <>
                    <ul className={cx(classNames.fileList)}>
                      {uploads.map((upload) => (
                        <UploadedFile
                          key={upload.id}
                          file={upload.file}
                          uploadProgress={upload.uploadProgress}
                          onRemove={handleRemoveUpload(upload)}
                          caption={upload.caption}
                          onCaptionChange={handleCaptionChanged(upload)}
                        />
                      ))}
                    </ul>

                    <HorizontalButtonGroup
                      className={cx(classNames.buttonGroup)}
                    >
                      <SecondaryButton onClick={handleAddMore}>
                        <PlusSquare /> Add more
                      </SecondaryButton>
                      <PrimaryButton
                        disabled={isSubmitting || uploadPercentage < 100}
                        onClick={handleOnSubmit}
                      >
                        {isSubmitting && "Submitting..."}
                        {!isSubmitting &&
                          (uploadPercentage < 100
                            ? `Uploading (${uploadPercentage}%)`
                            : "Submit")}
                      </PrimaryButton>
                    </HorizontalButtonGroup>
                  </>
                )}
              </div>
            </CenterLayout>

            <MainTabBar />
          </StaticFooterLayout>
        </MainMenuLayout>
      </NavBarLayout>

      <Sheet
        isOpen={uploadSourceSheetOpen}
        onClose={handleUploadSourceSheetClosed}
      >
        <SheetTitle>Upload a photo/video</SheetTitle>
        <VerticalButtonGroup>
          <SecondaryButton onClick={handleSelectFiles(false)}>
            Take photo
          </SecondaryButton>
          <SecondaryButton onClick={handleSelectFiles(true)}>
            Choose from camera roll
          </SecondaryButton>
        </VerticalButtonGroup>
      </Sheet>
    </>
  );
}
