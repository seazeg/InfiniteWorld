import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './assets/css/base.css'
import main from './components/layout/main.vue'
import notice from './components/layout/notice.vue'
import axios from 'axios'

Vue.prototype.$axios = axios

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
