<template>
  <div class="m-zhanbu">

    <div class="m-djs">
      <!-- <img src="../assets/images/img-zhanbutime.png" /> -->
      <div id="countdown"></div>
    </div>
    <a v-if="!role" href="javascript:;" class="m-zbcardbtn" @click="tcShow=true">
      <img src="../assets/images/img-zhanbucard.png" />
    </a>
    <a v-if="role" href="javascript:;" class="m-zbcardbtn">
      <img src="../assets/images/img-zhanbucard.png" />
    </a>


    <!-- <div v-if="sign" class="m-dztypebox">占卜成功，区块确认中，请与10秒后在个人—占卜记录中进行查看。</div> -->
    <div v-show="tcShow" class="m-tcbg"></div>
    <div v-show="tcShow" class="m-contbox">
      <div class="m-txtbox">
        <div class="m-txt01">{{fjs}}</div>
        <div class="m-txt02">{{rolejs}}</div>
      </div>
      <div class="m-zbtcbtnbox">
        <a href="javascript:;" class="m-btn" @click="zhanbo()">
          <img src="../assets/images/img-txbtn01.png" />
        </a>
        <a href="javascript:;" class="m-btn" @click="close()">
          <img src="../assets/images/img-txbtn02.png" />
        </a>
      </div>
    </div>
    <notice v-show="sign">{{signData}}</notice>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tcShow: false,
        sign: false,
        signData: '',
        fjs: '',
        rolejs: '',
        nextTime: '',
        roleInfo: '',
        role:false,
      }
    },
    methods: {
      close() {
        this.tcShow = !this.tcShow
      },
      zhanbo() {
        let self = this;
        var zbfjs = self.fjs * 1 - 10;
        var zbjs = self.rolejs * 1 - 5;
        if (zbfjs < 0 || zbjs < 0) {
          self.signData = "方解石或精神力不足！";
          self.sign = true;
          self.tcShow = false;
          setTimeout(function () {
            self.sign = false;
          }, 2000)
        } else {
          var url = this.http184 + "/app/EnsContract";
          var type = 6666;
          var args = [sessionStorage.getItem("address"), "1002\u0004"];
          var result = this.$utils.contract(type, args, url, function (data) {
            self.tcShow = false;
            if (data.result == false) {
              self.signData = data.msg;
              self.sign = true;
              setTimeout(function () {
                self.sign = false;
              }, 2000)
            } else if (data.result == true) {
              self.tcShow = false;
              self.signData = "占卜成功，区块确认中，请与10秒后在个人—占卜记录中进行查看。";
              self.sign = true;
              setTimeout(function () {
                self.sign = false;
              }, 2000)
              self.init()
            }
            console.log("返回结果", data);
          });
        }




      },
      roleInit() {
        var _this = this;
        var params = {
          address: sessionStorage.getItem("address")
        }
        _this.$axios({
          method: 'get',
          url: _this.http184 + '/wb/role',
          params: params
        }).then((res) => {
          _this.role = res.data.data;
          if (_this.role.nickname != '') {
            _this.proname = _this.role.nickname;
            _this.fjs = _this.role.str5;
            _this.rolejs = _this.role.rolejs;
            _this.nextTime = _this.role.nexttime;
            if (_this.fjs == '') {
              _this.fjs = '0';
            }
            _this.part = true;
          }
        }, (error) => {
          console.log(error);
        });
      },
      roleInit() {
        var _this = this;
        var params = {
          address: sessionStorage.getItem("address")
        }
        _this.$axios({
          method: 'get',
          url: _this.http184 + '/wb/role',
          params: params
        }).then((res) => {
          if(res.data.data == null){
            _this.role = true;
            _this.signData = '请先创建角色';
            _this.sign = true;
          }else{
            _this.roleInfo = res.data.data;
          }
        }, (error) => {
          console.log(error);
        });
      },
      init() {
        this.roleInit();
        setTimeout(() => {

          var width = window.innerWidth;
          var w = 0;
          if (width >= 320 && width <= 374) {
            w = 180
          } else if (width >= 375 && width <= 413) {
            w = 220
          } else if (width <= 414) {
            w = 0;
          }
          var b = new Date;
          var b = -b.getTimezoneOffset() / 60;
          // var i = '2018/7/10 10:00:00';
          var i = this.nextTime;
          var config = {
            timeText: i, //倒计时时间
            timeZone: b, //时区
            style: "flip", //显示的样式，可选值有flip,slide,metal,crystal
            color: "black", //显示的颜色，可选值white,black
            width: w, //倒计时宽度
            textGroupSpace: 12, //天、时、分、秒之间间距
            textSpace: 0, //数字之间间距
            reflection: 0, //是否显示倒影
            reflectionOpacity: 10, //倒影透明度
            reflectionBlur: 0, //倒影模糊程度
            dayTextNumber: 3, //倒计时天数数字个数
            displayDay: 0, //是否显示天数!0为是 0 为否
            displayHour: 0, //是否显示小时数
            displayMinute: !0, //是否显示分钟数
            displaySecond: !0, //是否显示秒数
            displayLabel: !0, //是否显示倒计时底部label
            onFinish: function () {}
          };
          // $("#countdown").jCountdown("destroy");
          $("#countdown").jCountdown(config);
        }, 100);
      }
    },
    mounted() {
      this.roleInit();
      this.init();
    }
  }
</script>

<style>
  .m-zhanbu {
    width: 100%;
    height: 100%;
    display: inline-block;
    background: url("../assets/images/bg-zb.png") no-repeat;
    background-size: 100% 100%;
    text-align: center;
  }

  .m-zhanbu .m-djs {
    width: 6.25rem;
    height: 2.63rem;
    margin: 2rem auto 0;
    /* display: inline-block; */
  }

  .m-zhanbu .m-djs img {
    width: 100%;
    height: 100%;
    vertical-align: top;
  }

  .m-zhanbu .m-zbcardbtn {
    width: 7.98rem;
    height: 11.61rem;
    display: inline-block;
    margin: .2rem auto 0;
  }

  .m-zhanbu .m-zbcardbtn img {
    width: 100%;
    height: 100%;
    vertical-align: top;
  }

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
    margin-top: 6.52rem;
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