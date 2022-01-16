import { css, cx } from "@linaria/core";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import CenterLayout from "../layouts/CenterLayout";
import NameModal from "./NameModal";
import usePersistentStorage from "../../hooks/usePersistentStorage";
import NavBar from "../NavBar";
import NavBarLayout from "../layouts/NavBarLayout";
import User from "../../types/User";

const classNames = {
  contentContainer: css`
    flex-grow: 1;
  `,
};

export default function LandingPage() {
  const navigate = useNavigate();
  const [user, setUser] = usePersistentStorage<User>("user");
  const [loggedIn] = usePersistentStorage<boolean>("logged-in");

  const handleUserSet = (name: string, email: string) => {
    setUser({ name, email });
  };

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    }
  }, [loggedIn, navigate]);

  return (
    <NavBarLayout>
      <NavBar />
      <CenterLayout className={cx(classNames.contentContainer)}>
        ...
      </CenterLayout>

      <NameModal isOpen={!user} onSubmit={handleUserSet} />
    </NavBarLayout>
  );
}
