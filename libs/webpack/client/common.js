const path = require("path");
const { loadablePlugin } = require("../plugins");
const getConfig = require("../common");

module.exports = () => {
  const config = getConfig();

  config.target = "web";

  config.entry = {
    index: {
      import: path.resolve(process.cwd(), "./src/client/index"),
      // dependOn: ["react"],
    },
    // react: ["react", "react-dom", "react-router-dom"],
  };

  config.output = {
    path: path.resolve(process.cwd(), "./dist/client"),
    filename: "[name].js",
    // publicPath: "/client/",
  };

  config.resolve = {
    extensions: [".tsx", ".ts", ".js"],
    modules: [
      path.resolve(process.cwd(), "./src/client"),
      path.resolve(process.cwd(), "./node_modules"),
      path.resolve(process.cwd(), "../node_modules"),
      path.resolve(process.cwd(), "../../node_modules"),
    ],
  };

  config.plugins.push(loadablePlugin());

  return config;
};
