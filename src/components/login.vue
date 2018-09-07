<template>
  <div>
    <div class="login" v-show="!isShow">
      <input type="idkey" value="" v-model="idkey">
      <input type="password" value="" v-model="password">
      <input type="code" value="" v-model="code">
      <a href="javascript:;" class="m-codebtn">发送</a>
      <p>
        <input type="checkbox" name="" id="" v-model="isCk"/>
        <span>记住账户</span>
        <a @click="createSignature">注册</a>
      </p>
      <div class="box">
        <img src="../assets/images/login_button.png" alt="" class="submit" @click="submit()">
      </div>
      <div style="text-align: center;position: fixed;bottom: .4rem;">
        <img src="../assets/images/login_logo.png" alt="" style="width:70%">
      </div>
    </div>
    <div class="login_2" v-show="isShow">
      <!-- <textarea value="" v-model="secret"></textarea> -->
      <input type="zckey" value="" v-model="zckey">
      <input type="zccode" value="" v-model="zccode">
      <a href="javascript:;" class="m-codebtn">发送</a>
      <input type="zcpassword" value="" v-model="zcpassword">
      <input type="zcpasswordagain" value="" v-model="zcpasswordagain">
      <a href="javascript:;" class="m-btn" @click="closezc()">
        <img src="../assets/images/img-txbtn01.png" />
      </a>
    </div>
    <div v-if="sign" class="m-typebox">{{signData}}</div>
  </div>
</template>

<script>
  import Mnemonic from 'bitcore-mnemonic'
  export default {
    data() {
      return {
        password:"",
        idkey:$.cookie("secret")||"",
        code:"",
        secret: "",
        zckey:"",
        zccode:"",
        zcpassword:"",
        zcpasswordagain:"",
        isShow: false,
        isCk:!!$.cookie("secret")||false,
        sign: false,
        signData: '',
      }
    },
    methods: {
      createSignature() {
        var _this = this;
        _this.isShow = true;
        // _this.$axios({
        //   method: 'get',
        //   url: "http://mainnet.asch.io/api/accounts/new"
        // }).then((res) => {
        //   _this.secret = res.data.secret;
        //   
          
        // }, (error) => {
        //   console.log(error);
        // });
      },
      verCheck() {
        var md = new MobileDetect(window.navigator.userAgent);
        var os = md.os(); //获取系统  
        var ver = "";
        if (os == "iOS") { //ios系统的处理  
          os = md.os();
          ver = md.version("iPhone")
        } else if (os == "AndroidOS") { //Android系统的处理  
          os = "Android";
          ver = md.version("Android")
        }

        var _this = this;
        var params = {
          uuid: "5df2cd47183b9876",
          cordova: ver,
          model: md.phone(),
          platform: os,
          version: ver,
          manufacturer: md.mobile(),
          isVirtual: false,
          serial: "sys",
          appversion: "1.0.0" || $.cookie("appversion"),
          address: sessionStorage.getItem("address")
        }
        _this.$axios({
          method: 'post',
          url: _this.http184 + '/app/ver',
          data: params
        }).then((res) => {
          var result = res.data.data;
          if (!!result) {
            if (result.isUpdate) {
              $.cookie("appversion", result.verno)
              _this.signData = result.memo;
              _this.sign = true;
              setTimeout(function () {
                window.location.href = result.downurl;
              }, 2000)
            }else if(!result.isUpdate){
              _this.signData = result.memo;
              _this.sign = true;
              setTimeout(function () {
                _this.$router.push({
                  path: "/center"
                })
              }, 2000)
            }else{
              _this.$router.push({
                path: "/center"
              })
            }
          }
        }, (error) => {
          console.log(error);
        });
      },
      submit() {
        if (!Mnemonic.isValid(this.idkey)) {
          alert("密码不符合规范")
        } else {
          var _this = this;
          if(_this.isCk){
            $.cookie("secret",_this.idkey);
          }else{
            $.cookie("secret","");
          }

          _this.$axios({
            method: 'get',
            url: _this.http189 + '/api/dapps/' + _this.dappId + '/accounts/' + _this.$AschJS.crypto.getAddress(
              _this.$AschJS
              .crypto.getKeys(_this.idkey).publicKey)
          }).then((res) => {
            if (res.data.success) {
              sessionStorage.setItem("balances", JSON.stringify(res.data.account.balances))
              sessionStorage.setItem("secret", _this.idkey)
              sessionStorage.setItem("publicKey", _this.$AschJS
                .crypto.getKeys(_this.idkey).publicKey)
              sessionStorage.setItem("privateKey", _this.$AschJS
                .crypto.getKeys(_this.idkey).privateKey)
              sessionStorage.setItem("address", _this.$AschJS.crypto.getAddress(
                _this.$AschJS
                .crypto.getKeys(_this.idkey).publicKey))
                _this.verCheck();
              
            }
          }, (error) => {
            console.log(error);
          });
        }
      },
      closezc() {
        this.isShow = false;
      }
      
    },
    mounted() {
      if (sessionStorage.getItem("address")) {
        this.$router.push({
          path: "/center"
        })
      }
    }
  }
</script>

<style>
  .login {
    width: 96%;
    margin-left: 2%;
    height: 10.5rem;
    background: url("../assets/images/login_bg.png") no-repeat;
    background-size: 100%;
    position: absolute;
    top: 50%;
    margin-top: -6rem;
    z-index: 2000;
  }
  .login input[type=idkey] {
    width: 44%;
    margin: 2.4rem 3.1rem 0 2.9rem;
    position: relative;
    z-index: 10;
    background: transparent;
    padding: 7px;
    font-size: 0.4rem;
    outline: 0;
    border: 0;
    color: #eebc7f;
  }
  .login input[type=password] {
    width: 44%;
    margin: .6rem 3.1rem 0 2.9rem;
    position: relative;
    z-index: 10;
    background: transparent;
    padding: 7px;
    font-size: 0.4rem;
    outline: 0;
    border: 0;
    color: #eebc7f;
  }
  .login input[type=code] {
    width: 20%;
    margin: .6rem 0 0 2.9rem;
    position: relative;
    z-index: 10;
    background: transparent;
    padding: 7px;
    font-size: 0.4rem;
    outline: 0;
    border: 0;
    color: #eebc7f;
  }
  .login .m-codebtn{
    width: 20%;
    height: .8rem;
    line-height: .8rem;
    float: right;
    margin: .6rem 2.2rem 0 0;
    font-size: 0.4rem;
    text-align: center;
    border: 2px solid #81511c;
    color: #fff;
  }

  .login .box {
    text-align: center;
    margin-top: .4rem;
  }

  .login>p {
    font-size: 0.4rem;
    color: #6a1802;
    width: 50%;
    margin: 0 auto;
    margin-top: 0.5rem;
  }

  .login .box img {
    width: 70%;
  }

  .login_2 {
    width: 96%;
    margin-left: 2%;
    height: 10.72rem;
    background: url("../assets/images/login_sc.png") no-repeat;
    background-size: 100%;
    position: absolute;
    top: 20%;
  }

  .login_2 input[type=zckey] {
    width: 44%;
    margin: 2.3rem 0 0 3.9rem;
    position: relative;
    z-index: 10;
    background: transparent;
    padding: 7px;
    font-size: 0.4rem;
    outline: 0;
    border: 0;
    color: #eebc7f;
  }
  .login_2 input[type=zccode] {
    width: 20%;
    vertical-align: top;
    margin: .3rem 0 0 3.9rem;
    position: relative;
    z-index: 10;
    background: transparent;
    padding: 7px;
    font-size: 0.4rem;
    outline: 0;
    border: 0;
    color: #eebc7f;
  }
  .login_2 .m-codebtn{
    width: 20%;
    height: .8rem;
    line-height: .8rem;
    float: right;
    margin: .3rem 1.6rem 0 0;
    font-size: 0.4rem;
    text-align: center;
    border: 2px solid #81511c;
    color: #fff;
  }
  .login_2 input[type=zcpassword] {
    width: 44%;
    margin: .3rem 0 0 3.9rem;
    position: relative;
    vertical-align: top;
    z-index: 10;
    background: transparent;
    padding: 7px;
    font-size: 0.4rem;
    outline: 0;
    border: 0;
    color: #eebc7f;
  }
  .login_2 input[type=zcpasswordagain] {
    width: 44%;
    margin: .3rem 0 0 3.9rem;
    vertical-align: top;
    position: relative;
    z-index: 10;
    background: transparent;
    padding: 7px;
    font-size: 0.4rem;
    outline: 0;
    border: 0;
    color: #eebc7f;
  }

  .login_2 textarea {
    width: 70%;
    height: 2.5rem;
    margin: 1.8rem 0 0 1.3rem;
    position: relative;
    z-index: 10;
    background: transparent;
    padding: 10px;
    font-size: 0.4rem;
    outline: 0;
    border: 0;
    color: #111;
  }

  .m-btn {
    width: 2.95rem;
    height: 1.2rem;
    display: block;
    margin: .8rem auto 0;
  }

  .m-btn img {
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
    z-index: 4000;
    background: rgba(0, 0, 0, .8);
    left: 10%;
    top: 50%;
    margin-top: -.54rem;
    color: #eebc7f;
    border-radius: .2rem;
  }
</style>