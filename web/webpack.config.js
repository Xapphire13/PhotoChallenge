/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";
const proxyProd = process.env.PROD_PROXY === "true";
const proxyHost = proxyProd
  ? "https://photo-challenge.xapphire13.com"
  : "http://localhost:5001";

/** @type {import("webpack").Configuration}  */
const config = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devServer: {
    // open: true,
    host: "0.0.0.0",
    proxy: [
      {
        context: ["/login"],
        target: proxyHost,
        bypass:
          /** @type {import("webpack-dev-server").ByPass} */
          (req) => {
            if (req.method === "GET") {
              return "/login";
            }

            return null;
          },
        changeOrigin: proxyProd,
      },
      {
        context: ["/graphql"],
        target: proxyHost,
        changeOrigin: proxyProd,
      },
      {
        context: ["/upload"],
        target: proxyHost,
        changeOrigin: proxyProd,
      },
    ],
  },
  devtool: isProduction ? false : "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      title: "Photo Challenge",
      publicPath: "/",
    }),
    new MiniCssExtractPlugin({
      filename: isProduction ? "styles-[contenthash].css" : "styles.css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        exclude: ["/node_modules/"],
        use: [
          { loader: "babel-loader" },
          {
            loader: "@linaria/webpack-loader",
            options: {
              sourceMap: !isProduction,
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: !isProduction,
            },
          },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  optimization: {
    minimizer: ["...", new CssMinimizerPlugin()],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
