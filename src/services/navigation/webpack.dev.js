const getConfig = require("./webpack.common");

module.exports = getConfig({
  url: "http://localhost:3001",
}).map((config) => {
  config.mode = "development";
  config.devtool = "source-map";

  return config;
});
