import React, { useEffect, useMemo } from "react";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { gql, useQuery } from "@apollo/client";
import User from "../types/User";

export const UserContext = React.createContext({
  loggedIn: false,
  user: undefined as User | undefined,
});

export interface UserContextProviderProps {
  children: React.ReactNode;
}

const GET_ME_QUERY = gql`
  query GetMe {
    me {
      id
      username
      email
    }
  }
`;

interface GetMeQuery {
  me?: User;
}

export default function UserContextProvider({
  children,
}: UserContextProviderProps) {
  const location = useLocation();
  const loginPageMatch = useMatch("/login");
  const invitePageMatch = useMatch("/invite/:invitationCode");
  const navigate = useNavigate();
  const loggedIn = !!Cookies.get("loggedIn");
  const { data, loading } = useQuery<GetMeQuery>(GET_ME_QUERY, {
    skip: !loggedIn,
  });
  const user = data?.me;

  const contextValue: React.ContextType<typeof UserContext> = useMemo(
    () => ({
      loggedIn,
      user,
    }),
    [loggedIn, user]
  );

  useEffect(() => {
    if (!loginPageMatch && !invitePageMatch && !loggedIn) {
      navigate(
        `/login?redir=${encodeURIComponent(
          location.pathname + location.search
        )}`,
        { replace: true }
      );
    }
  }, [
    invitePageMatch,
    location.pathname,
    location.search,
    loggedIn,
    loginPageMatch,
    navigate,
  ]);

  return (
    <UserContext.Provider value={contextValue}>
      {loggedIn && loading ? undefined : children}
    </UserContext.Provider>
  );
}
