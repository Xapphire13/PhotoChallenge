import { css, cx } from "@linaria/core";
import React, { useRef } from "react";
import useSize from "@react-hook/size";
import useIntersectionObserver from "@react-hook/intersection-observer";
import NavBarLayout from "../../layouts/NavBarLayout";
import theme from "../../../theme";
import SecondaryButton from "../../core/buttons/SecondaryButton";
import Card from "../../core/Card";
import CardContent from "../../core/Card/CardContent";
import ColumnLayout from "../../layouts/ColumnLayout";
import ElevatedCardContainer from "../../core/Card/ElevatedCardContainer";
import useCurrentChallenge from "./hooks/useCurrentChallenge";
import HorizontalButtonGroup from "../../core/buttons/HorizontalButtonGroup";
import useToast from "../../../hooks/useToast";
import useDeviceType from "../../../hooks/useDeviceType";
import MainTabBar from "../../MainTabBar";
import Interval from "../../core/Interval";
import MainMenuLayout from "../../layouts/MainMenuLayout";
import StaticFooterLayout from "../../layouts/StaticFooterLayout";
import CSSVar from "../../../types/CSSVar";
import SwipeDown from "./parts/SwipeDown";

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
  contentContainer: css`
    display: grid;
    grid-template:
      "aboveContent" var(--spacer__height, 1fr)
      "content" auto
      "underContent" var(--spacer__height, 1fr)
      "uploads" auto
      / auto;
    justify-content: center;
    overflow: auto;
  `,
  content: css`
    grid-area: content;
  `,
  underContent: css`
    grid-area: underContent;
    position: relative;
  `,
  scrollIcon: css`
    position: absolute;
    top: -16px;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  uploads: css`
    grid-area: uploads;
    padding: 1px;
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
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const uploadsScrollMarkerRef = useRef<HTMLDivElement>(null);
  const [, contentContainerHeight] = useSize(contentContainerRef);
  const [, contentHeight] = useSize(contentRef);
  const spacerSize = Math.max(0, contentContainerHeight - contentHeight) / 2;
  const { isIntersecting: uploadsVisible } = useIntersectionObserver(
    uploadsScrollMarkerRef
  );
  const showScrollDown = !uploadsVisible && spacerSize >= 64 - 16;

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
      <MainMenuLayout>
        <StaticFooterLayout>
          <div
            className={cx(classNames.contentContainer)}
            ref={contentContainerRef}
            style={{ ["--spacer__height" as CSSVar]: `${spacerSize}px` }}
          >
            <ColumnLayout className={cx(classNames.content)} ref={contentRef}>
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

              <HorizontalButtonGroup className={cx(classNames.buttonGroup)}>
                <SecondaryButton
                  className={cx(classNames.button)}
                  onClick={handleShareChallengeClicked}
                >
                  Share
                </SecondaryButton>
              </HorizontalButtonGroup>
            </ColumnLayout>

            <div className={cx(classNames.underContent)}>
              {showScrollDown && (
                <div className={classNames.scrollIcon}>
                  <SwipeDown />
                </div>
              )}
            </div>

            <div className={cx(classNames.uploads)}>
              <div ref={uploadsScrollMarkerRef} />
              Photos!
            </div>
          </div>

          <MainTabBar />
        </StaticFooterLayout>
      </MainMenuLayout>
    </NavBarLayout>
  );
}
