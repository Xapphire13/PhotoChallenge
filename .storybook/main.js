const webpackConfig = require("../webpack.config.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  stories: [
    "../web/**/__tests__/*.stories.mdx",
    "../web/**/__tests__/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  webpackFinal: async (config) => {
    const custom = webpackConfig();

    return {
      ...config,
      plugins: [...config.plugins, new MiniCssExtractPlugin()],
      module: { ...config.module, rules: custom.module.rules },
    };
  },
};
