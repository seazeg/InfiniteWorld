import Vue from 'vue'
import Router from 'vue-router'
import main from '../components/layout/main.vue'
import login from '../components/login.vue'
import center from '../components/center.vue'
import market from '../components/market.vue'
import role from '../components/role.vue'
import dazao from '../components/dazao.vue'
import zhanbo from '../components/zhanbo.vue'
import loading from '../components/layout/loading.vue'

Vue.use(Router)

var routes = [{
  path:"/",
  name:"home",
  component:main,
  children:[{
    //登录
    path: 'login',
    name: 'login',
    component: login,
    meta:{
      title:"登录"
    }
  }, {
    //个人中心
    path: '/center',
    name: 'center',
    component: center,
    meta:{
      title:"个人中心"
    }
  }, {
    //市场
    path: '/market',
    name: 'market',
    component: market,
    meta:{
      title:"市场"
    }
  }, {
    //角色
    path: '/role',
    name: 'role',
    component: role,
    meta:{
      title:"角色"
    }
  }, {
    //占卜
    path: '/zhanbo',
    name: 'zhanbo',
    component: zhanbo,
    meta:{
      title:"占卜"
    }
  }, {
    //打造
    path: '/dazao',
    name: 'dazao',
    component: dazao,
    meta:{
      title:"打造"
    }
  }, {
    //打造
    path: '/loading',
    name: 'loading',
    component: loading,
    meta:{
      title:"加载中"
    }
  }, {
    //打造
    path: '*',
    redirect: '/center'
  }]
}]

export default new Router({
  routes: routes
})
