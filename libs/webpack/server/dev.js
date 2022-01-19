const NodemonPlugin = require("nodemon-webpack-plugin");
const config = require("./common");

config.mode = "development";

config.plugins.push(
  new NodemonPlugin({
    script: `./dist/server/index.js`,
    watch: `./dist/server`,
    ext: "js,njk,json,ts,tsx",
  })
);

module.exports = config;
