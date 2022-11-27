import { useContext } from "react";
import { UserContext } from "../contexts/UserContextProvider";

export default function useUserContext() {
  return useContext(UserContext);
}
