// eslint-disable-next-line
const fs = require('fs')

const packageJson = fs.readFileSync('./package.json')
const version = JSON.parse(packageJson).version || 0

console.log('--------------------------------------------------------')
console.log('--               Pharmmap version %s', version)
console.log('--------------------------------------------------------')
console.log('--               Proxy : %s', process.env.PROXY)
console.log('--------------------------------------------------------')

module.exports = {
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        // prependData: `
        //   @import "@/core/styles/colors_module.scss";
        // `,
      },
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('string-replace-loader')
      .loader('string-replace-loader')
      .tap(() => ({
        search: '$$version_number$$',
        replace: version,
      }))
  },
  devServer: {
    hot: true,
    proxy: {
      '^/api': {
        target: process.env.PROXY,
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: { '^/api': '/' },
      },
    },
  },
}
