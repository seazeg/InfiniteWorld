<template>
  <div class="center">
    <div class="m-vipmes">
      <div class="img-hd">
        <img src="../assets/images/img-hd.png" />
      </div>
      <div class="m-name">{{proname}}</div>
      <a v-if="!part" class="z-buildbtn" @click="open()">
        <img src="../assets/images/img-build.png" />
      </a>
      <div v-if="part" class="m-fjsbox">
        <i>
          <img src="../assets/images/ico-fjs.png" />
        </i>
        <div class="m-txt">{{fjs}}/300</div>
      </div>
    </div>
    <div class="m-btnbox">
      <div class="m-list" @click="signClick()">
        <span>签到</span>
      </div>
      <div class="m-list" @click="go('divine')">
        <span>占卜记录</span>
      </div>
      <div class="m-list" @click="go('make')">
        <span>打造记录</span>
      </div>
      <div class="m-list" @click="go('wall')">
        <span>钱包</span>
      </div>
      <div class="m-list" @click="go('card')">
        <span>卡牌图鉴</span>
      </div>
      <div class="m-list" @click="go('chart')">
        <span>排行榜</span>
      </div>
      <div class="m-list" @click="go('invit')">
        <span>邀请好友</span>
      </div>
    </div>
    <div v-show="tcShow" class="m-tcbg"></div>
    <div v-show="tcShow" class="m-contbox">
      <div class="m-txt">本次角色创建需消耗200ENS</div>
      <input type="text" class="m-nameipt" maxlength="6" v-model="name" />
      <input type="text" class="m-invitcode" maxlength="10" v-model="ma" />
      <div class="m-tcbtnbox">
        <a href="javascript:;" class="m-btn" @click="createRole()">
          <img src="../assets/images/img-txbtn01.png" />
        </a>
        <a href="javascript:;" class="m-btn" @click="tcShow=false">
          <img src="../assets/images/img-txbtn02.png" />
        </a>
      </div>
    </div>
    <div v-if="sign" class="m-typebox">{{signData}}</div>
    <!-- 签到成功，区块确认中，请与10秒后在角色—背包中进行查看。 -->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tcShow: false,
        sign: false,
        part: false,
        name: "",
        proname: "",
        ma: "",
        signData: '',
        role: '',
        fjs: "0",
        balancesList:[],
        newrole: false,
      }
    },
    methods: {
      createRole() {
        let self = this;
        var url = this.http184 + "/app/EnsContract";
        var type = 6666;
        var args = [sessionStorage.getItem("address"), "1000\u0004" + this.name + "\u000401\u0004" + this.ma];
        var result = this.$utils.contract(type, args, url, function (data) {
          self.tcShow = false;
          if (data.result == false) {
            if(data.msg == '合约失败,Error: Invalid timestamp'){
              self.signData = '请更新手机时间';
            }else if(data.msg == 'Error: Apply transaction error: Error: L10022' || data.msg == 'Error: Apply transaction error: Error: L10009'){
              self.signData = '余额不足';
            }else{
              self.signData = data.msg;
            }
            self.sign = true;
            setTimeout(function () {
              self.sign = false;
            }, 2000)
          } else if (data.result == true) {
            self.signData = data.data;
            self.sign = true;
            setTimeout(function () {
              self.sign = false;
            }, 2000)
            self.proname = self.name;
            self.part = true;
            self.roleInit();
          }
          console.log("返回结果", data);
        });

      },
      roleInit() {
        var _this = this;
        if($.cookie("enscoin") < 200*1e8){
          this.newrole = true;
        }
        var params = {
          address: sessionStorage.getItem("address")
        }
        _this.$axios({
          method: 'get',
          url: _this.http184 + '/wb/role',
          params: params,
          	headers:{
						"Authorization": "basic " + sessionStorage.getItem('logintoken')
					}
        }).then((res) => {
          if (res.data.data != null) {
            _this.role = res.data.data;
            _this.proname = _this.role.nickname;
            _this.fjs = _this.role.str5;
            if (_this.fjs == '') { 
              _this.fjs = '0';
            }
            _this.part = true;
          }
        }, (error) => {
          console.log(error);
        });
      },
      open() {
        let _this = this;
        if( _this.newrole== true){
          _this.signData = '创建角色需要消耗200ENS，请先在钱包进行充值！';
          _this.sign = true;
          setTimeout( function(){
              _this.sign = false;
            },2000);
        }else{
          _this.tcShow = !_this.tcShow
        }
      },
      signClick() {
        let self = this;
        var url = this.http184 + "/app/EnsContract";
        var type = 6666;
        var args = [sessionStorage.getItem("address"), "1111\u0004"];
        var result = this.$utils.contract(type, args, url, function (data) {
          self.tcShow = false;
          if (data.result == false) {
            if(data.msg == '合约失败,Error: Invalid timestamp'){
              self.signData = '请更新手机时间';
            }else{
              self.signData = data.msg;
            }
            self.sign = true;
            setTimeout(function () {
              self.sign = false;
            }, 2000)
          } else if (data.result == true) {
            self.signData = data.data;
            self.sign = true;
            setTimeout(function () {
              self.sign = false;
            }, 2000)
            self.roleInit();
          }
          console.log("返回结果", data);
        });
      },
      go(type) {
        let self = this;
        if (type == "make") {
          this.$router.push({
            path: "/make"
          })
        } else if (type == "card") {
          this.$router.push({
            path: "/card"
          })
        } else if (type == "chart") {
          this.$router.push({
            path: "/chart"
          })
        } else if (type == "wall") {
          this.$router.push({
            path: "/wall"
          })
        } else if (type == "divine") {
          this.$router.push({
            path: "/divine"
          })
        } else if (type == "invit") {

            if(self.part == true){
              this.$router.push({
                path: "/invit"
              })
            }else{
            self.signData = "请先创建角色";
            self.sign = true;
            setTimeout(function () {
              self.sign = false;
            }, 2000)
            }
          
        }
      },
    },
    mounted() {
      //角色
      this.roleInit();
      // this.balancesList = JSON.parse(sessionStorage.getItem("balances"))
      // if(this.balancesList == '' || this.balancesList[0].balance == '0'){
      //   this.role = true;
      // }
      
    }

  }
</script>

<style>
  .center {
    width: 100%;
    height: 24.56rem;
    margin-bottom: 2.4rem;
    text-align:center;
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

  .center .m-vipmes .m-fjsbox {
    width: auto;
    height: 1rem;
    display: inline-block;
    float: right;
    margin: .75rem .4rem 0 0;
  }

  .center .m-vipmes .m-fjsbox i {
    width: .89rem;
    height: 1rem;
    display: inline-block;
    float: left;
    margin-right: .2rem;
  }

  .center .m-vipmes .m-fjsbox .m-txt {
    width: auto;
    height: 1rem;
    line-height: 1rem;
    display: inline-block;
    float: left;
    font-size: .42rem;
    color: #3f291b;
  }

  .center .m-vipmes .m-fjsbox i img {
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
    z-index: 0;
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

  .m-typebox {
    display: inline-block;
    width: 80%;
    padding: .4rem .4rem;
    box-sizing: border-box;
    line-height: .46rem;
    font-size: .34rem;
    position: fixed;
    z-index: 1000;
    background: rgba(0, 0, 0, .8);
    left: 10%;
    top: 50%;
    margin-top: -.54rem;
    color: #eebc7f;
    border-radius: .2rem;
  }
</style>