const nextTranslate = require('next-translate-plugin');
const { resolve } = require("path");

module.exports = nextTranslate({
  poweredByHeader: false,
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
});

