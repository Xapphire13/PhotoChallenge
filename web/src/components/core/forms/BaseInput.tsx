import { css, cx } from "@linaria/core";
import React from "react";
import theme from "../../../theme";

const classNames = {
  inputField: css`
    background: none;
    border: none;
    outline: none;
    color: ${theme.palette.white};
    padding: ${theme.spacing["4px"]};
    border-top: 2px solid #00000000;
    border-left: 2px solid #00000000;
    border-right: 2px solid #00000000;
    border-bottom: 2px solid ${theme.palette.lightGray};

    :focus {
      ${theme.cornerRadius.small}
      border: 2px solid ${theme.palette.primary};
    }
  `,
  visiblyHidden: css`
    display: none;
  `,
};

export type LabelOrPlaceHolderRequired =
  | { label?: string; placeholder: string }
  | { label: string; placeholder?: string };

export type BaseInputProps = {
  id: string;
  value?: string;
  onChange?: (value: string) => void;
} & LabelOrPlaceHolderRequired &
  Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    "value" | "onChange" | "label" | "placeholder"
  >;

export default function BaseInput({
  id,
  label,
  placeholder,
  value,
  onChange,
  type,
  className,
  ...rest
}: BaseInputProps) {
  const handleOnChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = ev.target.value;

    onChange?.(newValue);
  };

  return (
    <label htmlFor={id}>
      <span className={cx(classNames.visiblyHidden)}>
        {label || placeholder}
      </span>
      <input
        id={id}
        type={type}
        value={value}
        onChange={handleOnChange}
        placeholder={placeholder}
        className={cx(classNames.inputField, className)}
        {...rest}
      />
    </label>
  );
}
