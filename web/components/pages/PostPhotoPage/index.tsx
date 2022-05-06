import { css, cx } from "@linaria/core";
import React, { useCallback, useEffect, useState } from "react";
import { PlusSquare } from "react-feather";
import useDeviceType from "../../../hooks/useDeviceType";
import theme from "../../../theme";
import HorizontalButtonGroup from "../../core/buttons/HorizontalButtonGroup";
import PrimaryButton from "../../core/buttons/PrimaryButton";
import SecondaryButton from "../../core/buttons/SecondaryButton";
import VerticalButtonGroup from "../../core/buttons/VerticalButtonGroup";
import Sheet from "../../core/modal/Sheet";
import SheetTitle from "../../core/modal/SheetTitle";
import ProgressBar from "../../core/ProgressBar";
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
  file: File;
  uploadProgress: number;
  cancel: () => void;
}

export default function PostPhotoPage() {
  const { selectFiles, uploadFile } = useFileUpload();
  const [uploadSourceSheetOpen, setUploadSourceSheetOpen] = useState(false);
  const deviceType = useDeviceType();
  const [uploads, setUploads] = useState<Upload[]>([]);
  const uploadPercentage = Math.floor(
    uploads.reduce((total, current) => total + current.uploadProgress, 0) /
      uploads.length
  );

  const handleUploadSourceSheetClosed = () => {
    setUploadSourceSheetOpen(false);
  };

  const handleSelectFiles = useCallback(
    (fromCameraRoll: boolean) => async () => {
      const selectedFiles = await selectFiles({ capture: fromCameraRoll });

      if (selectedFiles) {
        const newFiles = await Promise.all(
          [...selectedFiles].map(async (file) => {
            const { uploadProgress, cancel } = await uploadFile(file);
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
              file,
              cancel,
              uploadProgress: 0,
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

  const handleRemoveUpload = (upload: Upload) => () => {
    upload.cancel();
    setUploads((prev) => prev.filter((it) => it !== upload));
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
                          key={upload.file.name}
                          file={upload.file}
                          uploadProgress={upload.uploadProgress}
                          onRemove={handleRemoveUpload(upload)}
                        />
                      ))}
                    </ul>

                    <HorizontalButtonGroup
                      className={cx(classNames.buttonGroup)}
                    >
                      <SecondaryButton onClick={handleAddMore}>
                        <PlusSquare /> Add more
                      </SecondaryButton>
                      <PrimaryButton disabled={uploadPercentage < 100}>
                        {uploadPercentage < 100
                          ? `Uploading (${uploadPercentage}%)`
                          : "Submit"}
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
