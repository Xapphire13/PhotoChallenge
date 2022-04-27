import { css, cx } from "@linaria/core";
import React from "react";
import FocusLock from "react-focus-lock";
import useMainMenuContext from "../../hooks/useMainMenuContext";
import theme from "../../theme";
import MainMenu from "../MainMenu";

const classNames = {
  container: css`
    position: relative;
    display: grid;
    grid-template: 1fr / 1fr;
    flex-grow: 1;
  `,
  mainMenu: css`
    position: absolute;
    top: 0;
    bottom: 0;
    display: grid;
    grid-template: 1fr / 1fr;
  `,
  backdrop: css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: ${theme.palette.modalBackdrop};
  `,
};

export interface MainMenuLayoutProps {
  children: React.ReactNode;
}

export default function MainMenuLayout({ children }: MainMenuLayoutProps) {
  const { isOpen, toggle } = useMainMenuContext();

  return (
    <div className={cx(classNames.container)}>
      {children}

      {isOpen && (
        <>
          <div
            className={cx(classNames.backdrop)}
            aria-hidden
            onClick={toggle}
          />
          <FocusLock group="main-menu">
            <div className={cx(classNames.mainMenu)}>
              <MainMenu />
            </div>
          </FocusLock>
        </>
      )}
    </div>
  );
}
