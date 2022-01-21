const path = require("path");
const { loadablePlugin, miniCssExtractPlugin } = require("./plugins");

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
  plugins: [loadablePlugin(), miniCssExtractPlugin()],
  optimization: {
    runtimeChunk: "single",
    moduleIds: "named",
    chunkIds: "named",
    splitChunks: {
      chunks: "all",
    },
  },
});
