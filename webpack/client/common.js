const path = require("path");
const LoadablePlugin = require("@loadable/webpack-plugin");
const config = require("../common")();

config.target = "web";

config.entry = {
  index: "./src/client/index",
};

config.output = {
  path: path.resolve(process.cwd(), "./dist/client"),
  filename: "[name].js",
  publicPath: "/client/",
};

config.resolve = {
  extensions: [".tsx", ".ts", ".js"],
  modules: [
    path.resolve(process.cwd(), "./src/client"),
    path.resolve(process.cwd(), "./node_modules"),
  ],
};

config.plugins.push(new LoadablePlugin());

module.exports = config;
