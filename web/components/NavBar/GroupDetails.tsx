import { css, cx } from "@linaria/core";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import { ENABLE_GROUPS } from "../../constants/features";
import theme from "../../theme";
import SmallIconButton from "../core/buttons/SmallIconButton";

const classNames = {
  container: css`
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

  const handleGroupPickerToggled = () => {
    setGroupPickerOpen((prev) => !prev);
  };

  return (
    <div className={cx(classNames.container)}>
      {ENABLE_GROUPS && (
        <SmallIconButton
          accessibilityLabel=""
          aria-expanded={groupPickerOpen}
          onClick={handleGroupPickerToggled}
        >
          <div className={cx(classNames.groupName)}>
            {groupName}
            {groupPickerOpen ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </div>
        </SmallIconButton>
      )}
      <div>
        <span className={cx(classNames.colorText)}>{futureChallengeCount}</span>{" "}
        challenges in the queue
      </div>
    </div>
  );
}
