const { getDefaultConfig } = require("@expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

// Update transformer and resolver configurations
defaultConfig.transformer.babelTransformerPath = require.resolve(
  "react-native-svg-transformer"
);
defaultConfig.resolver.assetExts = defaultConfig.resolver.assetExts.filter(
  (ext) => ext !== "svg"
);
defaultConfig.resolver.sourceExts.push("svg", "cjs");

module.exports = defaultConfig;
