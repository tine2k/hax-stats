module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://10.0.0.10:33323/',
        changeOrigin: true
      },
    }
  }
}
