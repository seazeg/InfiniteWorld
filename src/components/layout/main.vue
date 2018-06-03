<template>
  <div class="iw_main">
    <div class="top">{{$route.meta.title}}</div>
    <div class="content">
      <transition name="component-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <div class="menu" v-show="isShow">
      <div @click="go('menu1')">
        <img src="../../assets/images/menu1.jpg" v-if="!menu1">
        <img src="../../assets/images/menu1_hover.jpg" v-else>
      </div>
      <div @click="go('menu2')">
        <img src="../../assets/images/menu2.jpg" v-if="!menu2">
        <img src="../../assets/images/menu2_hover.jpg" v-else>
      </div>
      <div @click="go('menu3')">
        <img src="../../assets/images/menu3.jpg" v-if="!menu3">
        <img src="../../assets/images/menu3_hover.jpg" v-else>
      </div>
      <div @click="go('menu4')">
        <img src="../../assets/images/menu4.jpg" v-if="!menu4">
        <img src="../../assets/images/menu4_hover.jpg" v-else>
      </div>
      <div @click="go('menu5')">
        <img src="../../assets/images/menu5.jpg" v-if="!menu5">
        <img src="../../assets/images/menu5_hover.jpg" v-else>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "layout",
    data() {
      return {
        menu1: this.$route.name == "zhanbo",
        menu2: this.$route.name == "market",
        menu3: this.$route.name == "role",
        menu4: this.$route.name == "dazao",
        menu5: this.$route.name == "center" || this.$route.name == "centerMake",
        isShow: this.$route.name != "loading" && this.$route.name != "login"

      }
    },
    methods: {
      go(type) {
        if (type == "menu1") {
          this.$router.push({
            path: "/zhanbo"
          })
        } else if (type == "menu2") {
          this.$router.push({
            path: "/market"
          })
        } else if (type == "menu3") {
          this.$router.push({
            path: "/role"
          })
        } else if (type == "menu4") {
          this.$router.push({
            path: "/dazao"
          })
        } else if (type == "menu5") {
          this.$router.push({
            path: "/center"
          })
        }
      }
    },
    updated() {
      this.menu1 = this.$route.name == "zhanbo";
      this.menu2 = this.$route.name == "market";
      this.menu3 = this.$route.name == "role";
      this.menu4 = this.$route.name == "dazao";
      this.menu5 = this.$route.name == "center" || this.$route.name == "centerMake";
      this.isShow = this.$route.name != "loading" && this.$route.name != "login";
    }
  }

</script>

<style>
  .iw_main {
    overflow: hidden;
    background: url("../../assets/images/com_bg.jpg") repeat-y;
    background-size: 100%;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .iw_main .menu {
    width: 100%;
    position: fixed;
    bottom: 0;
    background: url("../../assets/images/menubg.jpg") repeat-x;
    background-size: 100% 100%;
  }

  .iw_main .menu img {
    display: block;
    width: 20%;
    float: left;

  }

  .iw_main .top {
    background: #472c0e;
    font-size: 0.5rem;
    padding: 10px 0;
    text-align: center;
  }

  .iw_main .content {
    /*padding: 10px;*/
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }

</style>
