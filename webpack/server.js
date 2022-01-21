const { resolve: resolvePath } = require("path");
const { copyPlugin } = require("./plugins");
const getConfig = require("./common");

module.exports = () => {
  const config = getConfig();

  config.target = "node";

  config.entry.index = resolvePath(process.cwd(), "./src/server/index");

  config.output = {
    path: resolvePath(process.cwd(), "./dist/server"),
    filename: "[name].js",
  };

  config.resolve = {
    extensions: [".tsx", ".ts", ".js"],
    modules: [
      resolvePath(process.cwd(), "./src/server"),
      resolvePath(process.cwd(), "./node_modules"),
      resolvePath(process.cwd(), "../node_modules"),
      resolvePath(process.cwd(), "../../node_modules"),
    ],
  };

  config.plugins.push(
    copyPlugin({
      patterns: [
        {
          from: resolvePath(process.cwd(), "./src/public"),
          to: resolvePath(process.cwd(), "./dist/public"),
        },
      ],
    })
  );

  return config;
};
