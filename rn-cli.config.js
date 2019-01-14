const extraNodeModules = require('node-libs-browser');

module.exports = {
  extraNodeModules,
  getTransformModulePath() {
    return require.resolve("react-native-typescript-transformer");
  },
  getSourceExts() {
    return ["ts", "tsx"];
  }
};
