import { css, cx } from "@linaria/core";
import React from "react";
import theme from "../../../theme";

const classNames = {
  inputField: css`
    background: none;
    border: none;
    outline: none;
    color: ${theme.palette.white};
    border-bottom: 2px solid ${theme.palette.lightGray};

    :focus {
      border-bottom: 2px solid ${theme.palette.primary};
      color: ${theme.palette.primary};
    }
  `,
  visiblyHidden: css`
    display: none;
  `,
};

type LabelOrPlaceHolderRequired =
  | { label?: string; placeholder: string }
  | { label: string; placeholder?: string };

export type PasswordInputProps = {
  id: string;
} & LabelOrPlaceHolderRequired;

export default function PasswordInput({
  id,
  label,
  placeholder,
}: PasswordInputProps) {
  return (
    <label htmlFor={id}>
      <span className={cx(classNames.visiblyHidden)}>
        {label || placeholder}
      </span>
      <input
        id={id}
        type="password"
        placeholder={placeholder}
        className={cx(classNames.inputField)}
      />
    </label>
  );
}
