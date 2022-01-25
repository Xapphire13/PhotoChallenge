import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { v4 as uuid } from "uuid";
import Toast from "../components/core/Toast";
import ToastContainer from "../components/core/Toast/ToastContainer";

interface ToastInfo {
  id: string;
  title: string;
  duration?: number;
}

/* eslint-disable @typescript-eslint/no-empty-function */
export const ToastContext = React.createContext({
  addToast: (toastInfo: Omit<ToastInfo, "id">) => "" as string,
  removeToast: (toastId: string) => {},
});
/* eslint-enable @typescript-eslint/no-empty-function */

type ToastContextValueType = React.ContextType<typeof ToastContext>;

export interface ToastProviderProps {
  children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  const portalRef = useRef<HTMLDivElement>(document.createElement("div"));
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  const handleAddToast: ToastContextValueType["addToast"] = useCallback(
    (toast) => {
      const toastId = uuid();

      setToasts((prev) => [
        ...prev,
        {
          ...toast,
          id: toastId,
          duration: toast.duration ?? 5,
        },
      ]);

      return toastId;
    },
    []
  );
  const handleRemoveToast: ToastContextValueType["removeToast"] = useCallback(
    (toastId) => {
      setToasts((prev) => prev.filter(({ id }) => id !== toastId));
    },
    []
  );

  useEffect(() => {
    const portalTarget = portalRef.current;
    document.body.appendChild(portalTarget);

    return () => {
      portalTarget.remove();
    };
  }, []);

  const contextValue: ToastContextValueType = useMemo(
    () => ({
      addToast: handleAddToast,
      removeToast: handleRemoveToast,
    }),
    [handleAddToast, handleRemoveToast]
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {createPortal(
        <ToastContainer>
          {toasts.map(({ title, id, duration }) => (
            <Toast
              key={id}
              id={id}
              title={title}
              duration={duration}
              onExpire={handleRemoveToast}
            />
          ))}
        </ToastContainer>,
        portalRef.current
      )}
    </ToastContext.Provider>
  );
}
