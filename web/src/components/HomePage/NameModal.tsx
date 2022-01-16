import { css, cx } from "@linaria/core";
import React, { useState } from "react";
import theme from "../../theme";
import PrimaryButton from "../core/buttons/PrimaryButton";
import CardContent from "../core/Card/CardContent";
import ElevatedCardContainer from "../core/Card/ElevatedCardContainer";
import FullBleedCard from "../core/Card/FullBleedCard";
import TextInput from "../core/forms/TextInput";
import useOnEnter from "../core/hooks/useOnEnter";
import ModalWithBackdrop from "../core/modal/ModalWithBackdrop";

const classNames = {
  textInput: css`
    width: 100%;
  `,
  submitButton: css`
    margin-top: ${theme.spacing["8px"]};
  `,
};

export interface NameModalProps {
  isOpen: boolean;
  onSubmit: (name: string) => void;
}

export default function NameModal({ isOpen, onSubmit }: NameModalProps) {
  const [name, setName] = useState("");

  const submitDisabled = !name.trim();
  const handleSubmit = () => !submitDisabled && onSubmit(name);
  const handleKeyPress = useOnEnter(handleSubmit);

  return (
    <ModalWithBackdrop isOpen={isOpen}>
      <ElevatedCardContainer>
        <FullBleedCard>
          <CardContent>
            <h1>What&apos;s your name?</h1>

            <TextInput
              id="name"
              value={name}
              onChange={setName}
              placeholder="Name..."
              className={cx(classNames.textInput)}
              onKeyPress={handleKeyPress}
            />

            <PrimaryButton
              className={cx(classNames.submitButton)}
              fullWidth
              onClick={handleSubmit}
              disabled={submitDisabled}
            >
              Submit
            </PrimaryButton>
          </CardContent>
        </FullBleedCard>
      </ElevatedCardContainer>
    </ModalWithBackdrop>
  );
}
