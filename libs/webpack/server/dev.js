const getConfig = require("./common");

module.exports = () => {
  const config = getConfig();

  config.mode = "development";

  return config;
};
