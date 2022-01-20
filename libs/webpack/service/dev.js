const getConfig = require("./common");

module.exports = (options) => {
  return getConfig(options).map((config) => {
    config.mode = "development";

    return config;
  });
};
