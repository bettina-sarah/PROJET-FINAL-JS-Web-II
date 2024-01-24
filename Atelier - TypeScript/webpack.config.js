
const path = require('path');

module.exports = {
    context: path.join(__dirname, '/src'),
   entry: "./main.ts",
   mode : "development",
   watch: true,
   output: {
       filename: "bundle.js",
       path: path.resolve(__dirname, 'dist')
   },
   resolve: {
       extensions: [".webpack.js", ".web.js", ".ts", ".js", ".tsx"]
   },
   module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
}