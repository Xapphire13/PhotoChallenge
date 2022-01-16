import { css, cx } from "@linaria/core";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import theme from "../../theme";
import PrimaryButton from "../core/buttons/PrimaryButton";
import Card from "../core/Card";
import CardContent from "../core/Card/CardContent";
import PasswordInput from "../core/forms/PasswordInput";
import useOnEnter from "../../hooks/useOnEnter";
import CenterLayout from "../layouts/CenterLayout";

const classNames = {
  cardContent: css`
    display: flex;
    flex-direction: column;
  `,
  submitButton: css`
    margin-top: ${theme.spacing["8px"]};
  `,
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const submitDisabled = !password.trim();

  const handleSubmitPressed = () => {
    if (!submitDisabled) {
      localStorage.setItem("logged-in", "true");
      navigate("/");
    }
  };

  const handleKeyPress = useOnEnter(handleSubmitPressed);

  return (
    <CenterLayout>
      <Card>
        <CardContent className={cx(classNames.cardContent)}>
          <h1>Login</h1>
          <PasswordInput
            id="password"
            placeholder="Password"
            value={password}
            onChange={setPassword}
            onKeyPress={handleKeyPress}
          />
          <PrimaryButton
            className={classNames.submitButton}
            onClick={handleSubmitPressed}
            disabled={submitDisabled}
          >
            Submit
          </PrimaryButton>
        </CardContent>
      </Card>
    </CenterLayout>
  );
}
