import { css, cx } from "@linaria/core";
import React, { useState } from "react";
import { ChevronDown } from "react-feather";
import useFeature from "../../hooks/useFeature";
import theme from "../../theme";
import SmallIconButton from "../core/buttons/SmallIconButton";
import GroupPicker from "./GroupPicker";

const classNames = {
  container: css`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  `,
  groupName: css`
    display: flex;
    ${theme.typography.base.small}
    align-items: center;
    gap: ${theme.spacing["4px"]};
  `,
  colorText: css`
    color: ${theme.palette.primaryText};
  `,
};

export interface GroupDetailsProps {
  groupName: string;
  futureChallengeCount: number | "--";
}

export default function GroupDetails({
  futureChallengeCount,
  groupName,
}: GroupDetailsProps) {
  const [groupPickerOpen, setGroupPickerOpen] = useState(false);
  const [enableGroups] = useFeature("groups");

  const handleGroupPickerToggled = () => {
    setGroupPickerOpen((prev) => !prev);
  };

  const handleCloseGroupPicker = () => setGroupPickerOpen(false);

  return (
    <div className={cx(classNames.container)}>
      {enableGroups && (
        <SmallIconButton
          accessibilityLabel=""
          aria-expanded={groupPickerOpen}
          onClick={handleGroupPickerToggled}
        >
          <div className={cx(classNames.groupName)}>
            {groupName}
            <ChevronDown size={16} />
          </div>
        </SmallIconButton>
      )}
      <div>
        <span className={cx(classNames.colorText)}>{futureChallengeCount}</span>{" "}
        challenges in the queue
      </div>

      <GroupPicker
        currentGroup={groupName}
        isOpen={groupPickerOpen}
        onClose={handleCloseGroupPicker}
      />
    </div>
  );
}
