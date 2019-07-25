const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const shell = require('shelljs')

const vueh5 = () => {
  const pages = Array.from(new Set(process.argv.slice(3)))
  // 没有添加页面模块
  if (!pages.length) {
    console.log(chalk.bold.red(`\n未输入添加模板, 添加失败\n`))
    return ;
  }
  let existFileList = []
  // 判断是已存在页面模块
  pages.forEach(v => {
    if (fs.existsSync(path.resolve(process.cwd(), `./src/views/${v}`))) {
      existFileList.push(v)
    }
  })
  
  if (existFileList.length) {
    // 有存在页面模块
    console.log(chalk.bold.red(`\n页面模板`) + chalk.bold.yellow(` ${existFileList.join(' | ')} `) + chalk.bold.red(`已存在, 添加失败\n`))
    return ;
  } else {
    // 无存在页面模块 可正常添加
    pages.forEach(v => {
      shell.mkdir('-p', `./src/views/${v}`)
      shell.cp(path.resolve(__dirname, './vue-h5-template/views/*'), `./src/views/${v}`)
      shell.cp(path.resolve(__dirname, './vue-h5-template/template.html'), `./template/${v}.html`)
    })
  }
}

module.exports = vueh5