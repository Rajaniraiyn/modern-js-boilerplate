const webpack = require("webpack");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const TerserPlugin = require("terser-webpack-plugin");

const terserOptions = {
  module: false,
  compress: {
    drop_console: true,
    ecma: 6,
    // keep_classnames: /Raj/,
    unsafe_math: true,
    unsafe_methods: true,
  },
  mangle: {
    // keep_classnames: /Raj/,
  },
  format: {
    comments: /\*!$/gm,
  },
};

const config = (env, argv) => ({
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: false,
    }),
  ],
  optimization: {
    usedExports: true,
    minimize: argv.mode === "production",
    minimizer: [
      new TerserPlugin({
        terserOptions,
      }),
    ],
  },
});

module.exports = config;
