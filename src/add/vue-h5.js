const path = require('path')
const shell = require('shelljs')
const { addBeforeHandle, successTip } = require('../utils')

const addPath = './src/views/'

const vueh5 = () => {
  addBeforeHandle(addPath).then((pages) => {
    // 无存在页面模块 可正常添加
    pages.forEach(v => {
      shell.mkdir('-p', `./src/views/${v}`)
      shell.cp(path.resolve(__dirname, './vue-h5-template/views/*'), `./src/views/${v}`)
      shell.cp(path.resolve(__dirname, './vue-h5-template/template.html'), `./template/${v}.html`)
    })
    successTip('添加成功')
  }, () => {})
}

module.exports = vueh5