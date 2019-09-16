const package = require('./template/package.json')

module.exports = (api, options, rootOptions) => {
  // 修改 `package.json` 里的字段
  api.extendPackage(package)
  // README.md 无法删除，在render之后创建
  const defaultFilesToDelete = [
    'README.md',
    'src/router.js',
    'src/store.js',
    'src/views/About.vue',
    'src/views/Home.vue',
    'src/assets/logo.png',
    'src/components/HelloWorld.vue'
  ]

  // 删除默认文件
  api.render(files => {
    Object.keys(files)
      .filter(name => defaultFilesToDelete.includes(name))
      .forEach(name => delete files[name])
  })

  // 复制并用 ejs 渲染 `./template` 内所有的文件
  api.render('./template', {
    i18n: options.i18n,
    element: options.element
  })

  if (options.i18n) {
    api.extendPackage({
      dependencies: {
        "vue-i18n": "^8.11.2"
      }
    })
  }
}
