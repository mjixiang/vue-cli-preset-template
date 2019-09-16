const path = require('path')
// const CompressionPlugin = require('compression-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, dir)
}

const proxyOption = {
  target: 'http://183.63.174.35:6009',
  changeOrigin: true,
  secure: false
}
const pages = {
  index: resolve('src/main.js')
  // app: {
  //   entry: resolve('src-app/main.js'),
  //   template: 'public/app/index.html',
  //   filename: 'app/index.html'
  // }
}

module.exports = {
  lintOnSave: true,
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: '', // 静态资目录，相对 outputDir
  // indexPath: '', // index.html输出路径
  pages,
  filenameHashing: true,
  runtimeCompiler: false,
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        '@': resolve('src'),
        views: resolve('src/views'),
        components: resolve('src/components'),
        mixins: resolve('src/mixins'),
        apis: resolve('src/apis'),
        utils: resolve('src/utils'),
        config: resolve('src/config'),
        assets: resolve('src/assets'),
        images: resolve('src/assets/images')
      }
    }
  },
  chainWebpack: config => {
    config.externals({
      'vue': 'Vue'<%_ if (element) { _%>,
      'element-ui': 'ELEMENT'
      <%_ } _%>
    })
    config.plugin('define').tap(args => {
      args[0]['process.env'].BASE_URL = JSON.stringify(process.env.BASE_URL)
      return args
    })
    // 文件大小分析
    // if (process.env.NODE_ENV === 'production') {
    //   config
    //     .plugin('webpack-bundle-analyzer')
    //     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    // }

    // 解决多pages Bug -> https://github.com/vuejs/vue-cli/issues/2463#issuecomment-423704639
    Object.keys(pages).forEach(page => {
      config.plugins.delete(`preload-${page}`)
      config.plugins.delete(`prefetch-${page}`)
    })
  },
  devServer: {
    open: true,
    https: false,
    disableHostCheck: true,
    proxy: {
      '/api': proxyOption
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "assets/_variables.scss";
        `
      }
    }
  },
  pwa: {
    name: '<%= rootOptions.projectName %>',
    themeColor: '#3CB04B',
    msTileColor: '#ffffff',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#ffffff'
  }
}
