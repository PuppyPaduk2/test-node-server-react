const getClientConfig = require("./webpack/client");
const getServerConfig = require("./webpack/server");
const { getAppConstants, resolveCwd } = require("./webpack/utils");
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
        from: resolveCwd("./src/app/assets"),
        to: resolveCwd("./dist/assets"),
      },
    ],
  });

  clientConfig.entry.index = resolveCwd("./src/app/client/index");
  clientConfig.resolve.modules.push(resolveCwd("./src/app/client"));
  clientConfig.output.path = resolveCwd("./dist/client");
  clientConfig.output.publicPath = "/client/";
  clientConfig.plugins.push(definePlugin);

  serverConfig.entry.index = resolveCwd("./src/app/server/index");
  serverConfig.resolve.modules.push(resolveCwd("./src/app/server"));
  serverConfig.output.path = resolveCwd("./dist/server");
  serverConfig.plugins.push(definePlugin, copyPlugin, nodemonPlugin);

  return [clientConfig, serverConfig];
};

module.exports = function (options = {}) {
  return getConfig(options);
};
