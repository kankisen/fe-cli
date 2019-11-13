const path = require('path')
const fs = require('fs')
const shell = require('shelljs')
const chalk = require('chalk')
const { addBeforeHandle, successTip } = require('../utils')

const addPath = './src/views/'

const vueh5 = () => {
  addBeforeHandle(addPath).then((pages) => {
    let realPages = Array.from(new Set(pages.map(v => v.split('/').reverse()[0])))
    if (pages.length !== realPages.length) {
      console.log(chalk.bold.red(`\n多级嵌套页面命名冲突\n`))
      process.exit()
    }
    // 无存在页面模块 可正常添加

    let regConfig = '',         // 注册路由path及组件配置
        newRouterConfig = '';    // 新的router配置
    const routerConfig = fs.readFileSync(path.resolve(process.cwd(), './src/config/router.js'), 'utf-8')
    
    realPages.forEach((v, i) => {
      // 添加页面文件
      shell.mkdir('-p', `./src/views/${v}`)
      shell.cp(path.resolve(__dirname, './vue-web-cls-template/views/*'), `./src/views/${v}`)

      // 添加store
      shell.cp(path.resolve(__dirname, './vue-web-cls-template/store.js'), `./src/store/modules`)
      shell.mv(`./src/store/modules/store.js`, `./src/store/modules/${v}.js`)

      // 添加router配置字符串
      regConfig += `{\n    path: '/${pages[i]}',\n    component: () => import(/* webpackChunkName: '${v}' */ '../views/${v}/Index.vue'),\n  },\n`

      // 添加menu
    })

    // 添加router
    newRouterConfig = routerConfig.replace(/\/\/ regMark/i, regConfig + '  // regMark');
    shell.rm('-rf', `./src/config/router.js`)
    fs.writeFileSync(path.resolve(process.cwd(), './src/config/router.js'), newRouterConfig, 'utf-8')

    successTip('添加成功')
  }, () => {})
}

module.exports = vueh5