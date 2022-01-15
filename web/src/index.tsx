import "modern-normalize/modern-normalize.css";
import React from "react";
import { css } from "@linaria/core";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import theme from "./theme";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";

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
        font-family: Offside, sans-serif;
        background: ${theme.palette.background};
        color: ${theme.palette.white};
      }
    }
  `,
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

const appRoot = document.createElement("div");
appRoot.id = "app-root";
document.body.appendChild(appRoot);

ReactDOM.render(<App />, appRoot);
