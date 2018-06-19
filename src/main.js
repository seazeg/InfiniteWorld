import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './assets/css/base.css'
import './assets/css/jcountdown.css'
import main from './components/layout/main.vue'
import notice from './components/layout/notice.vue'
import axios from 'axios'
import AschJS from 'asch-js'
import utils from './utils'

Vue.prototype.$axios = axios
Vue.prototype.$AschJS = AschJS
Vue.prototype.$utils = utils

Vue.prototype.http184 = "http://47.106.205.184";
Vue.prototype.http189 = "http://119.23.57.189:4096";
Vue.prototype.dappId = "9ff587bcf3d054946f55ed1f3c0618cd6d2100a162cf6d4993c284e28b7c35fc"

Vue.component(main.name, main)
Vue.component(notice.name, notice)



router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (!!sessionStorage.getItem("address")) { 
      next();
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next();
  }
})


new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
