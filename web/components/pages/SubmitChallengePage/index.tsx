import { gql, useMutation } from "@apollo/client";
import { css, cx } from "@linaria/core";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import useOnEnter from "../../../hooks/useOnEnter";
import useToast from "../../../hooks/useToast";
import theme from "../../../theme";
import ButtonGroup from "../../core/buttons/ButtonGroup";
import PrimaryButton from "../../core/buttons/PrimaryButton";
import SecondaryButton from "../../core/buttons/SecondaryButton";
import TextArea from "../../core/forms/TextArea";
import Footer from "../../footer";
import CenterLayout from "../../layouts/CenterLayout";
import ColumnLayout from "../../layouts/ColumnLayout";
import FooterLayout from "../../layouts/FooterLayout";
import NavBarLayout from "../../layouts/NavBarLayout";
import NavBar, { GET_FUTURE_CHALLENGES_QUERY } from "../../NavBar";

const classNames = {
  buttonGroup: css`
    /* HACKHACK Subtract 6px due to weird bug where input is getting blank space after it */
    margin-top: calc(${theme.spacing["8px"]} - 6px);
  `,
  textarea: css`
    width: 100%;

    ${theme.responsive.mediumAndAbove} {
      width: 400px;
    }
  `,
  button: css`
    flex-grow: 1;
  `,
};

const ADD_CHALLENGE_MUTATION = gql`
  mutation AddChallenge($name: String!) {
    addChallenge(name: $name) {
      success
    }
  }
`;

export default function SubmitChallengePage() {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [addChallengeMutation] = useMutation(ADD_CHALLENGE_MUTATION, {
    refetchQueries: [GET_FUTURE_CHALLENGES_QUERY],
  });
  const [challengeText, setChallengeText] = useState("");
  const submitDisabled = !challengeText.trim();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleAddChallenge = (name: string) =>
    addChallengeMutation({
      variables: {
        name,
      },
    });
  const handleSubmit = async () => {
    if (!submitDisabled) {
      try {
        await handleAddChallenge(challengeText);
        addToast({
          title: "New challenge added!",
        });
        setChallengeText("");

        textAreaRef.current?.focus();
      } catch (err) {
        addToast({
          title: "Failed to add challenge",
        });
      }
    }
  };
  const handleCancel = () => {
    navigate(-1);
  };
  const handleKeyDown = useOnEnter(handleSubmit, { requireModifier: true });

  return (
    <NavBarLayout>
      <NavBar />

      <FooterLayout>
        <CenterLayout>
          <ColumnLayout>
            <h1>Submit a challenge...</h1>
            <TextArea
              ref={textAreaRef}
              id="challenge-text"
              minRows={1}
              maxRows={3}
              value={challengeText}
              onChange={setChallengeText}
              placeholder="Enter challenge here..."
              onKeyDown={handleKeyDown}
              characterLimit={250}
              className={cx(classNames.textarea)}
              autoFocus
            />

            <ButtonGroup className={cx(classNames.buttonGroup)}>
              <SecondaryButton
                className={cx(classNames.button)}
                onClick={handleCancel}
              >
                Back
              </SecondaryButton>
              <PrimaryButton
                className={cx(classNames.button)}
                disabled={submitDisabled}
                onClick={handleSubmit}
              >
                Submit
              </PrimaryButton>
            </ButtonGroup>
          </ColumnLayout>
        </CenterLayout>

        <Footer />
      </FooterLayout>
    </NavBarLayout>
  );
}
