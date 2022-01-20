const { resolve: resolvePath } = require("path");
const getClientDevConfig = require("../../libs/webpack/client/dev");
const { nodemon, loadablePlugin } = require("../../libs/webpack/plugins");
const getServerDevConfig = require("../../libs/webpack/server/dev");

const getClientConfig = () => {
  const config = getClientDevConfig();

  config.entry["services/core/index"] = {
    import: resolvePath(process.cwd(), "./src/client/index"),
  };

  config.output.chunkFilename = (pathData) => {
    return pathData.chunk.name === "main"
      ? "[name].js"
      : "services/core/[name].js";
  };

  config.plugins.push(
    loadablePlugin({
      filename: "./services/core/loadable-stats.json",
    })
  );

  return config;
};

const getServerConfig = () => {
  const config = getServerDevConfig();

  config.entry["services/core/index"] = {
    import: resolvePath(process.cwd(), "./src/server/index"),
  };

  config.output.chunkFilename = (pathData) => {
    return pathData.chunk.name === "main"
      ? "[name].js"
      : "services/core/[name].js";
  };

  config.plugins.push(
    loadablePlugin({
      filename: "./services/core/loadable-stats.json",
    }),
    nodemon({
      script: resolvePath(
        process.cwd(),
        "./dist/server/services/core/index.js"
      ),
    })
  );

  return config;
};

module.exports = () => [getClientConfig(), getServerConfig()];
