import { css, cx } from "@linaria/core";
import React, { useContext } from "react";
import { Menu, X } from "react-feather";
import { useMatch, useNavigate } from "react-router";
import FocusLock from "react-focus-lock";
import { PROFILE_PAGE } from "../../utils/paths";
import { UserContext } from "../../contexts/UserContextProvider";
import useMainMenuContext from "../../hooks/useMainMenuContext";
import useRootQuery from "../../hooks/useRootQuery";
import theme from "../../theme";
import IconButton from "../core/buttons/IconButton";
import TextLink from "../core/TextLink";
import GroupDetails from "./GroupDetails";
import useFeature from "../../hooks/useFeature";

const classNames = {
  container: css`
    ${theme.typography.base.large}
    border-bottom: 1px solid ${theme.palette.primary};
    padding: ${theme.spacing["8px"]};
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  colorText: css`
    color: ${theme.palette.primaryText};
  `,
  leftSection: css`
    display: flex;
    align-items: center;
    gap: ${theme.spacing["8px"]};
  `,
};

export default function NavBar() {
  const { data } = useRootQuery();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const profilePageMatch = useMatch(PROFILE_PAGE);
  const { toggle: toggleMainMenu, isOpen: mainMenuIsOpen } =
    useMainMenuContext();
  const [enableProfilePage] = useFeature("profile-page");

  const handleUsernameButtonPressed = (ev: React.MouseEvent) => {
    if (!profilePageMatch) {
      navigate(PROFILE_PAGE);
    }

    ev.preventDefault();
  };

  return (
    <div className={cx(classNames.container)}>
      <div className={cx(classNames.leftSection)}>
        <FocusLock group="main-menu" disabled={!mainMenuIsOpen}>
          <IconButton
            accessibilityLabel="Main menu"
            onClick={toggleMainMenu}
            aria-expanded={mainMenuIsOpen}
          >
            {mainMenuIsOpen ? <X /> : <Menu />}
          </IconButton>
        </FocusLock>

        {user && (
          <div>
            Welcome{" "}
            {enableProfilePage ? (
              <TextLink
                href={PROFILE_PAGE}
                onClick={handleUsernameButtonPressed}
              >
                <span className={cx(classNames.colorText)}>
                  {user.username}
                </span>
              </TextLink>
            ) : (
              <span className={cx(classNames.colorText)}>{user.username}</span>
            )}
          </div>
        )}
      </div>

      {data?.group && (
        <GroupDetails
          currentGroup={data.group}
          futureChallengeCount={data?.group?.futureChallengeCount ?? "--"}
        />
      )}
    </div>
  );
}
