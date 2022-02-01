const { resolve: resolvePath } = require("path");
const { getMiniCssExtractPlugin } = require("./plugins");
const { resolveCwd, resolveDirname } = require("./utils");
const { getTsJsRule, getCssSassRule } = require("./module-rules");

module.exports = () => ({
  mode: "production",
  entry: {},
  output: {
    filename: "[name].js",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    modules: [resolveDirname("../node_modules")],
    alias: {
      libs: [resolveDirname("../src/libs")],
      services: [resolveDirname("../src/services")],
    },
  },
  externals: {},
  module: {
    rules: [getTsJsRule(), getCssSassRule()],
  },
  plugins: [getMiniCssExtractPlugin()],
  optimization: {
    // runtimeChunk: "single",
    // moduleIds: "named",
    // chunkIds: "named",
    // splitChunks: {
    //   chunks: "all",
    // },
  },
});
