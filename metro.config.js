const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Fix for Node.js v22 on Windows: Metro's fallback watcher trips over
// Node 22's Happy Eyeballs TCP dual-stack connect, crashing with AggregateError.
// Explicitly providing watchFolders forces Metro to skip the problematic watcher init path.
config.watchFolders = [__dirname];

module.exports = config;
