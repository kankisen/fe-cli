/**
 * 路径集合
 */ 

// 模板拉取地址Map
const templateGitAddress = {
  'vue-h5': 'http://gitlab.sftcwl.com/osz_fe/fe-vue-h5-template.git',
  'vue-web': 'http://gitlab.sftcwl.com/osz_fe/fe-vue-web-template.git',
  'vue-web-cls': 'http://gitlab.sftcwl.com/osz_fe/fe-vue-web-cls-template.git',
  'react-web': '',
  'react-h5': '',
  'taro': '',
}

// 版本对比地址Map
const templateVersionAddress = {
  'vue-h5': 'http://gitlab.sftcwl.com/osz_fe/fe-vue-h5-template/raw/master/package.json',
  'vue-web': 'http://gitlab.sftcwl.com/osz_fe/fe-vue-web-template/raw/master/package.json',
  'vue-web-cls': 'http://gitlab.sftcwl.com/osz_fe/fe-vue-web-cls-template/blob/master/package.json',
  'react-web': '',
  'react-h5': '',
  'taro': '',
}

module.exports = {
  templateGitAddress,
  templateVersionAddress,
}
