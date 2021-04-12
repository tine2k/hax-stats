module.exports = {
  devServer: {
    proxy: {
      '^/games': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
    }
  }
}
