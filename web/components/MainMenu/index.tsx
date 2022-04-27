import { css, cx } from "@linaria/core";
import React from "react";
import { Code, Mail } from "react-feather";
import useMainMenuContext from "../../hooks/useMainMenuContext";
import useToast from "../../hooks/useToast";
import theme from "../../theme";
import Menu from "../core/Menu";
import MenuItem from "../core/Menu/parts/MenuItem";
import useCreateInvitation from "./hooks/useCreateInvitation";

const classNames = {
  container: css`
    background-color: ${theme.palette.background0};
    padding: ${theme.spacing["16px"]};
  `,
};

export default function MainMenu() {
  const { addToast } = useToast();
  const createInvitation = useCreateInvitation();
  const { toggle: toggleMainMenu } = useMainMenuContext();

  const handleInviteClicked = async () => {
    const invitation = await createInvitation();
    const inviteLink = `${window.location.origin}/invite/${invitation.id}`;

    await navigator.clipboard.writeText(inviteLink);

    addToast({
      title: "Invite link copied",
    });
    toggleMainMenu();
  };

  return (
    <div className={cx(classNames.container)}>
      <Menu>
        <MenuItem
          icon={<Code />}
          newTab
          href="https://github.com/Xapphire13/PhotoChallenge"
          onClick={toggleMainMenu}
        >
          GitHub
        </MenuItem>
        <MenuItem icon={<Mail />} onClick={handleInviteClicked}>
          Invite
        </MenuItem>
      </Menu>
    </div>
  );
}
