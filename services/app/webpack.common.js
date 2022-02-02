const getAppClientConfig = require("../../webpack/app.client");
const getAppServerConfig = require("../../webpack/app.server");
const { getCopyPlugin, getNodemonPlugin } = require("../../webpack/plugins");
const { resolveCwd, resolveDirname } = require("../../webpack/utils");

const HTMLWebpackPlugin = require("html-webpack-plugin");

const getClientConfig = (options = {}) => {
  const [config] = getAppClientConfig(options);
  const html = new HTMLWebpackPlugin({
    template: resolveCwd("./public/index.html"),
    filename: resolveCwd("./dist/public/index.html"),
    minify: false,
  });

  config.plugins.push(html);

  return [config];
};

const getServerConfig = (options = {}) => {
  const [config] = getAppServerConfig(options);
  const nodemonPlugin = getNodemonPlugin({
    script: `./dist/server/index.js`,
    watch: `./dist`,
  });

  config.plugins.push(nodemonPlugin);

  return [config];
};

module.exports = (options = {}) => {
  const [clientConfig] = getClientConfig(options);
  const [serverConfig] = getServerConfig(options);

  return [clientConfig, serverConfig];
};
