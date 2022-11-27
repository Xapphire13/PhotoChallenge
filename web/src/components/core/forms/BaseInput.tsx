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
    border-bottom: 2px solid ${theme.palette.background1};
    ${theme.typography.base.large}

    :focus {
      border-bottom: 2px solid ${theme.palette.primary};
    }
  `,
  visiblyHidden: css`
    display: none;
  `,
  fullWidth: css`
    width: 100%;
  `,
};

export type LabelOrPlaceHolderRequired =
  | { label?: string; placeholder: string }
  | { label: string; placeholder?: string };

export type BaseInputProps = {
  id: string;
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  fullWidth?: boolean;
} & LabelOrPlaceHolderRequired &
  Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    "id" | "value" | "onChange" | "label" | "placeholder" | "name"
  >;

export default function BaseInput({
  id,
  label,
  placeholder,
  value,
  onChange,
  type,
  className,
  fullWidth,
  name,
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
        name={name}
        type={type}
        value={value}
        onChange={handleOnChange}
        placeholder={placeholder}
        className={cx(
          classNames.inputField,
          fullWidth && classNames.fullWidth,
          className
        )}
        {...rest}
      />
    </label>
  );
}
