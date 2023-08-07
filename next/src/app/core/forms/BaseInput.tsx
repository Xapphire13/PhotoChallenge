import cx from "@/app/utils/cx";
import React from "react";
import styles from "./BaseInput.module.css";

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
      <span className={cx(styles.visiblyHidden)}>{label || placeholder}</span>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={handleOnChange}
        placeholder={placeholder}
        className={cx(
          styles.inputField,
          fullWidth && styles.fullWidth,
          className
        )}
        {...rest}
      />
    </label>
  );
}
