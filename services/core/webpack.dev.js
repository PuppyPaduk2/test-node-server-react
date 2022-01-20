const getConfig = require("../../libs/webpack/service/dev");

module.exports = getConfig({
  name: "core",
  serviceUrl: "http://localhost:3000",
});
