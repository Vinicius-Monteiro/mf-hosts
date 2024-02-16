const path = require("path");
const { merge } = require("webpack-merge");
const sharedWebpackConfig = require("./webpack.shared");
const moduleFederationPlugin = require("./module-federation");
const HtmlWebPackPlugin = require("html-webpack-plugin");

/**
 * @type {import('webpack').Configuration}
 **/
const webpackConfig = {
  output: {
    path: path.resolve(__dirname, "../dist/client"),
    publicPath: "http://localhost:3001/client/",

    //
    environment: {
      module: true,
    },
    publicPath: "auto",
    module: true,
    library: { type: "module" },
    chunkFormat: "module",
    chunkLoading: "import",
  },

  //
  externalsType: "module",
  experiments: {
    outputModule: true,
    topLevelAwait: true,
  },

  cache: false,
  optimization: {
    moduleIds: "named",
    runtimeChunk: "single",
    chunkIds: "named",

    // treeshake unused code in development
    // needed so that browser build does not pull in server code
    usedExports: true,
    innerGraph: true,
    splitChunks: {
      chunks: "async",
    },
  },
  //

  plugins: [
    moduleFederationPlugin.client,
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      scriptLoading: "module",
    }),
  ],
};

module.exports = merge(sharedWebpackConfig, webpackConfig);
