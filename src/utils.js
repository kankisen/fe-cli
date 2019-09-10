/**
 * 工具函数
 */

const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const emoji = require('node-emoji')
const shell = require('shelljs')
const chalk = require('chalk')
/**
 * 读取json文件
 * @param {String} path  
 */
const readJson = (path) => {
  // eslint-disable-next-line no-undef
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject('读取失败')
      } else {
        resolve(JSON.parse(data))
      }
    })
  })
}

/**
 * 
 * @param {String} path 输出路径文件名 
 * @param {Object} json json文件内容
 */
const writeJson = (path, json) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, JSON.stringify(json, null, 2), (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

/**
 * 获取私钥
 * @return {String}    私钥串
 * @return {Boolean}   false 无私钥串或文件私钥格式不正确
 */
const getToken = () => {
  try {
    return JSON.parse(fs.readFileSync('/usr/local/etc/fe_cli.json', 'utf-8')).private_token
  } catch (err) {
    return false
  }
}

/**
 * 写入私钥 
 * @return { Promise }
 */
const setToken = () => {
  return new Promise((resolve) => {
    // 清空本地私钥文件
    shell.rm('-rf', '/usr/local/etc/fe_cli.json')

    // 录入输入私钥
    inquirer.prompt([
      {
        type: 'input',
        name: 'token',
        message: emoji.emojify(':key:  请输入gitlab私钥'),
      }
    ]).then(res => {
      // 写本地缓存
      const con = JSON.stringify({private_token: res.token})
      fs.writeFileSync('/usr/local/etc/fe_cli.json', con)
      resolve()
    })
  })
}

/**
 * versionContrast 
 * update版本对比
 * @param { String } currentVersion   当前版本
 * @param { String } templateVersion  模板版本
 */
const versionContrast = (currentVersion, templateVersion) => {
  console.log(`${chalk.bold.yellow('当前项目版本：' + currentVersion)}`)
  console.log(`${chalk.bold.yellow('最新模板版本：' + templateVersion)}`)

  // 版本一致 不需要更新
  if (currentVersion === templateVersion) {
    console.log(chalk.bold.green('已是最新版本， 暂不需要更新'))
    process.exit()
  }
  // 大版本号不一致 无法更新
  if (currentVersion.split('.')[0] !== templateVersion.split('.')[0]) {
    console.log(chalk.bold.red('不同版本模板，更新失败'))
    process.exit()
  }
}

/**
 * addBeforeHandle
 * add操作前置处理
 * @param { String } addPath add操作路径
 */
const addBeforeHandle = (addPath) => {
  return new Promise((resolve, reject) => {
    const pages = Array.from(new Set(process.argv.slice(3)))
    // 没有添加页面模块
    if (!pages.length) {
      console.log(chalk.bold.red(`\n未输入添加模板, 添加失败\n`))
      reject()
    }

    let existFileList = []
    // 判断是已存在页面模块
    pages.forEach(v => {
      if (fs.existsSync(path.resolve(process.cwd(), `${addPath}${v}`))) {
        existFileList.push(v)
      }
    })
    
    if (existFileList.length) {
      // 有存在页面模块
      console.log(chalk.bold.red(`\n页面模板`) + chalk.bold.yellow(` ${existFileList.join(' | ')} `) + chalk.bold.red(`已存在, 添加失败\n`))
      reject()
    }
    resolve(pages)
  })
}

/**
 * firstLetterUpper
 * 单词首字母大写
 * @param { String } letter 待转换单词
 */
const firstLetterUpper = (letter) => {
  return letter.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
}

/**
 * successTip
 * 成功打印
 * @param { String } content 文案
 */
const successTip = (content) => {
  console.log(chalk.bold.green(`\n${content}\n`))
}

module.exports = {
  readJson,
  writeJson,
  getToken,
  setToken,
  versionContrast,
  addBeforeHandle,
  firstLetterUpper,
  successTip,
}