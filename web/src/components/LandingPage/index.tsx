import { css, cx } from "@linaria/core";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import CenterLayout from "../layouts/CenterLayout";
import NameModal from "./NameModal";
import usePersistentStorage from "../../hooks/usePersistentStorage";
import NavBar from "../NavBar";
import NavBarLayout from "../layouts/NavBarLayout";
import User from "../../types/User";
import theme from "../../theme";
import Card from "../core/Card";
import CardContent from "../core/Card/CardContent";
import SecondaryButton from "../core/buttons/SecondaryButton";

const classNames = {
  colorText: css`
    color: ${theme.palette.primaryText};
  `,
  content: css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing["16px"]};
  `,
  challengeHeading: css`
    ${theme.typography.title.large}
  `,
  challengeText: css`
    ${theme.typography.base.large}
  `,
};

export default function LandingPage() {
  const navigate = useNavigate();
  const [user, setUser] = usePersistentStorage<User>("user");
  const [loggedIn] = usePersistentStorage<boolean>("logged-in");

  const handleUserSet = (name: string, email: string) => {
    setUser({ name, email });
  };

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
      <CenterLayout className={cx(classNames.content)}>
        <Card>
          <CardContent>
            <h1 className={cx(classNames.challengeHeading)}>
              Today&apos;s challenge
            </h1>

            <p className={cx(classNames.challengeText)}>Something shiny</p>

            <p>
              Next challenge in{" "}
              <span className={cx(classNames.colorText)}>1hr 42min</span>
            </p>
          </CardContent>
        </Card>
        <SecondaryButton onClick={handleAddChallengeClicked}>
          Add a challenge
        </SecondaryButton>
      </CenterLayout>

      <NameModal isOpen={!user} onSubmit={handleUserSet} />
    </NavBarLayout>
  );
}
