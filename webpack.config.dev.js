const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "serenity.js",
    path: __dirname + "/dist"
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      { test: /\.html$/, loader: "html-loader" },
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'
      { test: /\.tsx?$/, loaders: ["react-hot-loader/webpack", "awesome-typescript-loader"] },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      // Compile all '.scss' files through 'sass-loader'.
      { test: /\.scss$/, loaders: ["style-loader", "css-loader", "sass-loader"] },
      { test: /\.(woff|woff2)$/, loader: "url-loader?name=fonts/[hash].[ext]&limit=5000&mimetype=application/font-woff" },
      { test: /\.(eot|svg|ttf)$/, loader: "file-loader?name=fonts/[hash].[ext]" }
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "Serenity"
    })
  ]
};
