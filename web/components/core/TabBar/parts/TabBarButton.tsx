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
`;

export interface TabBarButtonProps extends BaseButtonProps {
  isActive?: boolean;
}

export default function TabBarButton({
  isActive,
  className,
  ...rest
}: TabBarButtonProps) {
  return (
    <StyledBaseButton
      {...rest}
      className={cx(className, isActive && classNames.active)}
    />
  );
}
