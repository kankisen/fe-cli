#! /usr/bin/env node
const commander = require('commander')
const chalk = require('chalk')
const inquirer = require('inquirer')
const ora = require('ora')
const figlet = require('figlet')
const clone = require('git-clone')
const shell = require('shelljs')
const emoji = require('node-emoji')
const fs = require('fs')
const path = require('path')
const dispatch = require('./src/dispatch')
const { templateGitAddress } = require('./src/map')
const { readJson, writeJson } = require('./src/opearJson')
const { install } = require('./src/install')

// 缺少参数错误修改
// #region
commander.Command.prototype.missingArgument = function(name) {
  if (name === 'name') {
    console.log(chalk.bold.red('\nerror: 文件夹名称 <name> 必填项丢失\n'))
    commander.outputHelp()
    console.log(chalk.bold.green('\n举个栗子:'))
    console.log(chalk.bold.blue('zhan init demo\n'))
  } else {
    console.log(`参数错误 ---> ${name}`)
  }
  process.exit()
}
// #endregion


commander
  .version(require('./package.json').version, '-v --version')

// 项目初始化
// #region
commander
  .command('init <name>')
  .description('项目初始化 文件名称必填')
  .action((name) => {
    console.log(chalk.bold.green(figlet.textSync('F E - C L I')))
    const existFile = fs.readdirSync(path.resolve(process.cwd(), './'))
    inquirer.prompt([
      {
        type: 'input',
        name: 'proName',
        message: emoji.emojify(':star:  项目文件夹名称'),
        default: name || 'demo',
        validate: (v) => {
          if (existFile.includes(v)) {
            return '当前目录已存在此文件夹， 请重新命名'
          }
          return true
        }
      },
      {
        type: 'input',
        name: 'proDesc',
        message: emoji.emojify(':writing_hand:  项目描述'),        default: 'A Template Project'
      },
      {
        type: 'input',
        name: 'proDeveloper',
        message: emoji.emojify(':male-farmer:  开发者'),
        default: 'fe'
      },
      {
        type: 'list',
        name: 'proTemplate',
        message: emoji.emojify(':bookmark_tabs:  请选择使用的模板'),
        choices: ['vue-web', 'vue-h5', 'react-web', 'react-h5', 'taro'],
      },
    ]).then(res => {
      const spinner = ora({
        color: 'yellow',
        text: `${emoji.emojify(':running:  模板代码拉取中... 莫慌')}\n`,
      })

      const installSpinner = ora({
        color: 'yellow',
        text: `${emoji.emojify(':running:  包安装中... 稍等')}\n`,
      })
      const { proDesc, proDeveloper, proTemplate } = res
      
      // 暂时只开发vue-h5模板  todo  后续模板待补充
      if (proTemplate !== 'vue-h5') {
        console.log(chalk.bold.red(`\n${emoji.emojify(':sob:')}  ${proTemplate}模板暂未开放\n`))
        process.exit()
      }

      // loading给我转起来
      spinner.start()
      // git clone 拉取对应模板代码
      clone(
        templateGitAddress[proTemplate],
        name,
        null, 
        () => {
          // loading给我拉闸
          spinner.stop()
          console.log(chalk.bold.green(emoji.emojify('\n:call_me_hand: :call_me_hand: :call_me_hand:  模板代码拉取完毕\n')))
          shell.rm('-rf', `./${name}/.git`)
          shell.mkdir('-p', `./${name}/static`)
          readJson(path.resolve(process.cwd(), `./${name}/package.json`)).then((info) => {
            const newInfo = Object.assign({}, info, {
              name,
              description: proDesc,
              developer: proDeveloper,
            })
            writeJson(path.resolve(process.cwd(), `./${name}/package.json`), newInfo).then(() => {
              install().then(res => {
                if (res.installType === '手动安装') {
                  console.log(chalk.bold.green(`\n cd ${name}\n\n 阅读模板README文档启动项目\n`))
                } else {
                  installSpinner.start()
                  shell.cd(name)
                  shell.exec(`${res.installType} install`)
                  installSpinner.stop()
                  console.log(chalk.bold.green(`\n cd ${name}\n\n 阅读模板README文档启动项目 \n\n ${res.installType} run dev ${chalk.bold.yellow('or')} ${res.installType} start\n`))
                }
              })
            }, (err) => {console.log(err)})
          }, (err) => {
            console.log(err)
          })
        }
      )
    })
  })
  .on('--help', () => {
    console.log(chalk.bold.green('\n举个栗子:'))
    console.log(chalk.bold.blue('zhan init demo\n'))
  })
// #endregion

// #region
// 项目更新
commander
  .command('update')
  .description('更新模板')
  .action(() => {
    dispatch('update')
  })
// #endregion

// #region
// 项目添加页面模块
commander
  .command('add')
  .description('添加页面模块')
  .action(() => {
    dispatch('add')
  })
// #endregion

// #region
// 非法命令处理
commander
  .command('*')
  .description('非指定命令')
  .action(() => {
    commander.outputHelp()
    console.log()
    console.log(`${chalk.bold.green(process.argv.slice(2)[0])} ${chalk.bold.red('命令不存在!')}`)
  })
// #endregion


commander.parse(process.argv)

// 未输入命令处理
if (!process.argv.slice(2).length) {
  commander.outputHelp()
  console.log()
  console.log(chalk.bold.red('请输入指定命令!'))
}