const getCommonBabelConfig = require("./common.babel.config");

const isWebTarget = (caller) => {
  return Boolean(caller && caller.target === "web");
};

const isWebpack = (caller) => {
  return Boolean(caller && caller.name === "babel-loader");
};

module.exports = (api) => {
  const web = api.caller(isWebTarget);
  const webpack = api.caller(isWebpack);
  const config = getCommonBabelConfig();

  config.presets = config.presets.map(([key, options]) => {
    if (key === "@babel/preset-env") {
      const nextOptions = {
        useBuiltIns: web ? "entry" : undefined,
        corejs: web ? "core-js@3" : false,
        targets: !web ? { node: "current" } : undefined,
        modules: webpack ? false : "commonjs",
      };

      return [key, nextOptions];
    } else {
      return [key, options];
    }
  });

  return config;
};
