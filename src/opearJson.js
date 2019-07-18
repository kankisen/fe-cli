const fs = require('fs')

/**
 * 读取json文件
 * @param {String} path  
 */
const readJson = (path) => {
  // eslint-disable-next-line no-undef
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (!err) {
        resolve(JSON.parse(data))
      } else {
        reject('读取失败')
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


module.exports = {
  readJson,
  writeJson
}