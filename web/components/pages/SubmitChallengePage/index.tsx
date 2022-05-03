import { css, cx } from "@linaria/core";
import React, { useRef, useState } from "react";
import { gql, useMutation } from "urql";
import useOnEnter from "../../../hooks/useOnEnter";
import useToast from "../../../hooks/useToast";
import theme from "../../../theme";
import HorizontalButtonGroup from "../../core/buttons/HorizontalButtonGroup";
import PrimaryButton from "../../core/buttons/PrimaryButton";
import TextArea from "../../core/forms/TextArea";
import CenterLayout from "../../layouts/CenterLayout";
import ColumnLayout from "../../layouts/ColumnLayout";
import MainMenuLayout from "../../layouts/MainMenuLayout";
import NavBarLayout from "../../layouts/NavBarLayout";
import StaticFooterLayout from "../../layouts/StaticFooterLayout";
import MainTabBar from "../../MainTabBar";

const classNames = {
  buttonGroup: css`
    /* HACKHACK Subtract 6px due to weird bug where input is getting blank space after it */
    margin-top: calc(${theme.spacing["8px"]} - 6px);
  `,
  textarea: css`
    width: 100%;

    ${theme.responsive.largeAndAbove} {
      width: 400px;
    }
  `,
  button: css`
    flex-grow: 1;
  `,
};

const ADD_CHALLENGE_MUTATION = gql`
  mutation AddChallenge($name: String!) {
    addChallenge(name: $name)
  }
`;

export default function SubmitChallengePage() {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [, addChallengeMutation] = useMutation(ADD_CHALLENGE_MUTATION);
  const [challengeText, setChallengeText] = useState("");
  const submitDisabled = !challengeText.trim();
  const { addToast } = useToast();

  const handleAddChallenge = (name: string) =>
    addChallengeMutation(
      {
        name,
      },
      {
        // Causes a refetch of the future challenges query
        additionalTypenames: ["FutureChallengeCountResponse"],
      }
    );
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
  const handleKeyDown = useOnEnter(handleSubmit, { requireModifier: true });

  return (
    <NavBarLayout>
      <MainMenuLayout>
        <StaticFooterLayout>
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

              <HorizontalButtonGroup className={cx(classNames.buttonGroup)}>
                <PrimaryButton
                  className={cx(classNames.button)}
                  disabled={submitDisabled}
                  onClick={handleSubmit}
                >
                  Submit
                </PrimaryButton>
              </HorizontalButtonGroup>
            </ColumnLayout>
          </CenterLayout>

          <MainTabBar />
        </StaticFooterLayout>
      </MainMenuLayout>
    </NavBarLayout>
  );
}
