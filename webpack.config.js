const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "css/styles.css",
  disable: process.env.NODE_ENV === "development"
});

module.exports = {
  entry: ['./app/app.js', "./app/src/sass/main.scss"],
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'public/assets')
  },
  module: {
    rules: [{
      test: /.jsx?$/,
      include: [
        path.resolve(__dirname, 'app')
      ],
      exclude: [
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, 'bower_components')
      ],
      loader: 'babel-loader'
    }, {
      test: /.scss$/,
      use: extractSass.extract({
        use: [{
          loader: "css-loader",
          options: { url: false }
        }, {
          loader: "sass-loader"
        }],
        // use style-loader in development
        fallback: "style-loader"
      })
    }]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.css', 'scss']
  },
  devtool: 'source-map',
  plugins: [
    extractSass
  ]
};