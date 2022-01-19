import React, { useEffect, useMemo } from "react";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const UserContext = React.createContext({
  loggedIn: false,
});

export interface UserContextProviderProps {
  children: React.ReactNode;
}

export default function UserContextProvider({
  children,
}: UserContextProviderProps) {
  const location = useLocation();
  const loginPageMatch = useMatch("/login");
  const navigate = useNavigate();
  const loggedIn = !!Cookies.get("loggedIn");

  const contextValue: React.ContextType<typeof UserContext> = useMemo(
    () => ({
      loggedIn,
    }),
    [loggedIn]
  );

  useEffect(() => {
    if (!loginPageMatch && !loggedIn) {
      navigate(
        `/login?redir=${encodeURIComponent(
          location.pathname + location.search
        )}`,
        { replace: true }
      );
    }
  }, [location.pathname, location.search, loggedIn, loginPageMatch, navigate]);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
