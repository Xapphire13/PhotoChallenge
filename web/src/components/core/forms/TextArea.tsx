import { css, cx } from "@linaria/core";
import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import theme from "../../../theme";
import { LabelOrPlaceHolderRequired } from "./BaseInput";

const classNames = {
  textarea: css`
    ${theme.cornerRadius.small}
    resize: none;
    background: ${theme.palette.faint};
    border: none;
    color: ${theme.palette.white};
    padding: ${theme.spacing["8px"]};

    :focus {
      outline: 2px solid ${theme.palette.primary};
    }
  `,
  fullWidth: css`
    width: 100%;
  `,
  visiblyHidden: css`
    display: none;
  `,
};

export type TextAreaProps = {
  id: string;
  value?: string;
  minRows?: number;
  maxRows?: number;
  onChange?: (value: string) => void;
  fullWidth?: boolean;
} & LabelOrPlaceHolderRequired;

export default function TextArea({
  id,
  minRows,
  maxRows,
  value = "",
  onChange,
  fullWidth,
  label,
  placeholder,
}: TextAreaProps) {
  const handleOnChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
    let newValue = ev.target.value;

    if (maxRows) {
      const lines = newValue.split("\n");

      if (lines.length > maxRows) {
        const [line1, line2, line3, ...rest] = lines;
        const overflow = rest.join(" ").trim();

        newValue = [line1, line2, line3 + overflow].join("\n");
      }
    }

    onChange?.(newValue);
  };

  return (
    <label htmlFor={id}>
      <span className={cx(classNames.visiblyHidden)}>
        {label || placeholder}
      </span>
      <TextareaAutosize
        id={id}
        placeholder={placeholder}
        value={value}
        minRows={minRows}
        maxRows={maxRows}
        className={cx(classNames.textarea, fullWidth && classNames.fullWidth)}
        onChange={handleOnChange}
      />
    </label>
  );
}
