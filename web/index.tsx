import "modern-normalize/modern-normalize.css";
import React from "react";
import { css } from "@linaria/core";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import theme from "./theme";
import ToastProvider from "./contexts/ToastProvider";
import UserContextProvider from "./contexts/UserContextProvider";
import Routes from "./routes";

export const classNames = {
  globals: css`
    :global() {
      @import url("https://fonts.googleapis.com/css2?family=Offside&display=swap");

      html,
      body,
      #app-root {
        height: 100%;
      }

      body {
        ${theme.typography.base.medium}
        font-family: Offside, sans-serif;
        background: ${theme.palette.background0};
        color: ${theme.palette.white};
      }

      button,
      input,
      optgroup,
      select,
      textarea {
        ${theme.typography.base.medium}
      }

      input,
      textarea {
        ::placeholder {
          color: ${theme.palette.faint};
        }
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        ${theme.typography.title.medium}
        margin: 0 0 ${theme.spacing["12px"]};
      }

      p {
        margin: 0;
      }
    }
  `,
};

const client = new ApolloClient({
  uri: `${window.location.protocol}//${window.location.host}/graphql`,
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <ToastProvider>
        <BrowserRouter>
          <UserContextProvider>
            <Routes />
          </UserContextProvider>
        </BrowserRouter>
      </ToastProvider>
    </ApolloProvider>
  );
}

const appRoot = document.createElement("div");
appRoot.id = "app-root";
document.body.appendChild(appRoot);

ReactDOM.render(<App />, appRoot);
