/**
 * 模板分发处理中心
 */
const path = require('path')
const chalk = require('chalk')
const { readJson } = require('./opearJson')

// update处理方法集合
const updateCollect = {
  'vue-h5': require('./update/vue-h5'),
  'vue-web': require('./update/vue-web'),
  'react-h5': require('./update/react-h5'),
  'react-web': require('./update/react-web'),
  'taro': require('./update/taro')
}

// add处理方法集合
const addCollect = {
  'vue-h5': require('./add/vue-h5'),
  // 'vue-web': require('./add/vue-web'),
  // 'react-h5': require('./add/react-h5'),
  // 'react-web': require('./add/react-web'),
  // 'taro': require('./add/taro')
}

// dispath处理
const dispath = (type) => {
  readJson(path.resolve(process.cwd(), './package.json')).then((info) => {
    if (info.templateType && info.version && Object.keys(updateCollect).includes(info.templateType)) {
      // 存在模板类型字段 及 版本号字段   证明是由脚手架生成的模板
      if (type === 'update') {
        // 更新处理
        // 执行对应的update方法， 并传入当前待更新的版本号
        updateCollect[info.templateType](info.version)
      } else if (type === 'add') {
        // 添加页面模板处理
        addCollect[info.templateType]()
      }
    } else {
      console.log(`\n${chalk.bold.red('非模板生成项目')}\n`)
    }
  }, () => {
    console.log(`\n${chalk.bold.red('请在模板生成项目根目录执行此操作')}\n`)
  })
}

module.exports = dispath