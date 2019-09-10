const shell = require('shelljs')
const chalk = require('chalk')
const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')


const isHasYarn = Boolean(shell.which('yarn'))
const isHasNpm = Boolean(shell.which('npm'))
let  chooseList = []
isHasYarn && chooseList.push('yarn')
isHasNpm && chooseList.push('npm')
chooseList.push('手动安装')

/**
 * 安装包前置处理
 * @return {String} type 返回用户选择的安装方式
 */
const install = async () => {
  console.log(chalk.bold.yellow('本地包管理工具：'))
  console.log(`${chalk.bold.yellow('yarn: ')} ${isHasYarn ? chalk.bold.green('已安装') : chalk.bold.red('未安装')}`)
  console.log(`${chalk.bold.yellow('npm:  ')} ${isHasNpm ? chalk.bold.green('已安装') : chalk.bold.red('未安装')}`)
  if (!isHasYarn && !isHasNpm) {
    console.log(chalk.bold.red('当前无全局包管理指令， 手动安装'))
  }
  console.log()
  return await inquirer.prompt([
    {
      type: 'list',
      name: 'installType',
      message: 'install 方式',
      choices: chooseList,
    },
  ])
}


/**
 * 获取项目之前的安装方式
 * @return {String} type 
 */
const installType = () => {
  const checkMap = {
    'npm': 'package-lock.json',
    'yarn': 'yarn.lock'
  }
  let type = ''
  Object.entries(checkMap).forEach(v => {
    // 判断哪个lock文件存在
    if (fs.existsSync(path.resolve(process.cwd(), v[1]))) {
      type = v[0]
    }
  })
  return type || 'npm'
}


module.exports = {
  install,
  installType
}