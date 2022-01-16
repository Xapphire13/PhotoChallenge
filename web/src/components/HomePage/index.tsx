import { css, cx } from "@linaria/core";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import theme from "../../theme";
import PrimaryButton from "../core/buttons/PrimaryButton";
import Card from "../core/Card";
import CardContent from "../core/Card/CardContent";
import TextArea from "../core/forms/TextArea";
import useOnEnter from "../../hooks/useOnEnter";
import CenterLayout from "../layouts/CenterLayout";
import NameModal from "./NameModal";
import usePersistentStorage from "../../hooks/usePersistentStorage";

const classNames = {
  submitButton: css`
    margin-top: ${theme.spacing["8px"]};
  `,
};

export default function HomePage() {
  const navigate = useNavigate();
  const [name, setName] = usePersistentStorage<string>("name");
  const [loggedIn] = usePersistentStorage<boolean>("logged-in");
  const [challengeText, setChallengeText] = useState("");
  const submitDisabled = !challengeText.trim();

  const handleSubmit = () => {
    if (!submitDisabled) {
      setChallengeText("");
    }
  };

  const handleNameSet = (value: string) => {
    setName(value);
  };

  const handleKeyPress = useOnEnter(handleSubmit, { requireModifier: true });

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    }
  }, [loggedIn, navigate]);

  return (
    <>
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
          </CardContent>
        </Card>
      </CenterLayout>

      <NameModal isOpen={!name || !name.trim()} onSubmit={handleNameSet} />
    </>
  );
}
