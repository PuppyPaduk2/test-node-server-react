const { DefinePlugin } = require("webpack");
const LoadablePlugin = require("@loadable/webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const NodemonPlugin = require("nodemon-webpack-plugin");

module.exports = {
  definePlugin: (options) => {
    return new DefinePlugin(options);
  },
  loadablePlugin: (options) => {
    return new LoadablePlugin(options);
  },
  copyPlugin: (options) => {
    return new CopyPlugin(options);
  },
  moduleFederation: (options) => {
    return new ModuleFederationPlugin({
      // name: "core",
      filename: "remote.js",
      remotes: {},
      exposes: {},
      shared: {},
      ...options,
    });
  },
  nodemon: (options) => {
    return new NodemonPlugin({
      script: `./dist/server/index.js`,
      watch: `./dist/server`,
      ext: "js,njk,json,ts,tsx",
      ...options,
    });
  },
};
