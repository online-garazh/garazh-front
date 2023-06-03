/** @type {import('next').NextConfig} */

require('dotenv').config();

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const nextConfig = {
  reactStrictMode: false,
  modularizeImports: {
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
    lodash: {
      transform: 'lodash/{{member}}',
    },
  },
  // optimizeFonts: true,
  swcMinify: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = () => {
  const plugins = [withBundleAnalyzer];

  return plugins.reduce((acc, next) => next(acc), nextConfig);
};
