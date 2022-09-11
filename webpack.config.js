const path = require("path");

module.exports = {
  entry: {
    index: { import: "./src/index.ts", filename: "[name].bundle.js" },
    popup: { import: "./src/popup/Popup.tsx", filename: "[name].bundle.js" },
    instruction: {
      import: "./src/docs/Instruction.tsx",
      filename: "../docs/[name].bundle.js",
    },
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
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", "jsx"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: {
      keep(asset) {
        console.log(asset);
        return ["popup.html", "manifest.json", "icons/"].some((path) => {
          return asset.includes(path);
        });
      },
    },
  },
};
