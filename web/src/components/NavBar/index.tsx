import { css, cx } from "@linaria/core";
import React from "react";
import usePersistentStorage from "../../hooks/usePersistentStorage";
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
  const [name] = usePersistentStorage<string>("name");

  return (
    <div className={cx(classNames.container)}>
      <div>
        {name && (
          <>
            Welcome <span className={cx(classNames.colorText)}>{name}</span>
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
