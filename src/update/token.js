// 私钥token处理
const fs = require('fs');
const inquirer = require('inquirer')
const emoji = require('node-emoji')
const shell = require('shelljs')

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


module.exports = {
  getToken,
  setToken
}