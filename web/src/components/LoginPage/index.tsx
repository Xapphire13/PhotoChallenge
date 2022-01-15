import { css, cx } from "@linaria/core";
import React from "react";
import { useNavigate } from "react-router";
import Card from "../common/Card";
import CardContent from "../common/Card/CardContent";

const classNames = {
  container: css`
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
  `,
  cardContent: css`
    display: flex;
    flex-direction: column;
  `,
};

export default function LoginPage() {
  const navigate = useNavigate();

  const handleSubmitPressed = () => {
    localStorage.setItem("logged-in", "true");
    navigate("/");
  };

  return (
    <div className={cx(classNames.container)}>
      <Card>
        <CardContent className={cx(classNames.cardContent)}>
          <h1>Login</h1>
          <input type="text" placeholder="Password" />
          <button type="button" onClick={handleSubmitPressed}>
            Submit
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
