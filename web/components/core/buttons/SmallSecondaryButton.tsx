import { styled } from "@linaria/react";
import theme from "../../../theme";
import BaseButton from "./BaseButton";

export default styled(BaseButton)`
  ${theme.typography.base.small}
  padding: ${theme.spacing["4px"]};
  border: 2px solid ${theme.palette.white};
  background: none;
  color: ${theme.palette.white};
`;
