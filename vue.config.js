module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  devServer: {
    // host:"localhost",
    port: 8080,
    // 设置代理
    proxy: {
      "/api": {
        target: "https://news-at.zhihu.com", // 访问数据的计算机域名
        ws: true, // 是否启用websockets
        changeOrigin: true, //开启代理
        pathRewrite: {
          '^api':'/api'
        }
      }
    }
  },
  publicPath: './',
  // 1.默认为 "/":部署在一个域名的根路径上 ; 2. "./":所有的资源都会被链接为相对路径，这样打出来的包可以被部署在任意路径
  outputDir: 'dist',
  // 默认为 "dist",指打包后的资源放置的路径，放在dist文件夹下
  assetsDir: 'static',
  // 默认为:'' ,放置打包后生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  indexPath: 'index.html',
  // Default: 'index.html' ,指定生成的 index.html 的输出路径 (相对于 outputDir)
  // filenameHashing: true,
  // Default: true ,生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
  // pages:undefined,//在 multi-page 模式下构建应用
  // lintOnSave: true,
  // Type: boolean|'error';Default: true; true:将 lint 错误输出为编译警告;'error':错误输出会导致编译失败
  // runtimeCompiler: false,
  // Default: false, 设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右
  // transpileDependencies:[],//Default: [], 默认情况下 babel-loader 会忽略所有 node_modules 中的文件
}
