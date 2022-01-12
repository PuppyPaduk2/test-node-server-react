const path = require("path");
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
};

module.exports = config;
