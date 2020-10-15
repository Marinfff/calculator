const path = require('path');

const config = {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  watch: true
}

module.exports = [
  {
    ...config,
    entry: path.join(__dirname, "main.ts"),
    output: {
      path: path.join(__dirname, "dist"),
      filename: "main.js"
    },
    target: "electron-main",
  },
  {
    ...config,
    entry: path.join(__dirname, "src", "index.ts"),
    output: {
      path: path.join(__dirname, "dist"),
      filename: "index.js"
    },
    target: "electron-renderer"
  }
];