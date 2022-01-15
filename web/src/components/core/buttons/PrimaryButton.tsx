import { styled } from "@linaria/react";
import theme from "../../../theme";
import BaseButton, { classNames } from "./BaseButton";

export default styled(BaseButton)`
  background: ${theme.palette.primary};

  :disabled {
    background: ${theme.palette.faint};
  }
`;
