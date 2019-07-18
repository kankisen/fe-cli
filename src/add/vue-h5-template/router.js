import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

/**
 * [首页]
 */
const Index = () => import(/* webpackChunkName: 'index' */ './Index.vue');

const routes = [
  {
    path: '/',
    component: Index,
  },
];
export default new VueRouter({
  mode: 'history',
  routes,
});
