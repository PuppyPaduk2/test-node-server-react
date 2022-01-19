const path = require("path");
const { DefinePlugin } = require("webpack");

module.exports = () => ({
  mode: "production",
  entry: undefined,
  output: undefined,
  resolve: undefined,
  externals: undefined,
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)?$/,
        use: {
          loader: "babel-loader",
          options: {
            configFile: path.resolve(__dirname, "./babel.config.js"),
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      __APP_URL__: JSON.stringify("http://localhost:3000"),
    }),
  ],
  optimization: {
    runtimeChunk: "single",
    moduleIds: "named",
    chunkIds: "named",
    splitChunks: {
      chunks: "all",
    },
  },
});
