import { css, cx } from "@linaria/core";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import NameModal from "./NameModal";
import usePersistentStorage from "../../hooks/usePersistentStorage";
import NavBar from "../NavBar";
import NavBarLayout from "../layouts/NavBarLayout";
import User from "../../types/User";
import theme from "../../theme";
import SecondaryButton from "../core/buttons/SecondaryButton";
import Card from "../core/Card";
import CardContent from "../core/Card/CardContent";

const classNames = {
  colorText: css`
    color: ${theme.palette.primaryText};
  `,
  content: css`
    margin-left: auto;
    margin-right: auto;
    max-width: 768px;
  `,
  todaysChallenge: css`
    ${theme.typography.title.large}
  `,
  challengeText: css`
    text-decoration: underline;
    text-decoration-color: ${theme.palette.primaryText};
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
      <div className={cx(classNames.content)}>
        <p className={cx(classNames.todaysChallenge)}>
          Today&apos;s challenge is{" "}
          <span className={cx(classNames.challengeText)}>something shiny</span>
        </p>

        <Card>
          <CardContent>
            <p>
              Next challenge in{" "}
              <span className={cx(classNames.colorText)}>1hr 42min</span>
            </p>

            <SecondaryButton onClick={handleAddChallengeClicked}>
              Submit a challenge
            </SecondaryButton>
          </CardContent>
        </Card>
      </div>

      <NameModal isOpen={!user} onSubmit={handleUserSet} />
    </NavBarLayout>
  );
}
