<template>
  <div class="center">
    <div class="m-vipmes">
      <div class="img-hd">
        <img src="../assets/images/img-hd.png" />
      </div>
      <div class="m-name">易老斯</div>
      <a class="z-buildbtn" @click="open()">
        <img src="../assets/images/img-build.png" />
      </a>
    </div>
    <div class="m-btnbox">
      <div class="m-list">
        <span>签到</span>
      </div>
      <div class="m-list">
        <span>占卜记录</span>
      </div>
      <div class="m-list" @click="go('make')">
        <span>打造记录</span>
      </div>
      <div class="m-list">
        <span>钱包</span>
      </div>
      <div class="m-list">
        <span>卡牌图鉴</span>
      </div>
      <div class="m-list">
        <span>排行榜</span>
      </div>
      <div class="m-list">
        <span>邀请好友</span>
      </div>
    </div>
    <div v-show="tcShow" class="m-tcbg"></div>
    <div v-show="tcShow" class="m-contbox">
      <div class="m-txt">本次角色创建需消耗200ENS</div>
      <input type="text" class="m-nameipt" maxlength="4" />
      <input type="text" class="m-invitcode" maxlength="4" />
      <div class="m-tcbtnbox">
        <a href="javascript:;" class="m-btn" @click="open()">
          <img src="../assets/images/img-txbtn01.png" />
        </a>
        <a href="javascript:;" class="m-btn" @click="open()">
          <img src="../assets/images/img-txbtn02.png" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tcShow: false,
        left: {
          role1: true,
          role2: false,
          role3: false,
          role4: false
        },
        rolezb: false,
        noticeShow: false,
        rolefj: false,
        rolesj: false,
        roleENS: ""
      }
    },
    methods: {
      open() {
        this.tcShow = !this.tcShow
      },
      go(type) {
        if (type == "make") {
          this.$router.push({
            path: "/centerMake"
          })
        }
        // else if (type == "menu2") {
        //   this.$router.push({
        //     path: "/market"
        //   })
        // } 
      }
    }

  }

</script>

<style>
  .center {
    width: 100%;
    height: 24.56rem;
    margin-bottom: 2.4rem;
    display: inline-block;
    background: url("../assets/images/img-vipbg01.png") no-repeat;
    background-size: 100% 100%;
  }

  .center .m-vipmes {
    width: 9rem;
    height: 2.5rem;
    margin: 1.2rem auto 0;
  }

  .center .m-vipmes .img-hd {
    width: 1.96rem;
    height: 1.96rem;
    display: inline-block;
    float: left;
    border-radius: 50%;
    overflow: hidden;
    margin: .2rem 0 0 .56rem;
  }

  .center .m-vipmes .img-hd img {
    width: 100%;
    height: 100%;
    vertical-align: top;
  }

  .center .m-vipmes .m-name {
    width: auto;
    max-width: 3rem;
    float: left;
    display: inline-block;
    font-size: .5rem;
    color: #472c0e;
    margin: .9rem 0 0 .2rem;
  }

  .center .m-vipmes .z-buildbtn {
    width: 3.8rem;
    height: 1.5rem;
    display: inline-block;
    float: right;
    margin: .5rem .4rem 0 0;
  }

  .center .m-vipmes .z-buildbtn img {
    width: 100%;
    height: 100%;
    vertical-align: top;
  }

  .center .m-btnbox {
    width: 8.9rem;
    height: 2.8rem;
    margin: .4rem auto 0;
  }

  .center .m-btnbox .m-list {
    width: 8.9rem;
    height: 2.82rem;
    text-align: center;
  }

  .center .m-btnbox .m-list span {
    width: auto;
    margin: 1rem auto 0;
    font-size: .4rem;
    color: #eebc7f;
    display: inline-block;
  }

  .center .m-btnbox .m-list:last-child span {
    margin: 1.2rem auto 0;
  }

  .m-tcbg {
    display: inline-block;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 1000;
    background: #000;
    opacity: .6;
    left: 0;
    top: 0;
  }

  .m-contbox {
    width: 10.24rem;
    height: 11.74rem;
    display: inline-block;
    position: fixed;
    left: 50%;
    top: 50%;
    margin: -5.87rem 0 0 -5.12rem;
    background: url("../assets/images/bg-jstc.png") no-repeat;
    background-size: 100% 100%;
    z-index: 2000;
    text-align: center;
  }

  .m-contbox .m-txt {
    width: 54%;
    line-height: .6rem;
    margin: 3.2rem 25% 0 21%;
    display: inline-block;
    font-size: .42rem;
    color: #eda41a;
    text-shadow: 0 0 10px #3f291b;
    max-height: 1.1rem;
    overflow: hidden;
  }

  .m-contbox .m-nameipt {
    width: 3.8rem;
    height: .72rem;
    display: inline-block;
    margin: .6rem 0 0 1.6rem;
    border: none;
    background: none;
    outline: none;
    font-size: .32rem;
    text-align: center;
  }

  .m-contbox .m-invitcode {
    width: 2.5rem;
    height: .6rem;
    display: inline-block;
    margin: 1.5rem 1rem 0 2.4rem;
    border: none;
    background: none;
    outline: none;
    font-size: .32rem;
    text-align: center;
  }

  .m-tcbtnbox {
    width: auto;
    display: inline-block;
    margin: 1.4rem auto 0;
  }

  .m-tcbtnbox .m-btn {
    width: 2.95rem;
    height: 1.2rem;
    display: inline-block;
    margin: 0 .4rem 0;
  }

  .m-tcbtnbox .m-btn img {
    width: 100%;
    height: 100%;
    vertical-align: top;
  }

</style>
