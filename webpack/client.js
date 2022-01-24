const getConfig = require("./common");

module.exports = () => {
  const config = getConfig();

  config.target = "web";

  return config;
};
