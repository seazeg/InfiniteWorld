import Vue from 'vue'
import Router from 'vue-router'
import main from '../components/layout/main.vue'
import login from '../components/login.vue'
import center from '../components/center.vue'
import centerMake from '../components/center_make.vue'
import card from '../components/center_card.vue'
import chart from '../components/center_chart.vue'
import wall from '../components/center_wall.vue'
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
  },{
    //个人中心-打造记录
    path: '/centerMake',
    name: 'centerMake',
    component: centerMake,
    meta:{
      title:"打造记录"
    }
  },{
    //个人中心-卡牌图鉴
    path: '/card',
    name: 'card',
    component: card,
    meta:{
      title:"卡牌图鉴"
    }
  },{
    //个人中心-排行榜
    path: '/chart',
    name: 'chart',
    component: chart,
    meta:{
      title:"排行榜"
    }
  },{
    //个人中心-钱包
    path: '/wall',
    name: 'wall',
    component: wall,
    meta:{
      title:"排行榜"
    }
  },{
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
