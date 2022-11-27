import React, { useMemo } from "react";
import { UserContext, UserContextType } from "../contexts/UserContextProvider";

export interface MockUserProviderProps {
  children: React.ReactNode;
  user?: UserContextType["user"];
}

export default function MockUserProvider({
  children,
  user = { id: "1", username: "Bart_S", email: "bart@simpson.com" },
}: MockUserProviderProps) {
  const value = useMemo<UserContextType>(
    () => ({ loggedIn: true, user }),
    [user]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
