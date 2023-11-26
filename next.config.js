const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = (phase, { defaultConfig }) => {
  const config = {
    ...withBundleAnalyzer({
      webpack: (config) => {
        return config
      },
      env: {
        NETWORK_HTTP_URI: process.env.NETWORK_HTTP_URI,
      },
    }),
  }

  return config
}
