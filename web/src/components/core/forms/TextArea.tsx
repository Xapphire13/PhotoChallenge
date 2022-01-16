import { css, cx } from "@linaria/core";
import React, { useState } from "react";
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
  withCharacterCount: css`
    padding-bottom: ${theme.spacing["16px"]};
  `,
  fullWidth: css`
    width: 100%;
  `,
  visiblyHidden: css`
    display: none;
  `,
  label: css`
    display: inline-block;
    position: relative;
  `,
  characterLimit: css`
    ${theme.typography.base.small}
    position: absolute;
    right: ${theme.spacing["4px"]};
    bottom: ${theme.spacing["4px"]};
    color: ${theme.palette.primary};
  `,
};

export type TextAreaProps = {
  id: string;
  value?: string;
  minRows?: number;
  maxRows?: number;
  onChange?: (value: string) => void;
  fullWidth?: boolean;
  characterLimit?: number;
} & LabelOrPlaceHolderRequired &
  Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    >,
    "value" | "onChange" | "label" | "placeholder" | "height" | "style" | "ref"
  >;

export default function TextArea({
  id,
  minRows,
  maxRows,
  value = "",
  onChange,
  fullWidth,
  label,
  placeholder,
  characterLimit,
  ...rest
}: TextAreaProps) {
  const [focused, setFocused] = useState(false);
  const showCharacterCount = characterLimit && focused;

  const handleOnChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
    let newValue = ev.target.value;

    if (characterLimit && newValue.length > characterLimit) {
      newValue = newValue.slice(0, characterLimit);
    }

    if (maxRows) {
      const lines = newValue.split("\n");

      if (lines.length > maxRows) {
        const [line1, line2, line3, ...overflowLines] = lines;
        const overflow = overflowLines.join(" ").trim();

        newValue = [line1, line2, line3 + overflow].join("\n");
      }
    }

    onChange?.(newValue);
  };

  const handleOnFocus = () => setFocused(true);
  const handleOnBlur = () => setFocused(false);

  return (
    <label
      htmlFor={id}
      className={cx(classNames.label, fullWidth && classNames.fullWidth)}
    >
      <span className={cx(classNames.visiblyHidden)}>
        {label || placeholder}
      </span>
      <TextareaAutosize
        id={id}
        placeholder={placeholder}
        value={value}
        minRows={minRows}
        maxRows={maxRows}
        className={cx(
          classNames.textarea,
          fullWidth && classNames.fullWidth,
          showCharacterCount && classNames.withCharacterCount
        )}
        onChange={handleOnChange}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        {...rest}
      />

      {showCharacterCount && (
        <div className={classNames.characterLimit}>
          {value.length}/{characterLimit}
        </div>
      )}
    </label>
  );
}
