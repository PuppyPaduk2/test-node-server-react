const path = require("path");
const { loadablePlugin, copyPlugin } = require("../plugins");
const getConfig = require("../common");

module.exports = () => {
  const config = getConfig();

  config.target = "node";

  config.entry = {
    index: path.resolve(process.cwd(), "./src/server/index"),
  };

  config.output = {
    path: path.resolve(process.cwd(), "./dist/server"),
    filename: "[name].js",
  };

  config.resolve = {
    extensions: [".tsx", ".ts", ".js"],
    modules: [
      path.resolve(process.cwd(), "./src/server"),
      path.resolve(process.cwd(), "./node_modules"),
      path.resolve(process.cwd(), "../node_modules"),
      path.resolve(process.cwd(), "../../node_modules"),
    ],
  };

  // TODO Add all node_modules
  // config.externals = {
  //   http: "commonjs2 http",
  //   path: "commonjs2 path",
  //   fs: "commonjs2 fs",
  //   "path-to-regexp": "commonjs2 path-to-regexp",
  //   "mime-types": "commonjs2 mime-types",
  // };

  config.plugins.push(loadablePlugin(), copyPlugin());

  return config;
};
