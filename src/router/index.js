import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login.vue'
import center from '../components/center.vue'
import market from '../components/market.vue'
import role from '../components/role.vue'
import dazao from '../components/dazao.vue'
import zhanbo from '../components/zhanbo.vue'
import loading from '../components/layout/loading.vue'

Vue.use(Router)

var routes = [{
  //登录
  path: '/login',
  name: 'login',
  component: login
}, {
  //个人中心
  path: '/center',
  name: 'center',
  component: center
}, {
  //市场
  path: '/market',
  name: 'market',
  component: market
}, {
  //角色
  path: '/role',
  name: 'role',
  component: role
}, {
  //占卜
  path: '/zhanbo',
  name: 'zhanbo',
  component: zhanbo
}, {
  //打造
  path: '/dazao',
  name: 'dazao',
  component: dazao
}, {
  //打造
  path: '/loading',
  name: 'loading',
  component: loading
}, {
  //打造
  path: '*',
  redirect: '/center'
}]

export default new Router({
  routes: routes
})
