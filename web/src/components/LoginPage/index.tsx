import { css, cx } from "@linaria/core";
import React from "react";
import { useNavigate } from "react-router";
import theme from "../../theme";
import PrimaryButton from "../core/buttons/PrimaryButton";
import Card from "../core/Card";
import CardContent from "../core/Card/CardContent";
import PasswordInput from "../core/forms/PasswordInput";
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

  const handleSubmitPressed = () => {
    localStorage.setItem("logged-in", "true");
    navigate("/");
  };

  return (
    <CenterLayout>
      <Card>
        <CardContent className={cx(classNames.cardContent)}>
          <h1>Login</h1>
          <PasswordInput id="password" placeholder="Password" />
          <PrimaryButton
            className={classNames.submitButton}
            onClick={handleSubmitPressed}
          >
            Submit
          </PrimaryButton>
        </CardContent>
      </Card>
    </CenterLayout>
  );
}
