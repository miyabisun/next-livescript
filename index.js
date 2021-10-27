const path = require('path')

module.exports = (nextConfig = {}) => ({
  ...nextConfig,
  pageExtensions: Array.isArray(nextConfig.pageExtensions)
    ? [...new Set([...nextConfig.pageExtensions, 'ls'])]
    : ['js', 'ls'],
  webpack(config, options) {
    const { dir, defaultLoaders, dev, isServer } = options

    config.resolve.extensions.push('.ls')

    config.module.rules.push({
      test: /\.ls$/,
      include: [dir],
      exclude: /node_modules/,
      use: [{loader: 'livescript-loader?const=true'}],
    })

    if (typeof nextConfig.webpack === 'function') {
      return nextConfig.webpack(config, options)
    }

    return config
  }
})
