const getConfig = require("./webpack.common");

module.exports = getConfig({
  url: "http://localhost:3000",
}).map((config) => {
  config.mode = "development";
  config.devtool = "source-map";

  return config;
});
