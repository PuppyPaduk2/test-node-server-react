const getConfig = require("./common");

module.exports = () => {
  const config = getConfig();

  config.target = "node";

  return config;
};
