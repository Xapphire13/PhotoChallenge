import { styled } from "@linaria/react";
import React from "react";
import theme from "../../../theme";
import BaseButton, { BaseButtonProps } from "./BaseButton";

const StyledBaseButton = styled(BaseButton)`
  display: flex;

  &:hover {
    background-color: ${theme.palette.background1};
  }
`;

export interface IconButtonProps extends BaseButtonProps {
  accessibilityLabel: string;
  children: React.ReactElement;
}

export default function IconButton(props: IconButtonProps) {
  return <StyledBaseButton {...props} />;
}
