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

export default function NavBar() {
  const { user } = useContext(UserContext);

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
        <span className={cx(classNames.colorText)}>47</span> challenges in the
        queue
      </div>
    </div>
  );
}
