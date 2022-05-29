import RenderWrapper from "./RenderWrapper";

const theme = require("../web/theme/index");

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: "dark",
    values: [
      {
        name: "dark",
        value: theme.default.palette.background0,
      },
      {
        name: "light",
        value: "#FFF",
      },
    ],
  },
};

export const decorators = [RenderWrapper];
