const getServerConfig = require("./server");
const { getAppConstants } = require("./utils");
const { getDefinePlugin } = require("./plugins");

module.exports = (options = {}) => {
  const config = getServerConfig();
  const appConstants = getAppConstants(options);
  const definePlugin = getDefinePlugin(appConstants);

  config.plugins.push(definePlugin);

  return config;
};
