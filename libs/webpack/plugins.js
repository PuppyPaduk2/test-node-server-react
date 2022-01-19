const { DefinePlugin } = require("webpack");
const LoadablePlugin = require("@loadable/webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { resolve: pathResolve } = require("path");
const { ModuleFederationPlugin } = require("webpack").container;

const resolvePathCwd = (path) => pathResolve(process.cwd(), path);

module.exports = {
  definePlugin: (options) =>
    new DefinePlugin({
      __APP_URL__: JSON.stringify("http://localhost:3000"),
      ...options,
    }),
  loadablePlugin: () => new LoadablePlugin(),
  copyPlugin: (options) =>
    new CopyPlugin({
      patterns: [
        {
          from: resolvePathCwd("./src/public"),
          to: resolvePathCwd("./dist/public"),
        },
      ],
      ...options,
    }),
  moduleFederation: (options) =>
    new ModuleFederationPlugin({
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
    }),
};
