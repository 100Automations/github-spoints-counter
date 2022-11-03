const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (env) => {
  return {
    entry: {
      index: { import: "./src/index.ts", filename: "[name].bundle.js" },
      popup: { import: "./src/popup/Popup.tsx", filename: "[name].bundle.js" },
    },
    devtool: "inline-source-map",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
        {
          test: /\.(svg)$/i,
          type: "asset/inline",
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", "jsx"],
    },
    output: {
      path: path.resolve(__dirname, `dist/${env.browser}`),
      clean: {
        keep(asset) {
          return ["popup.html", "manifest.json", "icons/"].some((path) => {
            return asset.includes(path);
          });
        },
      },
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "node_modules/webextension-polyfill/dist/browser-polyfill.min.js",
          },
        ],
      }),
    ],
  };
};
