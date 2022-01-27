const getConfig = require("./common");
const { resolveCwd } = require("./utils");

module.exports = () => {
  const config = getConfig();

  config.target = "web";
  config.entry.index = resolveCwd("./client/index");
  config.resolve.modules.push(
    resolveCwd("./client"),
    resolveCwd("./node_modules")
  );
  config.output.path = resolveCwd("./dist/client");
  config.output.publicPath = "/client/";

  return config;
};
