import { css, cx } from "@linaria/core";
import React, { useState } from "react";
import useOnEnter from "../../hooks/useOnEnter";
import theme from "../../theme";
import PrimaryButton from "../core/buttons/PrimaryButton";
import Card from "../core/Card";
import CardContent from "../core/Card/CardContent";
import TextArea from "../core/forms/TextArea";
import ColumnLayout from "../layouts/ColumnLayout";
import NavBarLayout from "../layouts/NavBarLayout";
import NavBar from "../NavBar";

const classNames = {
  submitButton: css`
    /* HACKHACK Subtract 6px due to weird bug where input is getting blank space after it */
    margin-top: calc(${theme.spacing["8px"]} - 6px);
  `,
};

export default function SubmitChallengePage() {
  const [challengeText, setChallengeText] = useState("");
  const submitDisabled = !challengeText.trim();

  const handleSubmit = () => {
    if (!submitDisabled) {
      setChallengeText("");
    }
  };
  const handleKeyPress = useOnEnter(handleSubmit, { requireModifier: true });

  return (
    <NavBarLayout>
      <NavBar />
      <ColumnLayout>
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
          characterLimit={250}
        />
        <PrimaryButton
          className={cx(classNames.submitButton)}
          disabled={submitDisabled}
          onClick={handleSubmit}
          fullWidth
        >
          Submit
        </PrimaryButton>
      </ColumnLayout>
    </NavBarLayout>
  );
}
