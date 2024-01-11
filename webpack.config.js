// @ts-check
const path = require("node:path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  mode: "development",
  devtool: "source-map",
  target: "web",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "js/[name].[contenthash:8].js",
    chunkFilename: "js/[name].[contenthash:8].js",
    clean: true,
  },
  devServer: {
    port: 8000,
    open: false,
    compress: true,
    proxy: {
      "/user": "http://127.0.0.1:3000",
    },
    static: {
      directory: path.resolve(__dirname, "public"),
    },
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: path.resolve(__dirname, "src"),
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      title: "Development",
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@@": path.resolve(__dirname),
    },
  },
};

module.exports = config;
