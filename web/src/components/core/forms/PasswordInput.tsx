import React from "react";
import BaseInput, {
  BaseInputProps,
  LabelOrPlaceHolderRequired,
} from "./BaseInput";

export type PasswordInputProps = Omit<
  BaseInputProps,
  "type" | "label" | "placeholder"
> &
  LabelOrPlaceHolderRequired;

export default function PasswordInput(props: PasswordInputProps) {
  return <BaseInput {...props} type="password" />;
}
