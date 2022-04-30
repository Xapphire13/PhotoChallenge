import { useCallback } from "react";

interface SelectFilesOptions {
  capture?: boolean;
}

export default function useFileUpload() {
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

  return { selectFiles };
}
