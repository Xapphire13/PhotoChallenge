import { css, cx } from "@linaria/core";
import React from "react";
import { useNavigate } from "react-router";
import NavBar from "../../NavBar";
import NavBarLayout from "../../layouts/NavBarLayout";
import theme from "../../../theme";
import SecondaryButton from "../../core/buttons/SecondaryButton";
import Card from "../../core/Card";
import CardContent from "../../core/Card/CardContent";
import ColumnLayout from "../../layouts/ColumnLayout";
import ElevatedCardContainer from "../../core/Card/ElevatedCardContainer";
import CenterLayout from "../../layouts/CenterLayout";
import FooterLayout from "../../layouts/FooterLayout";
import Footer from "../../footer";
import useCurrentChallenge from "./hooks/useCurrentChallenge";

const classNames = {
  colorText: css`
    color: ${theme.palette.primaryText};
  `,
  todaysChallenge: css`
    ${theme.typography.title.large}
    margin-bottom: ${theme.spacing["32px"]};
  `,
  challengeText: css`
    text-decoration: underline;
    text-decoration-color: ${theme.palette.primaryText};
  `,
  submitChallengeButton: css`
    margin-top: ${theme.spacing["8px"]};
  `,
};

function transformFirstLetter(value: string) {
  const [first, ...rest] = value;

  return [first?.toLowerCase(), ...rest].join("");
}

function getTimeRemaining(endsAt: Date) {
  const now = new Date().getTime();
  const then = endsAt.getTime();

  return then - now;
}

const MIN_MS = 1000 * 60;
const HOURS_MS = MIN_MS * 60;

function formatDuration(durationMs: number) {
  const hours = Math.floor(durationMs / HOURS_MS);
  const minutes = Math.floor((durationMs % HOURS_MS) / MIN_MS);

  let builder = "";

  if (hours) {
    builder += `${hours}${hours === 1 ? "hr" : "hrs"} `;
  }

  builder += `${minutes}${minutes === 1 ? "min" : "mins"}`;

  return builder;
}

export default function LandingPage() {
  const navigate = useNavigate();
  const { currentChallenge, loading: currentChallengeLoading } =
    useCurrentChallenge();
  const timeRemaining = currentChallenge?.endsAt
    ? getTimeRemaining(currentChallenge.endsAt)
    : null;

  const handleAddChallengeClicked = () => {
    navigate("/new-challenge");
  };

  return (
    <NavBarLayout>
      <NavBar />

      <FooterLayout>
        <CenterLayout>
          <ColumnLayout>
            <p className={cx(classNames.todaysChallenge)}>
              Today&apos;s challenge is{" "}
              <span className={cx(classNames.challengeText)}>
                {currentChallenge?.name
                  ? transformFirstLetter(currentChallenge.name)
                  : "--"}
              </span>
            </p>

            <ElevatedCardContainer>
              <Card>
                <CardContent>
                  <p>
                    Next challenge in{" "}
                    <span className={cx(classNames.colorText)}>
                      {formatDuration(timeRemaining ?? 0)}
                    </span>
                  </p>

                  <SecondaryButton
                    className={cx(classNames.submitChallengeButton)}
                    onClick={handleAddChallengeClicked}
                  >
                    Submit a challenge
                  </SecondaryButton>
                </CardContent>
              </Card>
            </ElevatedCardContainer>
          </ColumnLayout>
        </CenterLayout>

        <Footer />
      </FooterLayout>
    </NavBarLayout>
  );
}
