import { css, cx } from "@linaria/core";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import theme from "../../theme";
import PrimaryButton from "../core/buttons/PrimaryButton";
import Card from "../core/Card";
import CardContent from "../core/Card/CardContent";
import useOnEnter from "../../hooks/useOnEnter";
import CenterLayout from "../layouts/CenterLayout";
import usePersistentStorage from "../../hooks/usePersistentStorage";
import TextInput from "../core/forms/TextInput";
import ElevatedCardContainer from "../core/Card/ElevatedCardContainer";

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
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, setLoggedIn] = usePersistentStorage<boolean>("logged-in");

  const submitDisabled = !username.trim() || !password.trim();

  const handleSubmitPressed = () => {
    if (!submitDisabled) {
      localStorage.setItem("logged-in", "true");
      setLoggedIn(true);
      navigate("/");
    }
  };

  const handleKeyPress = useOnEnter(handleSubmitPressed);

  return (
    <CenterLayout>
      <ElevatedCardContainer>
        <Card>
          <CardContent className={cx(classNames.cardContent)}>
            <h1>Login</h1>

            <form className={cx(classNames.form)}>
              <TextInput
                id="username"
                value={username}
                onChange={setUsername}
                placeholder="Username"
                className={cx(classNames.formField)}
              />
              <TextInput
                id="password"
                placeholder="Password"
                value={password}
                onChange={setPassword}
                onKeyPress={handleKeyPress}
                type="password"
                className={cx(classNames.formField)}
              />

              <PrimaryButton
                className={classNames.submitButton}
                onClick={handleSubmitPressed}
                disabled={submitDisabled}
              >
                Submit
              </PrimaryButton>
            </form>
          </CardContent>
        </Card>
      </ElevatedCardContainer>
    </CenterLayout>
  );
}
