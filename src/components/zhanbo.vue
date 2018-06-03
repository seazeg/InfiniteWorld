<template>
    <div class="m-zhanbu">
        <div class="m-djs"><img src="../assets/images/img-zhanbutime.png" /></div>
        <a href="javascript:;" class="m-zbcardbtn"><img src="../assets/images/img-zhanbucard.png" /></a>
        <div v-if="sign" class="m-dztypebox">占卜成功，区块确认中，请与10秒后在个人—占卜记录中进行查看。</div>
        <div v-show="tcShow" class="m-tcbg"></div>
        <div v-show="tcShow" class="m-contbox">
        <div class="m-txtbox">
            <div class="m-txt01">200</div>
            <div class="m-txt02">200</div>
        </div>
        <div class="m-zbtcbtnbox">
            <a href="javascript:;" class="m-btn" @click="close()">
            <img src="../assets/images/img-txbtn01.png" />
            </a>
            <a href="javascript:;" class="m-btn" @click="close()">
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
      	tcShow: true,
        sign: true,

      }
    },
    methods: {
      close() {
        this.tcShow = !this.tcShow
      },

    }
}
</script>

<style>
.m-zhanbu{ width:100%;height:100%; display:inline-block;background: url("../assets/images/bg-zb.png") no-repeat;background-size: 100% 100%; text-align: center;}
.m-zhanbu .m-djs{ width: 6.25rem; height: 2.63rem;margin: 2rem auto 0; display: inline-block;}
.m-zhanbu .m-djs img{width: 100%;height: 100%;vertical-align: top;}
.m-zhanbu .m-zbcardbtn{ width: 7.98rem; height: 11.61rem; display: inline-block; margin: .2rem auto 0;}
.m-zhanbu .m-zbcardbtn img{width: 100%;height: 100%;vertical-align: top;}
.m-zhanbu .m-contbox {
    width: 10.24rem;
    height: 10.41rem;
    display: inline-block;
    position: fixed;
    left: 50%;
    top: 50%;
    margin: -5.12rem 0 0 -5.2rem;
    background: url("../assets/images/bg-zbtc.png") no-repeat;
    background-size: 100% 100%;
    z-index: 2000;
    text-align: center;
  }

.m-zhanbu .m-contbox .m-txtbox {
    width: 100%;
    margin-top: 6.52rem ;
    display: inline-block;
  }
.m-zhanbu .m-contbox .m-txtbox .m-txt01 {
    width: 1rem;
    margin-left: 4.1rem;
    float: left;
    display: inline-block;
    font-size: .42rem;
    color: #eda41a;
    text-shadow: 0 0 10px #3f291b;
  }
.m-zhanbu .m-contbox .m-txtbox .m-txt02 {
    width: 1rem;
    margin-left: 1.65rem;
    float: left;
    display: inline-block;
    font-size: .42rem;
    color: #eda41a;
    text-shadow: 0 0 10px #3f291b;
  }
.m-zhanbu .m-zbtcbtnbox {
    width: auto;
    display: inline-block;
    margin: .8rem auto 0;
  }

.m-zhanbu .m-zbtcbtnbox .m-btn {
    width: 2.95rem;
    height: 1.2rem;
    display: inline-block;
    margin: 0 .4rem 0;
  }

.m-zhanbu .m-zbtcbtnbox .m-btn img {
    width: 100%;
    height: 100%;
    vertical-align: top;
  }
</style>
