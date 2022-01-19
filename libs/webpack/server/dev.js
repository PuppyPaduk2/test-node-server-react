const NodemonPlugin = require("nodemon-webpack-plugin");
const getConfig = require("./common");

module.exports = () => {
  const config = getConfig();

  config.mode = "development";

  config.plugins.push(
    new NodemonPlugin({
      script: `./dist/server/index.js`,
      watch: `./dist/server`,
      ext: "js,njk,json,ts,tsx",
    })
  );

  return config;
};
