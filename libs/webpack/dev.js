const getClientConfig = require("./client/dev");
const getServerConfig = require("./server/dev");

module.exports = () => [getClientConfig(), getServerConfig()];
