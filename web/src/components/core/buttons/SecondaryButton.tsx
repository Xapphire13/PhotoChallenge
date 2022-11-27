import { styled } from "@linaria/react";
import theme from "../../../theme";
import BaseButton from "./BaseButton";

export default styled(BaseButton)`
  border: 2px solid ${theme.palette.white};
  color: ${theme.palette.white};
`;
