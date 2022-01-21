const { resolve: resolvePath } = require("path");
const getConfig = require("./common");

module.exports = () => {
  const config = getConfig();

  config.target = "web";

  config.entry.index = resolvePath(process.cwd(), "./src/client/index");

  config.output = {
    path: resolvePath(process.cwd(), "./dist/client"),
    filename: "[name].js",
    publicPath: "/client/",
  };

  config.resolve = {
    extensions: [".tsx", ".ts", ".js"],
    modules: [
      resolvePath(process.cwd(), "./src/client"),
      resolvePath(process.cwd(), "./node_modules"),
      resolvePath(process.cwd(), "../node_modules"),
      resolvePath(process.cwd(), "../../node_modules"),
    ],
  };

  return config;
};
