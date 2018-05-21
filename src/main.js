import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './assets/css/base.css'
import main from './components/layout/main.vue'
import axios from 'axios'

Vue.prototype.$axios = axios

Vue.component(main.name, main)

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
