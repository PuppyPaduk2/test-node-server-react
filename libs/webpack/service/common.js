const { resolve: resolvePath } = require("path");
const { URL } = require("url");
const { nodemon, loadablePlugin, definePlugin } = require("../plugins");
const getClientCommonConfig = require("../client/common");
const getServerCommonConfig = require("../server/common");

const checkOption = (options = {}) => {
  if (!options.name) {
    throw "Error: Empty 'name' in options of service webpack config";
  }

  if (!options.serviceUrl) {
    throw "Error: Empty 'serviceUrl' in options of service webpack config";
  }
};

const chunkFilename =
  ({ name }) =>
  (pathData) => {
    return pathData.chunk.name === "main"
      ? "[name].js"
      : `services/${name}/[name].js`;
  };

const attachPlugins = (config, options = {}) => {
  const { name, serviceUrl, protocol, hostname, port } = options;
  const serviceURL = new URL(serviceUrl);

  serviceURL.protocol = protocol ?? serviceURL.protocol;
  serviceURL.hostname = hostname ?? serviceURL.hostname;
  serviceURL.port = port ?? serviceURL.port;

  const constants = {
    __SERVICE_URL__: JSON.stringify(serviceURL.origin),
    __SERVICE_HREF__: JSON.stringify(serviceURL.href),
    __SERVICE_PROTOCOL__: JSON.stringify(serviceURL.protocol),
    __SERVICE_HOSTNAME__: JSON.stringify(serviceURL.hostname),
    __SERVICE_PORT__: JSON.stringify(serviceURL.port),
    __SERVICE_NAME__: JSON.stringify(name),
  };

  config.plugins.push(
    definePlugin(constants),
    loadablePlugin({
      filename: `./services/${name}/loadable-stats.json`,
    })
  );

  return config;
};

const getClientConfig = (options = {}) => {
  const { name } = options;
  const config = getClientCommonConfig();

  config.entry[`services/${name}/index`] = {
    import: resolvePath(process.cwd(), "./src/client/index"),
  };

  config.output.chunkFilename = chunkFilename({ name });

  attachPlugins(config, options);

  return config;
};

const getServerConfig = (options = {}) => {
  const { name } = options;
  const config = getServerCommonConfig();

  config.entry[`services/${name}/index`] = {
    import: resolvePath(process.cwd(), "./src/server/index"),
  };

  config.output.chunkFilename = chunkFilename({ name });

  attachPlugins(config, options);

  config.plugins.push(
    nodemon({
      script: resolvePath(
        process.cwd(),
        `./dist/server/services/${name}/index.js`
      ),
    })
  );

  return config;
};

module.exports = (options = {}) => {
  checkOption(options);

  return [getClientConfig(options), getServerConfig(options)];
};
