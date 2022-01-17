import { css, cx } from "@linaria/core";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import usePersistentStorage from "../../hooks/usePersistentStorage";
import NavBar from "../NavBar";
import NavBarLayout from "../layouts/NavBarLayout";
import User from "../../types/User";
import theme from "../../theme";
import SecondaryButton from "../core/buttons/SecondaryButton";
import Card from "../core/Card";
import CardContent from "../core/Card/CardContent";
import ColumnLayout from "../layouts/ColumnLayout";
import ElevatedCardContainer from "../core/Card/ElevatedCardContainer";

const classNames = {
  colorText: css`
    color: ${theme.palette.primaryText};
  `,
  todaysChallenge: css`
    ${theme.typography.title.large}
    margin-bottom: ${theme.spacing["24px"]};
  `,
  challengeText: css`
    text-decoration: underline;
    text-decoration-color: ${theme.palette.primaryText};
  `,
  submitChallengeButton: css`
    margin-top: ${theme.spacing["8px"]};
  `,
};

export default function LandingPage() {
  const navigate = useNavigate();
  const [loggedIn] = usePersistentStorage<boolean>("logged-in");

  const handleAddChallengeClicked = () => {
    navigate("/new-challenge");
  };

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    }
  }, [loggedIn, navigate]);

  return (
    <NavBarLayout>
      <NavBar />
      <ColumnLayout>
        <p className={cx(classNames.todaysChallenge)}>
          Today&apos;s challenge is{" "}
          <span className={cx(classNames.challengeText)}>something shiny</span>
        </p>

        <ElevatedCardContainer>
          <Card>
            <CardContent>
              <p>
                Next challenge in{" "}
                <span className={cx(classNames.colorText)}>1hr 42min</span>
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
    </NavBarLayout>
  );
}
