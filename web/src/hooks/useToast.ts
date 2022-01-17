import { useContext } from "react";
import { ToastContext } from "../contexts/ToastProvider";

export default function useToast() {
  return useContext(ToastContext);
}
