const path = require('path')
const fs = require("fs")
const glob = require("glob")
const translate = require('google-translate-api')
// 需修改node_modules文件
// - google-translate-api/index.js
// com 改为 cn
// var url = 'https://translate.google.cn/translate_a/single'

// - google-translate-token/index.js
// got('https://translate.google.cn').then(function (res) {
//   if (/tkk:'(.*?)'/.test(res.body)) {
//     let code = RegExp.$1
//     let TKK = code
//     /* eslint-disable no-undef */
//     if (typeof TKK !== 'undefined') {
//       window.TKK = code;
//       config.set('TKK', code);
//   }
// }

// 扫描路径 dist 文件夹
// const src = path.resolve(__dirname, "./dist/static/js/*.js")
const src = path.resolve(__dirname, "./src/**/*.vue")

const langs = {
  cn: './src/i18n/cn.json',
  en: './src/i18n/en.json',
  ja: './src/i18n/ja.json',
  ko: './src/i18n/ko.json'
}
let templates = {}
Object.keys(langs).forEach(lang => {
  templates[lang] = readJSONFile(langs[lang]) || {}
})

glob(src, {}, async (err, files) => {
  for (let path of files) {
    let data = fs.readFileSync(path, "utf-8")
    // let keys = data.match(/[^\x00-\xff]+( |\d)?[^\x00-\xff]+/g)
    let keys = data.match(/\$t\(('|")(.+?)('|")/g)
    if (!keys) continue
    for (let str of keys) {
      let key = str.substring(4, str.length - 1)
      for (let lang of Object.keys(langs)) {
        if (templates[lang][key]) continue
        if (lang === 'cn') {
          templates[lang][key] = key
        } else {
          try {
            let { text } = await translate(key, {from: 'zh-cn', to: lang})
            templates[lang][key] = text
            console.log(`${key} - ${text}`)
          } catch (err) {
            templates[lang][key] = ''
            console.log(`${key} - 翻译失败`, err)
          }
        }
      }
    }
  }
  Object.keys(langs).forEach(lang => {
    writeJSONFile(langs[lang], templates[lang])
  })
  console.log(`${files.length}个文件, ${Object.keys(templates.cn).length}处`)
})


function readJSONFile (path) {
  let items = null
  try {
    items = JSON.parse(fs.readFileSync(path))
  } catch (err) {}
  return items
}

function writeJSONFile (path, obj) {
  fs.writeFileSync(path, JSON.stringify(obj, null, 2))
}