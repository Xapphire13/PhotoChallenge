import { css, cx } from "@linaria/core";
import React, { useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather";
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
  currentGroup: { id: string; name: string };
  futureChallengeCount: number | "--";
}

export default function GroupDetails({
  futureChallengeCount,
  currentGroup,
}: GroupDetailsProps) {
  const [groupPickerOpen, setGroupPickerOpen] = useState(false);
  const [enableGroups] = useFeature("groups");
  const pickerButtonRef = useRef<HTMLDivElement>(null);

  const handleGroupPickerToggled = (ev: React.MouseEvent) => {
    setGroupPickerOpen((prev) => !prev);

    ev.stopPropagation();
  };

  const handleCloseGroupPicker = () => setGroupPickerOpen(false);

  return (
    <div className={cx(classNames.container)}>
      {enableGroups && (
        <div ref={pickerButtonRef}>
          <SmallIconButton
            accessibilityLabel=""
            aria-expanded={groupPickerOpen}
            onClick={handleGroupPickerToggled}
          >
            <div className={cx(classNames.groupName)}>
              #{currentGroup.name}
              {groupPickerOpen ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </div>
          </SmallIconButton>
        </div>
      )}
      <div>
        <span className={cx(classNames.colorText)}>{futureChallengeCount}</span>{" "}
        challenges in the queue
      </div>

      <GroupPicker
        currentGroup={currentGroup}
        isOpen={groupPickerOpen}
        onClose={handleCloseGroupPicker}
        anchorElement={pickerButtonRef}
      />
    </div>
  );
}
