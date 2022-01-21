const getClientConfig = require("./webpack/client");
const getServerConfig = require("./webpack/server");
const { getAppConstants } = require("./webpack/utils");
const { definePlugin: getDefinePlugin, nodemon } = require("./webpack/plugins");

const getConfig = (options = {}) => {
  const clientConfig = getClientConfig();
  const serverConfig = getServerConfig();
  const appConstants = getAppConstants(options);
  const definePlugin = getDefinePlugin(appConstants);

  clientConfig.plugins.push(definePlugin);
  serverConfig.plugins.push(definePlugin, nodemon());

  return [clientConfig, serverConfig];
};

module.exports = (options = {}) => getConfig(options);
