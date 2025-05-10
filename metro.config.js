// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

// nếu thư viện nào xài .cjs
defaultConfig.resolver.sourceExts.push('cjs');

// tắt package exports để Firebase Auth React Native hoạt động ổn
defaultConfig.resolver.unstable_enablePackageExports = false;

module.exports = defaultConfig;
