import { useCallback } from "react";
import { gql, useMutation } from "urql";
import { fromEvent, Observable } from "rxjs";

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
      const {
        data: { createUploadUrl: uploadUrl },
      } = await createUploadUrl();

      // Upload progress not possible with fetch() yet
      const xhr = new XMLHttpRequest();
      let uploadProgress: Observable<number> = new Observable();
      let cancelled = false;

      const promise = new Promise<void>((res, rej) => {
        let progress = 0;
        uploadProgress = fromEvent(
          xhr.upload,
          "progress",
          (ev: ProgressEvent) => {
            if (ev.lengthComputable) {
              progress = Math.floor((100 * ev.loaded) / ev.total);
              return progress;
            }

            return progress;
          }
        );

        xhr.addEventListener("loadend", () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            res();
          } else {
            rej(new Error(cancelled ? "Upload cancelled" : xhr.statusText));
          }
        });

        xhr.open("PUT", uploadUrl);
        xhr.setRequestHeader("Content-Type", file.type);
        xhr.send(file);
      });

      return {
        promise,
        uploadProgress,
        cancel: () => {
          cancelled = true;
          xhr.abort();
        },
      };
    },
    [createUploadUrl]
  );

  return { selectFiles, uploadFile };
}
