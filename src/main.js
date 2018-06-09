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

Vue.prototype.$axios = axios
Vue.prototype.$AschJS = AschJS

Vue.prototype.http184 = "http://47.106.205.184";
Vue.prototype.http189 = "http://119.23.57.189:4096";

Vue.component(main.name, main)
Vue.component(notice.name, notice)


new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
