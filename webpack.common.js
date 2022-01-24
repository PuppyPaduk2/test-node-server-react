const getClientConfig = require("./webpack/client");
const getServerConfig = require("./webpack/server");
const { getAppConstants, resolvePathCwd } = require("./webpack/utils");
const {
  getDefinePlugin,
  getNodemonPlugin,
  getCopyPlugin,
} = require("./webpack/plugins");

const getConfig = (options = {}) => {
  const clientConfig = getClientConfig();
  const serverConfig = getServerConfig();
  const appConstants = getAppConstants(options);
  const definePlugin = getDefinePlugin(appConstants);
  const nodemonPlugin = getNodemonPlugin({
    script: `./dist/server/index.js`,
    watch: `./dist/server`,
  });
  const copyPlugin = getCopyPlugin({
    patterns: [
      {
        from: resolvePathCwd("./src/app/assets"),
        to: resolvePathCwd("./dist/assets"),
      },
    ],
  });

  clientConfig.entry.index = resolvePathCwd("./src/app/client/index");
  clientConfig.resolve.modules.push(resolvePathCwd("./src/app/client"));
  clientConfig.output.path = resolvePathCwd("./dist/client");
  clientConfig.output.publicPath = "/client/";
  clientConfig.plugins.push(definePlugin);

  serverConfig.entry.index = resolvePathCwd("./src/app/server/index");
  serverConfig.resolve.modules.push(resolvePathCwd("./src/app/server"));
  serverConfig.output.path = resolvePathCwd("./dist/server");
  serverConfig.plugins.push(definePlugin, copyPlugin, nodemonPlugin);

  return [clientConfig, serverConfig];
};

module.exports = function (options = {}) {
  return getConfig(options);
};
