import { cloneDeep } from 'lodash-es';
// import {  } from '@api';
import { commonMutations, commonActions } from '../common';

const state = {
};

// 初始化备用state
const initState = cloneDeep(state);

const actions = {
  ...commonActions,
};

const mutations = {
  ...commonMutations,
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
