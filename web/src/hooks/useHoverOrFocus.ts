import React, { useState } from "react";
import useEvent from "@react-hook/event";

export default function useHoverOrFocus(
  targetRef: React.RefObject<HTMLElement>
) {
  const [isHoveringOrFocussed, setIsHoveringOrFocussed] = useState(false);

  const handleOnMouseOver = () => setIsHoveringOrFocussed(true);
  const handleOnMouseLeave = () => setIsHoveringOrFocussed(false);
  const handleOnBlur = () => {
    if (!targetRef.current?.matches(":focus-within")) {
      handleOnMouseLeave();
    }
  };

  useEvent(targetRef, "mouseover", handleOnMouseOver);
  useEvent(targetRef, "mouseleave", handleOnMouseLeave);
  useEvent(targetRef, "focus", handleOnMouseOver);
  useEvent(targetRef, "blur", handleOnBlur);

  return isHoveringOrFocussed;
}
