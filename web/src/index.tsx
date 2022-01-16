import "modern-normalize/modern-normalize.css";
import React from "react";
import { css } from "@linaria/core";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import theme from "./theme";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import SubmitChallengePage from "./components/SubmitChallengePage";

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
        background: ${theme.palette.background};
        color: ${theme.palette.white};
      }

      button,
      input,
      optgroup,
      select,
      textarea {
        ${theme.typography.base.medium}
      }
    }
  `,
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/new-challenge" element={<SubmitChallengePage />} />
      </Routes>
    </BrowserRouter>
  );
}

const appRoot = document.createElement("div");
appRoot.id = "app-root";
document.body.appendChild(appRoot);

ReactDOM.render(<App />, appRoot);
