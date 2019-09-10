/**
 * 模板分发处理中心
 */
const path = require('path')
const chalk = require('chalk')
const { updateCollect, addCollect } = require('./collectMap')
const { readJson } = require('./utils')
// dispath处理
const dispath = (type) => {
  readJson(path.resolve(process.cwd(), './package.json')).then((info) => {
    if (info.templateType && info.templateVersion && Object.keys(updateCollect).includes(info.templateType)) {
      // 存在模板类型字段 及 版本号字段   证明是由脚手架生成的模板
      if (type === 'update') {
        // 更新处理
        // 执行对应的update方法， 并传入当前待更新的版本号
        updateCollect[info.templateType](info.templateVersion)
      } else if (type === 'add') {
        // 添加页面模板处理
        addCollect[info.templateType]()
      }
    } else {
      console.log(`\n${chalk.bold.red('非模板生成项目')}\n`)
    }
  }, () => {
    console.log(`\n${chalk.bold.red('请在模板生成项目根目录执行此操作')}\n`)
  }).catch(err => {
    console.log(err)
  })
}

module.exports = dispath