import { css, cx } from "@linaria/core";
import React from "react";
import useToast from "../../hooks/useToast";
import theme from "../../theme";
import TertiaryButton from "../core/buttons/TertiaryButton";
import InlineList from "../core/InlineList";
import useCreateInvitation from "./hooks/useCreateInvitation";

const classNames = {
  container: css`
    display: flex;
    justify-content: center;
    margin: ${theme.spacing["8px"]};
  `,
};

export default function Footer() {
  const { addToast } = useToast();
  const createInvitation = useCreateInvitation();

  const handleInviteClicked = async () => {
    const invitation = await createInvitation();
    const inviteLink = `${window.location.origin}/invite/${invitation.id}`;

    await navigator.clipboard.writeText(inviteLink);
    addToast({
      title: "Invite link copied",
    });
  };

  return (
    <div className={cx(classNames.container)}>
      <InlineList>
        <TertiaryButton
          newTab
          href="https://github.com/Xapphire13/PhotoChallenge"
        >
          GitHub
        </TertiaryButton>
        <TertiaryButton onClick={handleInviteClicked}>Invite</TertiaryButton>
      </InlineList>
    </div>
  );
}
