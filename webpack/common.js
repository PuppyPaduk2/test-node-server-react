const path = require("path");

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
  plugins: [],
  optimization: {
    moduleIds: "named",
    chunkIds: "named",
    splitChunks: {
      chunks: "all",
    },
  },
});
