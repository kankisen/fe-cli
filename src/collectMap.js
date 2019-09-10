/**
 * 方法字典集合
 */ 

// update处理方法集合
const updateCollect = {
  'vue-h5': require('./update/vue-h5'),
  'vue-web': require('./update/vue-web'),
  // 'react-h5': require('./update/react-h5'),
  'react-web': require('./update/react-web'),
  'taro': require('./update/taro')
}

// add处理方法集合
const addCollect = {
  'vue-h5': require('./add/vue-h5'),
  'vue-web': require('./add/vue-web'),
  // 'react-h5': require('./add/react-h5'),
  'react-web': require('./add/react-web'),
  'taro': require('./add/taro')
}

module.exports = {
  updateCollect,
  addCollect,
}
