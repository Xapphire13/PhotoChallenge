import React, { useEffect, useMemo } from "react";
import Cookies from "js-cookie";
import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router";
import User from "../types/User";
import { LOGIN_PAGE } from "../constants/paths";

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
  const loggedIn = !!Cookies.get("loggedIn");
  const navigate = useNavigate();
  const { data, loading } = useQuery<GetMeQuery>(GET_ME_QUERY, {
    skip: !loggedIn,
  });
  const user = data?.me;

  useEffect(() => {
    if (loggedIn && !loading && user == null) {
      Cookies.remove("loggedIn");
      navigate(
        `${LOGIN_PAGE}?redir=${encodeURIComponent(window.location.pathname)}`
      );
    }
  }, [loading, loggedIn, navigate, user]);

  const contextValue: React.ContextType<typeof UserContext> = useMemo(
    () => ({
      loggedIn,
      user,
    }),
    [loggedIn, user]
  );

  return (
    <UserContext.Provider value={contextValue}>
      {loggedIn && loading ? undefined : children}
    </UserContext.Provider>
  );
}
