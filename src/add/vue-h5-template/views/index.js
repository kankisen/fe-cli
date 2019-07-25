import Vue from 'vue';
import 'lib-flexible/flexible';
import '@cli/components/componentRegister';
import Throttle from '@cli/components/Throttle';
import registryToast from '@cli/components/Toast';
import '@cli/reset.css';

import router from './router';
import store from './store';
import App from './Index.vue';

Vue.component('Throttle', Throttle);
Vue.use(registryToast);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

document.title = '';
