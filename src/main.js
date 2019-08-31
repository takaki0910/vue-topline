import Vue from 'vue'
import App from './App.vue'

//导入axios
import axios from 'axios'
Vue.prototype.$axios = axios;

//导入element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//导入基础样式
import './assets/css/base.css'

//导入路由管理文件index.js
import router from './router/index.js'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
