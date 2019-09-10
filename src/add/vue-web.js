const path = require('path')
const fs = require('fs')
const shell = require('shelljs')
const { addBeforeHandle, firstLetterUpper, successTip } = require('../utils')

const addPath = './src/views/'

const vueweb = () => {
  addBeforeHandle(addPath).then((pages) => {
    const routerConfig = fs.readFileSync(path.resolve(process.cwd(), './src/config/router.js'), 'utf-8')
    let importConfig = '',      // 组件引用
        regConfig = '',         // 路由注册
        newRouterConfig = ''    // 新的router配置

    // 无存在页面模块 可正常添加
    pages.forEach((v, i) => {
      shell.mkdir('-p', `./src/views/${v}`)
      shell.cp(path.resolve(__dirname, './vue-web-template/Index.vue'), `./src/views/${v}`)
      importConfig += `/**\n * [手动注释]\n */\nconst ${firstLetterUpper(v)} = () => import(/* webpackChunkName: '${firstLetterUpper(v)}' */ '../views/${v}/Index.vue');\n\n`
      regConfig += `${i ? '  ' : ''}{\n    path: '/${v}',\n    component: ${firstLetterUpper(v)},\n  },\n`
    })

    // 更新router配置文件
    shell.rm('-rf', `./src/config/router.js`)
    newRouterConfig = routerConfig.replace(/\/\/ importMark/i, importConfig + '// importMark');
    newRouterConfig = newRouterConfig.replace(/\/\/ regMark/i, regConfig + '  // regMark');
    fs.writeFileSync(path.resolve(process.cwd(), './src/config/router.js'), newRouterConfig, 'utf-8')
    successTip('添加成功')
  }, () => {})
}

module.exports = vueweb