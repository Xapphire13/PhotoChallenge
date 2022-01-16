import React from "react";
import BaseInput, {
  BaseInputProps,
  LabelOrPlaceHolderRequired,
} from "./BaseInput";

export type TextInputProps = Omit<
  BaseInputProps,
  "type" | "label" | "placeholder"
> &
  LabelOrPlaceHolderRequired;

export default function TextInput(props: TextInputProps) {
  return <BaseInput type="text" {...props} />;
}
