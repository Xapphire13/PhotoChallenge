import { gql, useQuery } from "@apollo/client";
import { css, cx } from "@linaria/core";
import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContextProvider";
import theme from "../../theme";

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

export const GET_FUTURE_CHALLENGES_QUERY = gql`
  query GetFutureChallenges {
    futureChallenges {
      id
    }
  }
`;

interface GetFutureChallengesQuery {
  futureChallenges: {
    id: string;
  }[];
}

export default function NavBar() {
  const { user } = useContext(UserContext);
  const { data } = useQuery<GetFutureChallengesQuery>(
    GET_FUTURE_CHALLENGES_QUERY
  );

  return (
    <div className={cx(classNames.container)}>
      <div>
        {user && (
          <>
            Welcome{" "}
            <span className={cx(classNames.colorText)}>{user.username}</span>
          </>
        )}
      </div>

      <div>
        <span className={cx(classNames.colorText)}>
          {data?.futureChallenges.length == null
            ? "--"
            : data.futureChallenges.length}
        </span>{" "}
        challenges in the queue
      </div>
    </div>
  );
}
