const axios = require('axios')
const clone = require('git-clone')
const shell = require('shelljs')
const fs = require('fs')
const path = require('path')
const ora = require('ora')
const emoji = require('node-emoji')
const chalk = require('chalk')
const { templateVersionAddress, templateGitAddress } = require('../pathMap')
const { readJson, writeJson, getToken, setToken, versionContrast } = require('../utils')
const { installType } = require('../install')
let currentVersion = ''
const vueh5 = (version) => {
  // 将待更新模板项目版本号进行缓存
  if (!currentVersion) {
    currentVersion = version
  }
  const privateToken = getToken()
  if (privateToken) {
    // 存在缓存私钥 
    // 初始化版本地址
    const url = templateVersionAddress['vue-h5']

    // 读取线上模板package.json文件 进行版本对比
    axios({
      url,
      method: 'GET',
      headers: {
        'PRIVATE-TOKEN': privateToken
      }
    }).then(res => {
      // 请求成功
      // 判断返回地址与请求地址是否一致
      if (res.request.res.responseUrl === url) {
        // 访问成功
        // 一致 用户有权限正常访问
        const templateVersion = res.data.version

        // 版本对比
        versionContrast(currentVersion, templateVersion)
    
        const spinner = ora({
          color: 'yellow',
          text: `${emoji.emojify(':rocket:  更新中... 稍等')}\n`,
        })
        spinner.start()
        clone(
          templateGitAddress['vue-h5'],
          'updateFile',
          null, 
          () => {
            fs.exists(path.resolve(process.cwd(), './cli'), function(exist) {
              // 更新cli部分
              if (exist) {
                shell.rm('-rf', './cli')
              }
              shell.mv('./updateFile/cli', './')
              shell.rm('-rf', './updateFile')
              // 更新package.json
              readJson(path.resolve(process.cwd(), './package.json')).then(resJson => {
                const templatePackageJson = res.data
                let newPackageJson = { ...resJson }
                newPackageJson.version = templatePackageJson.version
                newPackageJson.dependencies = Object.assign({}, newPackageJson.dependencies, templatePackageJson.dependencies)
                newPackageJson.devDependencies = Object.assign({}, newPackageJson.devDependencies, templatePackageJson.devDependencies)
                shell.rm('-rf', './package.json', 'node_modules')
                writeJson(path.resolve(process.cwd(), './package.json'), newPackageJson).then(() => {
                  // 删除node_modules 重新安装包 
                  // 判断之前是npm 安装还是yarn安装
                  shell.rm('-rf', './node_modules')
                  const type = installType()
                  console.log(type)
                  shell.rm('-rf', './yarn.lock')
                  shell.rm('-rf', './package-lock.json')
                  if (!type) {
                    console.log(chalk.bold.green('请手动安装依赖包'))
                  } else {
                    shell.exec(`${type} install`)
                  }
                  spinner.stop()
                  console.log(chalk.bold.green('\n更新完成\n'))
                }, (err) => {
                  console.log(err)
                })
              }, (err) => {
                console.log(err)
              })
            })
          }
        )
      } else {
        // 当前用户私钥不正确
        console.log(chalk.bold.red(`\n${emoji.emojify(':thinking_face:')}  当前私钥不正确\n`))
        privateTokenErrorFarmat()
      }
    }, err => {
      if (err.response.status === 404) {
        // 无权限访问
        console.log(chalk.bold.red(`${emoji.emojify(':thinking_face:')}  当前私钥无访问vue-h5模板权限\n`))
        privateTokenErrorFarmat()
      } else {
        // 请求异常
        console.log(chalk.bold.red(`${emoji.emojify(':thinking_face:')}  ${err.response.statusText}`))
        process.exit()
      }
    });
  } else {
    // 不存在私钥
    privateTokenErrorFarmat()
  }
}

/**
 * 私钥不存在 或 非法私钥处理
 */
const privateTokenErrorFarmat = () => {
  setToken().then(() => {
    vueh5()
  })
}

module.exports = vueh5;