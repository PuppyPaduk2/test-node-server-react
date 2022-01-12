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

config.externals = {
  http: "commonjs2 http",
};

module.exports = config;
