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

export default function LandingPage() {
  const navigate = useNavigate();

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
                something shiny
              </span>
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
        </CenterLayout>

        <Footer />
      </FooterLayout>
    </NavBarLayout>
  );
}
