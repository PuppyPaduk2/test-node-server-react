const {
  getBabelLoader,
  getMiniCssExtractLoader,
  getCssLoader,
  getPostcssLoader,
  getSassLoader,
} = require("./loaders");

module.exports = {
  getTsJsRule: (settings = {}) => ({
    test: /\.(ts|tsx|js|jsx)?$/,
    use: getBabelLoader(),
    exclude: /node_modules/,
    ...settings,
  }),
  getCssSassRule: (settings = {}) => ({
    test: /\.(sa|sc|c)ss$/i,
    use: [
      getMiniCssExtractLoader(),
      getCssLoader(),
      getPostcssLoader(),
      getSassLoader(),
    ],
    ...settings,
  }),
};
