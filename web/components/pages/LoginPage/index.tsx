import { css, cx } from "@linaria/core";
import React, { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import theme from "../../../theme";
import PrimaryButton from "../../core/buttons/PrimaryButton";
import Card from "../../core/Card";
import CardContent from "../../core/Card/CardContent";
import useOnEnter from "../../../hooks/useOnEnter";
import CenterLayout from "../../layouts/CenterLayout";
import TextInput from "../../core/forms/TextInput";
import ElevatedCardContainer from "../../core/Card/ElevatedCardContainer";

const classNames = {
  cardContent: css`
    display: flex;
    flex-direction: column;
  `,
  submitButton: css`
    margin-top: ${theme.spacing["8px"]};
  `,
  form: css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing["8px"]};
    width: 300px;
  `,
  formField: css`
    width: 100%;
  `,
  loginError: css`
    margin-top: ${theme.spacing["8px"]};
    color: ${theme.palette.warning};
  `,
};

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const submitDisabled = !username.trim() || !password.trim();
  const handleSubmitForm = () => {
    if (!submitDisabled) {
      formRef.current?.submit();
    }
  };

  const loginError = Boolean(searchParams.get("error"));
  const handleKeyPress = useOnEnter(handleSubmitForm);

  return (
    <CenterLayout>
      <ElevatedCardContainer>
        <Card>
          <CardContent className={cx(classNames.cardContent)}>
            <h1>Login</h1>

            <form ref={formRef} className={cx(classNames.form)} method="POST">
              <TextInput
                id="username"
                name="username"
                value={username}
                onChange={setUsername}
                placeholder="Username"
                className={cx(classNames.formField)}
                autoFocus
              />
              <TextInput
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={setPassword}
                onKeyPress={handleKeyPress}
                type="password"
                className={cx(classNames.formField)}
              />

              <PrimaryButton
                className={classNames.submitButton}
                disabled={submitDisabled}
                submit
              >
                Submit
              </PrimaryButton>
            </form>

            {loginError && (
              <p className={cx(classNames.loginError)}>
                Incorrect username/password
              </p>
            )}
          </CardContent>
        </Card>
      </ElevatedCardContainer>
    </CenterLayout>
  );
}
