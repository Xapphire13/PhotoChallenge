import { css, cx } from "@linaria/core";
import React, { useContext } from "react";
import { useMatch, useNavigate } from "react-router";
import { ENABLE_PROFILE_PAGE } from "../../constants/features";
import { PROFILE_PAGE } from "../../constants/paths";
import { UserContext } from "../../contexts/UserContextProvider";
import useRootQuery from "../../hooks/useRootQuery";
import theme from "../../theme";
import TextLink from "../core/TextLink";

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
};

interface GetFutureChallengeCountQuery {
  futureChallengeCount: {
    count: number;
  };
}

export default function NavBar() {
  const { data } = useRootQuery<GetFutureChallengeCountQuery>();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const profilePageMatch = useMatch(PROFILE_PAGE);

  const handleUsernameButtonPressed = (ev: React.MouseEvent) => {
    if (!profilePageMatch) {
      navigate(PROFILE_PAGE);
    }

    ev.preventDefault();
  };

  return (
    <div className={cx(classNames.container)}>
      <div>
        {user && (
          <>
            Welcome{" "}
            {ENABLE_PROFILE_PAGE ? (
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
          </>
        )}
      </div>

      <div>
        <span className={cx(classNames.colorText)}>
          {data?.futureChallengeCount.count == null
            ? "--"
            : data.futureChallengeCount.count}
        </span>{" "}
        challenges in the queue
      </div>
    </div>
  );
}
