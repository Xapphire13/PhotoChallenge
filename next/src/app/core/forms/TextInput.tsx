import React from "react";
import BaseInput, {
  BaseInputProps,
  LabelOrPlaceHolderRequired,
} from "./BaseInput";

export type TextInputProps = Omit<BaseInputProps, "label" | "placeholder"> &
  LabelOrPlaceHolderRequired;

export default function TextInput({ type = "text", ...rest }: TextInputProps) {
  return <BaseInput type={type} {...rest} />;
}
