import React from "react";
import "modern-normalize/modern-normalize.css";
import { css } from "@linaria/core";
import theme from "../web/theme";

export const classNames = {
  globals: css`
    :global() {
      @import url("https://fonts.googleapis.com/css2?family=Offside&display=swap");

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

export default function RenderWrapper(Story) {
  return <Story />;
}
