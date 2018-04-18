// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import axios from 'axios'

Vue.config.productionTip = false
//安装vue-router
Vue.use(VueRouter);
//1. 导入组件
import goods from "./components/Goods/goods"
import Ratings from "./components/Ratings/Ratings"
import seller from "./components/seller/seller"

// 如果在其他组件中使用axios命令， 需要改写为vue原型属性
Vue.prototype.$axios = axios;

//2. 定义路由
const routes = [
  {
    path: "/",
    //重定向
    redirect: "/goods"
  },
  {
    path: '/goods',
    component: goods
  },
  {
    path: '/ratings',
    //不要写成components
    component: Ratings
  },
  {
    path: '/seller',
    component: seller
  }
];
//3. 创建router实例
const router = new VueRouter ({
  routes,
  //选中后的类名
  linkActiveClass: 'active'
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  //4. 创建和挂载根实例
  router
})
