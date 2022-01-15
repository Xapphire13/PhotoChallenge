import { css, cx } from "@linaria/core";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import theme from "../../theme";
import PrimaryButton from "../core/buttons/PrimaryButton";
import Card from "../core/Card";
import CardContent from "../core/Card/CardContent";
import TextArea from "../core/forms/TextArea";
import CenterLayout from "../layouts/CenterLayout";

const classNames = {
  submitButton: css`
    margin-top: ${theme.spacing["8px"]};
  `,
};

export default function HomePage() {
  const navigate = useNavigate();
  const [challengeText, setChallengeText] = useState("");
  const submitDisabled = !challengeText.trim();

  const handleSubmit = () => {
    if (!submitDisabled) {
      setChallengeText("");
    }
  };

  const handleKeyPress = (ev: React.KeyboardEvent) => {
    if (ev.key === "Enter" && (ev.ctrlKey || ev.shiftKey)) {
      handleSubmit();
      ev.preventDefault();
    }
  };

  useEffect(() => {
    const loggedIn = Boolean(localStorage.getItem("logged-in"));
    if (!loggedIn) {
      navigate("/login");
    }
  }, []);

  return (
    <CenterLayout>
      <Card>
        <CardContent>
          <h1>Submit a challenge...</h1>
          <TextArea
            id="challenge-text"
            minRows={1}
            maxRows={3}
            value={challengeText}
            onChange={setChallengeText}
            fullWidth
            placeholder="Enter challenge here..."
            onKeyPress={handleKeyPress}
          />
          <PrimaryButton
            className={cx(classNames.submitButton)}
            disabled={submitDisabled}
            onClick={handleSubmit}
            fullWidth
          >
            Submit
          </PrimaryButton>
        </CardContent>
      </Card>
    </CenterLayout>
  );
}
