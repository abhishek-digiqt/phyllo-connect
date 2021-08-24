const path = require("path");

module.exports = {
  entry: "./sdk/phylloSDK.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    library: "PhylloSDK",
    libraryTarget: "umd",
  },
};
