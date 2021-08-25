const path = require("path");

module.exports = {
  entry: "./sdk/phylloConnectSDK.js",
  output: {
    filename: "phylloConnectSDK.js",
    path: path.resolve(__dirname, "dist"),
    library: "PhylloConnectSDK",
    libraryTarget: "umd",
  },
};
