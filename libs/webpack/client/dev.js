const getConfig = require("./common");

module.exports = () => {
  const config = getConfig();

  config.mode = "development";
  config.devtool = "source-map";

  return config;
};
