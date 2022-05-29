import { css, cx } from "@linaria/core";
import React from "react";
import { ChevronUp } from "react-feather";
import theme from "../../theme";
import SmallIconButton from "../core/buttons/SmallIconButton";
import Menu from "../core/Menu";
import Divider from "../core/Menu/parts/Divider";
import MenuItem from "../core/Menu/parts/MenuItem";
import PopOver from "../core/modal/PopOver";

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
  currentGroup: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function GroupPicker({
  isOpen,
  onClose,
  currentGroup,
}: GroupPickerProps) {
  return (
    <PopOver isOpen={isOpen} onClose={onClose}>
      <div className={cx(classNames.container)}>
        <SmallIconButton
          accessibilityLabel=""
          aria-expanded={isOpen}
          onClick={onClose}
        >
          <div className={cx(classNames.groupName)}>
            {currentGroup}
            <ChevronUp size={16} />
          </div>
        </SmallIconButton>
        <Menu>
          <Divider />
          <MenuItem>New group</MenuItem>
        </Menu>
      </div>
    </PopOver>
  );
}
