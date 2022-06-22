const path = require('path')

module.exports = {
  webpack: {
    alias: {
      '@entities': path.resolve(__dirname, 'client/src/entities'),
      '@pages': path.resolve(__dirname, 'client/src/pages'),
      '@shared': path.resolve(__dirname, 'client/src/shared'),
      '@widgets': path.resolve(__dirname, 'client/src/widgets'),
      '@app': path.resolve(__dirname, 'client/src/app'),
      '@features': path.resolve(__dirname, 'client/src/features'),
    },
  },
}
