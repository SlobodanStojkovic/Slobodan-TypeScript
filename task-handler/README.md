# To install and use webpack we will type:

1. npm install --save-dev webpack webpack-cli webpack-dev-server typescript ts-loader
2. Create webpack.config.js  file for development, or for production.

Development has   mode: "development",   devtool: "inline-source-map", while production file webpack.config.prod has mode: "production", devtool: "none", const CleanPlugin = require("clean-webpack-plugin"); (which is get by npm install cleaan-webpack-plugin) and then adding to the bottom - plugins: [new CleanPlugin.CleanWebpackPlugin()]

Development has in package.json:  "build": "webpack"
Production has in package.json:   "build": "webpack --config webpack.config.prod.js"