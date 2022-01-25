const getAppClientConfig = require("../../webpack/app.client");
const getAppServerConfig = require("../../webpack/app.server");
const { getCopyPlugin, getNodemonPlugin } = require("../../webpack/plugins");
const { resolveCwd } = require("../../webpack/utils");

module.exports = (options = {}) => {
  const clientConfig = getAppClientConfig(options);
  const serverConfig = getAppServerConfig(options);
  const copyPlugin = getCopyPlugin({
    patterns: [
      {
        from: resolveCwd("./assets"),
        to: resolveCwd("./dist/assets"),
      },
    ],
  });
  const nodemonPlugin = getNodemonPlugin({
    script: `./dist/server/index.js`,
    watch: `./dist/server`,
  });

  clientConfig.plugins.push(copyPlugin);
  serverConfig.plugins.push(nodemonPlugin);

  return [clientConfig, serverConfig];
};
