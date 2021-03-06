import React, { useEffect, useMemo } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { gql, useQuery } from "urql";
import User from "../types/User";
import { LOGIN_PAGE } from "../utils/paths";

export const UserContext = React.createContext({
  loggedIn: false,
  user: undefined as User | undefined,
});

export type UserContextType = React.ContextType<typeof UserContext>;

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
  const [{ data, error }] = useQuery<GetMeQuery>({
    query: GET_ME_QUERY,
    pause: !loggedIn,
  });
  const user = data?.me;

  useEffect(() => {
    if (
      user == null &&
      error &&
      error.graphQLErrors.some(({ message }) =>
        message.includes("Unauthorized")
      )
    ) {
      Cookies.remove("loggedIn");
      navigate(
        `${LOGIN_PAGE}?redir=${encodeURIComponent(window.location.pathname)}`
      );
    }
  }, [error, navigate, user]);

  const contextValue = useMemo<UserContextType>(
    () => ({
      loggedIn,
      user,
    }),
    [loggedIn, user]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
