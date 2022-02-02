const getClientConfig = require("./client");
const { getAppConstants } = require("./utils");
const { getDefinePlugin } = require("./plugins");

module.exports = (options = {}) => {
  const configWeb = getClientConfig();
  const appConstants = getAppConstants(options);
  const definePlugin = getDefinePlugin(appConstants);

  configWeb.plugins.push(definePlugin);

  return [configWeb];
};
