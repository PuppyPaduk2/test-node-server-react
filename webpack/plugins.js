const { DefinePlugin } = require("webpack");
const LoadablePlugin = require("@loadable/webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const NodemonPlugin = require("nodemon-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  getDefinePlugin: (options) => {
    return new DefinePlugin(options);
  },
  getLoadablePlugin: (options) => {
    return new LoadablePlugin(options);
  },
  getCopyPlugin: (options) => {
    return new CopyPlugin(options);
  },
  getModuleFederationPlugin: (options) => {
    return new ModuleFederationPlugin({
      // name: "core",
      filename: "remote.js",
      remotes: {},
      exposes: {},
      shared: {},
      ...options,
    });
  },
  getNodemonPlugin: (options) => {
    return new NodemonPlugin({
      ext: "js,njk,json,ts,tsx",
      ...options,
    });
  },
  getMiniCssExtractPlugin: () => {
    return new MiniCssExtractPlugin({
      linkType: "text/css",
    });
  },
};
