const path = require("path");
const { loadablePlugin } = require("./plugins");

module.exports = () => ({
  mode: "production",
  entry: {
    react: {
      import: ["react", "react-dom", "react-router-dom"],
    },
  },
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
  plugins: [loadablePlugin()],
  optimization: {
    runtimeChunk: "single",
    moduleIds: "named",
    chunkIds: "named",
    splitChunks: {
      chunks: "all",
    },
  },
});
