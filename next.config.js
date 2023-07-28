require('dotenv').config();

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withPlugins = (config, plugins) => plugins.reduce((acc, withPlugin) => withPlugin(acc), config);
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  publicRuntimeConfig: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  modularizeImports: {
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
    '@mui/styles': {
      transform: '@mui/styles/{{member}}',
    },
    '@mui/lab': {
      transform: '@mui/lab/{{member}}',
    },
    lodash: {
      transform: 'lodash/{{member}}',
    },
  },
  reactStrictMode: false,
  optimizeFonts: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config) {
    // Use for correct svg imports
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = withPlugins(nextConfig, [withBundleAnalyzer]);
