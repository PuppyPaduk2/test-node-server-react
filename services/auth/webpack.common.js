const getAppClientConfig = require("../../webpack/app.client");
const getAppServerConfig = require("../../webpack/app.server");
const {
  getNodemonPlugin,
  getModuleFederationPlugin,
} = require("../../webpack/plugins");

const HTMLWebpackPlugin = require("html-webpack-plugin");

const getClientConfig = (options = {}) => {
  const [config] = getAppClientConfig(options);
  const moduleFederation = getModuleFederationPlugin({
    name: "auth",
    shared: {
      react: { singleton: true },
      "react-rom": { singleton: true },
    },
    exposes: {
      "./App": "./exposes/app.ts",
    },
  });

  config.output.publicPath = "/remotes/auth/client/";
  config.plugins.push(moduleFederation);

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
