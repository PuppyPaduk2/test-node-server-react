const getClientConfig = require("./client");
const { getAppConstants } = require("./utils");
const { getDefinePlugin } = require("./plugins");

module.exports = (options = {}) => {
  const config = getClientConfig();
  const appConstants = getAppConstants(options);
  const definePlugin = getDefinePlugin(appConstants);

  config.plugins.push(definePlugin);

  return config;
};
