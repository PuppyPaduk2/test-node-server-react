const getConfig = require("./common");
const { resolveCwd } = require("./utils");

module.exports = () => {
  const config = getConfig();

  config.target = "node";
  config.entry.index = resolveCwd("./server/index");
  config.resolve.modules.push(
    resolveCwd("./server"),
    resolveCwd("./node_modules")
  );
  config.output.path = resolveCwd("./dist/server");

  return config;
};
