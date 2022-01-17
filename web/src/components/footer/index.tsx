import { css, cx } from "@linaria/core";
import React from "react";
import theme from "../../theme";
import TertiaryButton from "../core/buttons/TertiaryButton";
import InlineList from "../core/InlineList";
import TextLink from "../core/TextLink";

const classNames = {
  container: css`
    display: flex;
    justify-content: center;
    margin: ${theme.spacing["8px"]};
  `,
};

export default function Footer() {
  return (
    <div className={cx(classNames.container)}>
      <InlineList>
        <TextLink newTab href="https://github.com/Xapphire13/PhotoChallenge">
          GitHub
        </TextLink>
        <TertiaryButton>Invite</TertiaryButton>
      </InlineList>
    </div>
  );
}
