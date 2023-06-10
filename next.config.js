require('dotenv').config();

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const advancedHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
];
const nextConfig = {
  modularizeImports: {
    '@mui/material/?(((\\w*)?/?)*)': {
      transform: '@mui/material/{{ matches.[1] }}/{{member}}',
    },
    '@mui/icons-material/?(((\\w*)?/?)*)': {
      transform: '@mui/icons-material/{{ matches.[1] }}/{{member}}',
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
  transpilePackages: ['@mui/icons-material', '@mui/material', '@mui/system'],
  reactStrictMode: false,
  optimizeFonts: true,
  swcMinify: false,
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
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        // source: '/:path*',
        // headers: advancedHeaders,
      },
    ];
  },
};

module.exports = () => {
  /**
   * @type {import('next').NextConfig}
   */

  const plugins = [withBundleAnalyzer];

  return plugins.reduce((acc, next) => next(acc), nextConfig);
};
