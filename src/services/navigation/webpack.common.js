const getAppServerConfig = require("../../../webpack/app.server");
const { getNodemonPlugin } = require("../../../webpack/plugins");

module.exports = (options = {}) => {
  const serverConfig = getAppServerConfig(options);
  const nodemonPlugin = getNodemonPlugin({
    script: `./dist/server/index.js`,
    watch: `./dist/server`,
  });

  serverConfig.plugins.push(nodemonPlugin);

  return [serverConfig];
};
