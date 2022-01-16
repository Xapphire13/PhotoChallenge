import { css, cx } from "@linaria/core";
import React, { useState } from "react";
import theme from "../../theme";
import PrimaryButton from "../core/buttons/PrimaryButton";
import CardContent from "../core/Card/CardContent";
import ElevatedCardContainer from "../core/Card/ElevatedCardContainer";
import FullBleedCard from "../core/Card/FullBleedCard";
import TextInput from "../core/forms/TextInput";
import useOnEnter from "../../hooks/useOnEnter";
import ModalWithBackdrop from "../core/modal/ModalWithBackdrop";

const classNames = {
  form: css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing["8px"]};
    width: 300px;
  `,
  formField: css`
    width: 100%;
  `,
  submitButton: css`
    margin-top: ${theme.spacing["8px"]};
  `,
};

export interface NameModalProps {
  isOpen: boolean;
  onSubmit: (name: string, email: string) => void;
}

export default function NameModal({ isOpen, onSubmit }: NameModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const submitDisabled = !name.trim() || !email.trim();
  const handleSubmit = () => !submitDisabled && onSubmit(name, email);
  const handleKeyPress = useOnEnter(handleSubmit);

  return (
    <ModalWithBackdrop isOpen={isOpen}>
      <ElevatedCardContainer>
        <FullBleedCard>
          <CardContent>
            <h1>Who are you?</h1>

            <form className={cx(classNames.form)}>
              <TextInput
                id="name"
                value={name}
                onChange={setName}
                placeholder="Name"
                className={cx(classNames.formField)}
              />

              <TextInput
                id="email"
                value={email}
                onChange={setEmail}
                placeholder="Email"
                onKeyPress={handleKeyPress}
                type="email"
                className={cx(classNames.formField)}
              />
            </form>

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
