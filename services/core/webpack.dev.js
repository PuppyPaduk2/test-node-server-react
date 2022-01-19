const { resolve: pathResolve } = require("path");
const getClientDevConfig = require("../../libs/webpack/client/dev");
const getServerDevConfig = require("../../libs/webpack/server/dev");
const { moduleFederation } = require("../../libs/webpack/plugins");

module.exports = () => {
  const clientConfig = getClientDevConfig();

  clientConfig.output.path = pathResolve(process.cwd(), "./dist/client/core");
  clientConfig.output.publicPath = "/client/core/";

  clientConfig.plugins.push(
    moduleFederation({
      name: "core",
      exposes: {
        "./App": "./src/client/app.tsx",
      },
    })
  );

  return [clientConfig, getServerDevConfig()];
};
