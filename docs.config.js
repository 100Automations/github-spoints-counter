const path = require("path");

module.exports = (env) => {
  return {
    entry: {
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
      assetModuleFilename: "assets/[name][ext][query]",
      path: path.resolve(__dirname, "docs"),
      publicPath: env.development ? "auto" : "github-spoints-counter/",
      clean: {
        keep(asset) {
          return ["index.html"].some((path) => {
            return asset.includes(path);
          });
        },
      },
    },
  };
};
