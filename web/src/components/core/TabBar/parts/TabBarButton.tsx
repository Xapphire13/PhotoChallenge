import React from "react";
import { styled } from "@linaria/react";
import { css, cx } from "@linaria/core";
import BaseButton, { BaseButtonProps } from "../../buttons/BaseButton";
import theme from "../../../../theme";

const classNames = {
  active: css`
    color: ${theme.palette.primary};
  `,
};

const StyledBaseButton = styled(BaseButton)`
  flex-grow: 1;
  flex-basis: 0px;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing["4px"]};
  ${theme.typography.base.small}
  align-items: center;
`;

export type TabBarButtonProps = {
  label: string;
  icon: React.ComponentType;
  isActive?: boolean;
} & Omit<BaseButtonProps, "children">;

export default function TabBarButton({
  isActive,
  className,
  icon: Icon,
  label,
  ...rest
}: TabBarButtonProps) {
  return (
    <StyledBaseButton
      {...rest}
      className={cx(className, isActive && classNames.active)}
    >
      <Icon />
      <div>{label}</div>
    </StyledBaseButton>
  );
}
