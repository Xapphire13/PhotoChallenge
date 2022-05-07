import { useCallback } from "react";
import { gql, useMutation } from "urql";
import { fromEvent, Observable } from "rxjs";

const CREATE_UPLOAD_URL_MUTATION = gql`
  mutation CreateUploadUrl {
    createUploadUrl {
      id
      uploadUrl
    }
  }
`;

const REMOVE_FILE_MUTATION = gql`
  mutation RemoveFile($id: String!) {
    deleteFile(id: $id)
  }
`;

const SUBMIT_UPLOADS_MUTATION = gql`
  mutation SubmitUploads($uploads: [UploadInput!]!) {
    submitUploads(uploads: $uploads)
  }
`;

interface SelectFilesOptions {
  capture?: boolean;
}

export default function useFileUpload() {
  const [, createUploadUrl] = useMutation(CREATE_UPLOAD_URL_MUTATION);
  const [, removeFileMutation] = useMutation(REMOVE_FILE_MUTATION);
  const [, submitUploadsMutation] = useMutation(SUBMIT_UPLOADS_MUTATION);
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
        data: {
          createUploadUrl: { id, uploadUrl },
        },
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
        id,
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

  const removeFile = useCallback(
    async (id: string) => {
      await removeFileMutation({ id });
    },
    [removeFileMutation]
  );

  const submitUploads = useCallback(
    async (uploads: { id: string; caption?: string }[]) => {
      await submitUploadsMutation({
        // We map here to remove any extra fields
        uploads: uploads.map(({ id, caption }) => ({ id, caption })),
      });
    },
    [submitUploadsMutation]
  );

  return { selectFiles, uploadFile, removeFile, submitUploads };
}
