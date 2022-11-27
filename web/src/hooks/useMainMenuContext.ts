import { useContext } from "react";
import { MainMenuContext } from "../contexts/MainMenuContextProvider";

export default function useMainMenuContext() {
  return useContext(MainMenuContext);
}
