import { css, cx } from "@linaria/core";
import React from "react";
import { v4 as uuid } from "uuid";
import useToast from "../../hooks/useToast";
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
  const { addToast } = useToast();

  const handleInviteClicked = async () => {
    const inviteId = uuid().split("-")[0]; // TODO, generate backend
    const inviteLink = `${window.location.origin}/invite/${inviteId}`;

    await navigator.clipboard.writeText(inviteLink);
    addToast({
      title: "Invite link copied!",
    });
  };

  return (
    <div className={cx(classNames.container)}>
      <InlineList>
        <TextLink newTab href="https://github.com/Xapphire13/PhotoChallenge">
          GitHub
        </TextLink>
        <TertiaryButton onClick={handleInviteClicked}>Invite</TertiaryButton>
      </InlineList>
    </div>
  );
}
