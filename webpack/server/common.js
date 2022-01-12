const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const config = require("../common");

config.target = "node";

config.entry = {
  index: "./src/server/index.ts",
};

config.output = {
  path: path.resolve(process.cwd(), "./dist/server"),
  filename: "[name].js",
};

config.resolve = {
  extensions: [".tsx", ".ts", ".js"],
  modules: [
    path.resolve(process.cwd(), "./src/server"),
    path.resolve(process.cwd(), "./node_modules"),
  ],
};

config.externals = {
  http: "commonjs2 http",
  path: "commonjs2 path",
  fs: "commonjs2 fs",
  "path-to-regexp": "commonjs2 path-to-regexp",
  "mime-types": "commonjs2 mime-types",
};

config.plugins.push(
  new CopyPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, "../../src/public"),
        to: path.resolve(__dirname, "../../dist/public"),
      },
    ],
  })
);

module.exports = config;
