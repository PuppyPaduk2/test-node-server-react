const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { resolveDirname } = require("./utils");

module.exports = {
  getBabelLoader: (settings = {}) => ({
    loader: "babel-loader",
    options: {
      configFile: resolveDirname("./babel.config.js"),
    },
    ...settings,
  }),
  getMiniCssExtractLoader: () => MiniCssExtractPlugin.loader,
  getCssLoader: (settings = {}) => ({
    loader: "css-loader",
    options: {
      importLoaders: 1,
      modules: {
        exportLocalsConvention: "camelCase",
        localIdentName: "[hash:base64:5]",
      },
    },
    ...settings,
  }),
  getPostcssLoader: (settings = {}) => ({
    loader: "postcss-loader",
    options: {
      postcssOptions: {
        ident: "postcss",
      },
    },
    ...settings,
  }),
  getSassLoader: (settings = {}) => ({
    loader: "sass-loader",
    ...settings,
  }),
};
