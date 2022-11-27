import { useWindowSize } from "@react-hook/window-size";
import { LARGE, MEDIUM, SMALL } from "../theme/breakpoints";

export default function useBreakpoint() {
  const [width] = useWindowSize();

  return {
    mediumAndAbove: width >= SMALL,
    largeAndAbove: width >= MEDIUM,
    extraLargeAndAbove: width >= LARGE,
  };
}
