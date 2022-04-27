import { css, cx } from "@linaria/core";
import React from "react";
import theme from "../../../../theme";
import Clickable, { ClickableProps } from "../../Clickable";

const classNames = {
  container: css`
    padding: ${theme.spacing["8px"]};
  `,
  innerContainer: css`
    display: flex;
    gap: ${theme.spacing["8px"]};
    align-items: center;
  `,
};

export interface MenuItemProps extends ClickableProps {
  children: React.ReactNode;
  icon?: React.ReactElement;
}

export default function MenuItem({
  children,
  icon,
  ...clickableProps
}: MenuItemProps) {
  return (
    <li role="menuitem" className={cx(classNames.container)}>
      <Clickable {...clickableProps}>
        <div className={cx(classNames.innerContainer)}>
          {icon}
          {children}
        </div>
      </Clickable>
    </li>
  );
}
