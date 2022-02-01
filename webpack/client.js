const getCommonConfig = require("./common");
const { getBabelLoader } = require("./loaders");
const { getTsJsRule, getCssSassRule } = require("./module-rules");
const { resolveCwd, resolveDirname } = require("./utils");
const { getLoadablePlugin } = require("./plugins");
const nodeExternals = require("webpack-node-externals");

const getConfig = (options = {}) => {
  if (!options.target) {
    throw "Set target for client webpack config";
  }

  const { target } = options;
  const config = getCommonConfig();

  config.target = target;
  config.resolve.modules.push(
    resolveCwd("./client"),
    resolveCwd("./node_modules")
  );
  config.output.publicPath = "/client/";
  config.module.rules = [
    getTsJsRule({
      use: getBabelLoader({
        options: {
          configFile: resolveDirname("./client.babel.config.js"),
          caller: { target },
        },
      }),
    }),
    getCssSassRule(),
  ];
  config.plugins.push(getLoadablePlugin());

  return config;
};

module.exports = () => {
  const configWeb = getConfig({ target: "web" });

  configWeb.entry.index = resolveCwd("./client/index-web");
  configWeb.output.path = resolveCwd("./dist/client-web");

  const configNode = getConfig({ target: "async-node" });

  configNode.entry.index = resolveCwd("./client/bootstrap-node");
  configNode.output.path = resolveCwd("./dist/client-node");
  configNode.output.libraryTarget = "commonjs2";
  configNode.externals = ["@loadable/component", nodeExternals()];

  return [configWeb, configNode];
};
