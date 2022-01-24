const { resolve: resolvePath } = require("path");

function getAppConstants(options = {}) {
  const { url, protocol, hostname, port } = options;

  if (!url) {
    throw "Error: Empty 'url' in options for getAppConstants";
  }

  const appUrl = new URL(url);

  appUrl.protocol = protocol ?? appUrl.protocol;
  appUrl.hostname = hostname ?? appUrl.hostname;
  appUrl.port = port ?? appUrl.port;

  return {
    __APP_URL__: JSON.stringify(appUrl.origin),
    __APP_HREF__: JSON.stringify(appUrl.href),
    __APP_PROTOCOL__: JSON.stringify(appUrl.protocol),
    __APP_HOSTNAME__: JSON.stringify(appUrl.hostname),
    __APP_PORT__: JSON.stringify(appUrl.port),
  };
}

function resolvePathCwd(path) {
  return resolvePath(process.cwd(), path);
}

module.exports = {
  resolvePath,
  getAppConstants,
  resolvePathCwd,
};
