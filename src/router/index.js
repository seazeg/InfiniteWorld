import Vue from 'vue'
import Router from 'vue-router'
import evan from './evan'
import fire from './fire'

Vue.use(Router)

var routes = evan.concat(fire)
export default new Router({
  routes: routes
})
