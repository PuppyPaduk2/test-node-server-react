const path = require("path");

module.exports = {
  mode: "production",
  entry: undefined,
  output: undefined,
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
  plugins: undefined,
};
