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

export default function PostPhotoPage() {
  const { selectFiles, uploadFile } = useFileUpload();
  const [uploadSourceSheetOpen, setUploadSourceSheetOpen] = useState(false);
  const deviceType = useDeviceType();
  const [files, setFiles] = useState<File[]>([]);

  const handleUploadSourceSheetClosed = () => {
    setUploadSourceSheetOpen(false);
  };

  const handleSelectFiles = useCallback(
    (fromCameraRoll: boolean) => async () => {
      const selectedFiles = await selectFiles({ capture: fromCameraRoll });

      if (selectedFiles) {
        setFiles((prev) => [...prev, ...selectedFiles]);

        for (const file of selectedFiles) {
          uploadFile(file);
        }
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

  const handleRemoveFile = (file: File) => () => {
    setFiles((prev) => prev.filter((it) => it !== file));
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
                {files.length === 0 && (
                  <PrimaryButton onClick={handleAddMore}>
                    <PlusSquare /> Choose a file
                  </PrimaryButton>
                )}
                {files.length > 0 && (
                  <>
                    <ul className={cx(classNames.fileList)}>
                      {files.map((file) => (
                        <UploadedFile
                          key={file.name}
                          file={file}
                          onRemove={handleRemoveFile(file)}
                        />
                      ))}
                    </ul>

                    <HorizontalButtonGroup
                      className={cx(classNames.buttonGroup)}
                    >
                      <SecondaryButton onClick={handleAddMore}>
                        <PlusSquare /> Add more
                      </SecondaryButton>
                      <PrimaryButton>Submit</PrimaryButton>
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
