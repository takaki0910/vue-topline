import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);
//导入路由组件
import home from '../views/home/index.vue'
import login from '../views/login/index.vue'

//配置路由规则
const routes = [
  { path: '/login', component: login },
  { path: '/home', component: home }
]

//实例化路由
const router = new VueRouter({
  routes
})

//将路由对象暴露出去,然后再mian.js里接收  继而挂载到vue实例即可
export default router;