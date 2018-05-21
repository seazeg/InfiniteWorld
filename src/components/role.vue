<template>
  <div class="role">
    <img src="../assets/images/role_button.png" alt="" @click="open">
    <transition name="component-fade" mode="out-in">
      <div class="layer" v-show="layerShow">
        <div class="left">
          <p @click="change(1)">
            <img src="../assets/images/role1.jpg" alt="" v-if="!left.role1">
            <img src="../assets/images/role1_hover.jpg" alt="" v-else>
          </p>
          <p @click="change(2)">
            <img src="../assets/images/role2.jpg" alt="" v-if="!left.role2">
            <img src="../assets/images/role2_hover.jpg" alt="" v-else>
          </p>
          <p @click="change(3)">
            <img src="../assets/images/role3.jpg" alt="" v-if="!left.role3">
            <img src="../assets/images/role3_hover.jpg" alt="" v-else>
          </p>
          <p @click="change(4)">
            <img src="../assets/images/role4.jpg" alt="" v-if="!left.role4">
            <img src="../assets/images/role4_hover.jpg" alt="" v-else>
          </p>
        </div>
        <div class="right">
          <div v-if="left.role1">1</div>
          <div v-if="left.role2">2</div>
          <div v-if="left.role3">3</div>
          <div v-if="left.role4">4</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        layerShow: false,
        left: {
          role1: true,
          role2: false,
          role3: false,
          role4: false
        }
      }
    },
    methods: {
      open() {
        this.layerShow = !this.layerShow
      },
      change(type) {
        if (type == 1) {
          this.left.role1 = true
          this.left.role2 = false
          this.left.role3 = false
          this.left.role4 = false
        } else if (type == 2) {
          this.left.role1 = false
          this.left.role2 = true
          this.left.role3 = false
          this.left.role4 = false
        } else if (type == 3) {
          this.left.role1 = false
          this.left.role2 = false
          this.left.role3 = true
          this.left.role4 = false
        } else if (type == 4) {
          this.left.role1 = false
          this.left.role2 = false
          this.left.role3 = false
          this.left.role4 = true
        }
      }
    }
  }

</script>

<style>
  .role>img {
    width: 100%;
    position: absolute;
    bottom: 10%;
  }

  .role .layer {
    background: url("../assets/images/role_pop.png") no-repeat;
    background-size: 100%;
    width: 95%;
    height: 480px;
    position: absolute;
    top: 12%;
  }

  .role .layer .left {
    position: relative;
    width: 28%;
    margin-left: 4.5%;
    display: inline-block;
    margin-top: 35px;
  }

  .role .layer .left>p {
    width: 100%;
  }

  .role .layer .left>p img {
    width: 100%;

  }

  .role .layer .right {
    width: 60%;
    float: right;
   margin-top: 35px;

  }

</style>
