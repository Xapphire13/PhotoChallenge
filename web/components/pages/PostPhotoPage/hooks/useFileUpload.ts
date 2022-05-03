import { useCallback } from "react";
import { gql, useMutation } from "urql";

const CREATE_UPLOAD_URL_MUTATION = gql`
  mutation CreateUploadUrl {
    createUploadUrl
  }
`;

interface SelectFilesOptions {
  capture?: boolean;
}

export default function useFileUpload() {
  const [, createUploadUrl] = useMutation(CREATE_UPLOAD_URL_MUTATION);
  const selectFiles = useCallback(
    ({ capture = false }: SelectFilesOptions = {}) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*,video/*";
      input.multiple = true;

      if (capture) {
        input.capture = "environment";
      }

      return new Promise<FileList | null>((res) => {
        let filesSelected = false;

        const focusListener = () => {
          window.removeEventListener("focus", focusListener);

          window.setTimeout(() => {
            if (!filesSelected) {
              res(null);
            }
          }, 500);
        };

        const changeListener = () => {
          input.removeEventListener("change", changeListener);
          window.removeEventListener("focus", focusListener);
          filesSelected = true;
          res(input.files);
        };

        input.addEventListener("change", changeListener);
        window.addEventListener("focus", focusListener);

        input.click();
      });
    },
    []
  );

  const uploadFile = useCallback(
    async (file: File) => {
      console.log(`Uploading: ${file.name}`);

      const {
        data: { createUploadUrl: uploadUrl },
      } = await createUploadUrl();

      const result = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
      });

      if (result.ok) {
        console.log(`Finished uploading ${file.name}`);
      } else {
        console.log(`Error uploading ${file.name}`);
      }
    },
    [createUploadUrl]
  );

  return { selectFiles, uploadFile };
}
