const { DefinePlugin } = require("webpack");
const LoadablePlugin = require("@loadable/webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { resolve: pathResolve } = require("path");
const { ModuleFederationPlugin } = require("webpack").container;
const NodemonPlugin = require("nodemon-webpack-plugin");

const resolvePathCwd = (path) => pathResolve(process.cwd(), path);

module.exports = {
  definePlugin: (options) => {
    return new DefinePlugin(options);
  },
  loadablePlugin: (options) => {
    return new LoadablePlugin(options);
  },
  copyPlugin: (options) => {
    return new CopyPlugin({
      patterns: [
        {
          from: resolvePathCwd("./src/public"),
          to: resolvePathCwd("./dist/public"),
        },
      ],
      ...options,
    });
  },
  moduleFederation: (options) => {
    return new ModuleFederationPlugin({
      // name: "core",
      filename: "remote.js",
      remotes: {},
      exposes: {},
      shared: {
        react: {
          eager: true,
          singleton: true,
          requiredVersion: "^17.0.2",
        },
      },
      ...options,
    });
  },
  nodemon: (options) => {
    return new NodemonPlugin({
      // script: `./dist/server/index.js`,
      watch: `./dist/server`,
      ext: "js,njk,json,ts,tsx",
      ...options,
    });
  },
};
