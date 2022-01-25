const { resolve: resolvePath } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { getLoadablePlugin, getMiniCssExtractPlugin } = require("./plugins");
const { resolveCwd, resolveDirname } = require("./utils");

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
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)?$/,
        use: {
          loader: "babel-loader",
          options: {
            configFile: resolveDirname("./babel.config.js"),
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                exportLocalsConvention: "camelCase",
                localIdentName: "[hash:base64:5]",
              },
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                ident: "postcss",
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [getLoadablePlugin(), getMiniCssExtractPlugin()],
  optimization: {
    runtimeChunk: "single",
    moduleIds: "named",
    chunkIds: "named",
    splitChunks: {
      chunks: "all",
    },
  },
});
