const getClientConfig = require("./client");
const { getAppConstants } = require("./utils");
const { getDefinePlugin } = require("./plugins");

module.exports = (options = {}) => {
  const [configWeb, configNode] = getClientConfig();
  const appConstants = getAppConstants(options);
  const definePlugin = getDefinePlugin(appConstants);

  configWeb.plugins.push(definePlugin);
  configNode.plugins.push(definePlugin);

  return [configWeb, configNode];
};
