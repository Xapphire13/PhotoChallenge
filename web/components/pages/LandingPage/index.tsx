import { css, cx } from "@linaria/core";
import React from "react";
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
import useCurrentChallenge from "./hooks/useCurrentChallenge";
import ButtonGroup from "../../core/buttons/ButtonGroup";
import useToast from "../../../hooks/useToast";
import useDeviceType from "../../../hooks/useDeviceType";
import MainTabBar from "../../MainTabBar";
import Interval from "../../core/Interval";

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
  buttonGroup: css`
    margin-top: ${theme.spacing["16px"]};
    justify-content: stretch;
  `,
  button: css`
    flex-grow: 1;
    flex-basis: 0;
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

const ONE_SECOND_MS = 1000;
const MIN_MS = ONE_SECOND_MS * 60;
const HOURS_MS = MIN_MS * 60;

function formatDuration(durationMs: number) {
  const hours = Math.floor(durationMs / HOURS_MS);
  let minutes = Math.ceil((durationMs % HOURS_MS) / MIN_MS);

  // Edge case where we load EXACTLY on the hour
  if (minutes === 60) {
    minutes = 59;
  }

  let builder = "";

  if (hours) {
    builder += `${hours}${hours === 1 ? "hr" : "hrs"} `;
  }

  builder += `${minutes}${minutes === 1 ? "min" : "mins"}`;

  return builder;
}

export default function LandingPage() {
  const { currentChallenge } = useCurrentChallenge();
  const { addToast } = useToast();
  const deviceType = useDeviceType();

  const handleShareChallengeClicked = async () => {
    const shareUrl = `${window.location.protocol}//${window.location.host}/share/challenge/${currentChallenge?.id}`;

    if (
      (deviceType === "mobile" || deviceType === "tablet") &&
      window.location.protocol.startsWith("https") &&
      "share" in navigator
    ) {
      await navigator.share({
        title: `Today's challenge is ${transformFirstLetter(
          currentChallenge?.name ?? ""
        )}`,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      addToast({
        title: "Share link copied",
      });
    }
  };

  return (
    <NavBarLayout>
      <NavBar />

      <FooterLayout>
        <CenterLayout>
          <ColumnLayout>
            <>
              <p className={cx(classNames.todaysChallenge)}>
                Today&apos;s challenge is{" "}
                <span className={cx(classNames.challengeText)}>
                  {currentChallenge?.name &&
                    transformFirstLetter(currentChallenge.name)}
                </span>
              </p>

              <ElevatedCardContainer>
                <Card>
                  <CardContent>
                    <Interval interval={ONE_SECOND_MS}>
                      {() => (
                        <p>
                          Next challenge in{" "}
                          <span className={cx(classNames.colorText)}>
                            {currentChallenge?.endsAt &&
                              formatDuration(
                                getTimeRemaining(currentChallenge.endsAt)
                              )}
                          </span>
                        </p>
                      )}
                    </Interval>
                  </CardContent>
                </Card>
              </ElevatedCardContainer>

              <ButtonGroup className={cx(classNames.buttonGroup)}>
                <SecondaryButton
                  className={cx(classNames.button)}
                  onClick={handleShareChallengeClicked}
                >
                  Share
                </SecondaryButton>
              </ButtonGroup>
            </>
          </ColumnLayout>
        </CenterLayout>

        <MainTabBar />
      </FooterLayout>
    </NavBarLayout>
  );
}
