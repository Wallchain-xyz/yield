// eslint-disable-next-line import/no-extraneous-dependencies
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const { withSentryConfig } = require('@sentry/nextjs');
// TODO: Fix this the next time the file is edited.
// eslint-disable-next-line import/no-extraneous-dependencies
const dotenv = require('dotenv');

dotenv.config();

const env = {};

if (process.env.ENABLE_SENTRY === 'true') {
  env.ENABLE_SENTRY = 'true';
}
if (process.env.SENTRY_ENVIRONMENT) {
  env.SENTRY_ENVIRONMENT = process.env.SENTRY_ENVIRONMENT;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  output: 'standalone',
  trailingSlash: false,
  env,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // TODO: maybe we need to self host these images?
        hostname: 'dex-bin.bnbstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'ethereum.org',
      },
      {
        protocol: 'https',
        hostname: 'etherscan.io',
      },
    ],
  },
};

module.exports = nextConfig;

// Injected content via Sentry wizard below

module.exports = withBundleAnalyzer(
  withSentryConfig(
    module.exports,
    {
      // For all available options, see:
      // https://github.com/getsentry/sentry-webpack-plugin#options

      // Suppresses source map uploading logs during build
      silent: true,
      org: 'wallchain',
      project: 'thekitty',
    },
    {
      // For all available options, see:
      // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

      // Upload a larger set of source maps for prettier stack traces (increases build time)
      // TODO: do this only for prod or dev builds
      widenClientFileUpload: true,

      // Hides source maps from generated client bundles
      hideSourceMaps: true,

      // Automatically tree-shake Sentry logger statements to reduce bundle size
      disableLogger: true,

      sampleRate: 1.0,

      attachStacktrace: true,

      // Enable tracing to help debug user issue right now with
      enableTracing: true,
      tracesSampleRate: 1.0,

      // For all available options, see:
      // https://docs.sentry.io/platforms/javascript/configuration/options/
    },
  ),
);
