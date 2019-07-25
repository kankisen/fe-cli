import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  actions: {},
  mutations: {
    SET_STATE: (state, payload) => {
      Object.entries(payload).forEach(([key, value]) => {
        state[key] = value;
      });
    },
  },
});
