import Vue from 'vue'
import Router from 'vue-router'
import main from '../components/layout/main.vue'
import login from '../components/login.vue'
import center from '../components/center.vue'
import make from '../components/center_make.vue'
import card from '../components/center_card.vue'
import chart from '../components/center_chart.vue'
import wall from '../components/center_wall.vue'
import divine from '../components/center_divine.vue'
import invit from '../components/center_invit.vue'
import market from '../components/market.vue'
import role from '../components/role.vue'
import dazao from '../components/dazao.vue'
import zhanbo from '../components/zhanbo.vue'
import loading from '../components/layout/loading.vue'

Vue.use(Router)

var routes = [{
  //打造
  path: '/loading',
  name: 'loading',
  component: loading,
  meta: {
    title: "加载中"
  }
}, {
  path: "/",
  name: "home",
  component: main,
  children: [{
    //登录
    path: 'login',
    name: 'login',
    component: login,
    meta: {
      title: "登录"
    }
  }, {
    //个人中心
    path: '/center',
    name: 'center',
    component: center,
    meta: {
      title: "个人中心",
      requireAuth:true
    }
  }, {
    //个人中心-打造记录
    path: '/make',
    name: 'make',
    component: make,
    meta: {
      title: "打造记录",
      requireAuth:true
    }
  }, {
    //个人中心-卡牌图鉴
    path: '/card',
    name: 'card',
    component: card,
    meta: {
      title: "卡牌图鉴",
      requireAuth:true
    }
  }, {
    //个人中心-排行榜
    path: '/chart',
    name: 'chart',
    component: chart,
    meta: {
      title: "排行榜",
      requireAuth:true
    }
  }, {
    //个人中心-钱包
    path: '/wall',
    name: 'wall',
    component: wall,
    meta: {
      title: "钱包",
      requireAuth:true
    }
  }, {
    //个人中心-占卜记录
    path: '/divine',
    name: 'divine',
    component: divine,
    meta: {
      title: "占卜记录",
      requireAuth:true
    }
  }, {
    //个人中心-邀请好友
    path: '/invit',
    name: 'invit',
    component: invit,
    meta: {
      title: "邀请好友",
      requireAuth:true
    }
  }, {
    //市场
    path: '/market',
    name: 'market',
    component: market,
    meta: {
      title: "市场",
      requireAuth:true
    }
  }, {
    //角色
    path: '/role',
    name: 'role',
    component: role,
    meta: {
      title: "角色",
      requireAuth:true
    }
  }, {
    //占卜
    path: '/zhanbo',
    name: 'zhanbo',
    component: zhanbo,
    meta: {
      title: "占卜",
      requireAuth:true
    }
  }, {
    //打造
    path: '/dazao',
    name: 'dazao',
    component: dazao,
    meta: {
      title: "打造",
      requireAuth:true
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