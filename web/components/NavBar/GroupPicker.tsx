import { css, cx } from "@linaria/core";
import React from "react";
import { ChevronUp } from "react-feather";
import { useNavigate } from "react-router";
import theme from "../../theme";
import { getGroupLandingPagePath } from "../../utils/paths";
import SmallIconButton from "../core/buttons/SmallIconButton";
import Menu from "../core/Menu";
import Divider from "../core/Menu/parts/Divider";
import MenuItem from "../core/Menu/parts/MenuItem";
import PopOver from "../core/modal/PopOver";
import useGroupsForUser from "./hooks/useGroupsForUser";

const classNames = {
  groupName: css`
    display: flex;
    ${theme.typography.base.small}
    align-items: center;
    gap: ${theme.spacing["4px"]};
  `,
  container: css`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  `,
};

export interface GroupPickerProps {
  currentGroup: { id: string; name: string };
  isOpen: boolean;
  onClose: () => void;
  anchorElement: React.RefObject<HTMLElement>;
}

export default function GroupPicker({
  isOpen,
  onClose,
  currentGroup,
  anchorElement,
}: GroupPickerProps) {
  const { groups, fetching } = useGroupsForUser();
  const navigate = useNavigate();

  const handleGroupClicked = (groupId: string) => () => {
    onClose();
    navigate(getGroupLandingPagePath(groupId));
  };

  return (
    <PopOver isOpen={isOpen} onClose={onClose} anchorElement={anchorElement}>
      <div className={cx(classNames.container)}>
        {fetching && "Loading..."}

        {!fetching && (
          <Menu>
            {groups
              .filter(({ id }) => id !== currentGroup.id)
              .map(({ id, name }) => (
                <MenuItem key={id} onClick={handleGroupClicked(id)}>
                  #{name}
                </MenuItem>
              ))}
          </Menu>
        )}
      </div>
    </PopOver>
  );
}
