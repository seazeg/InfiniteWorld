<template>
  <div>
    <div class="login" v-show="!isShow">
      <input type="password" value="" v-model="password">
      <p>
        <input type="checkbox" name="" id="">
        <span>记住秘钥</span>
        <a @click="createSignature">创建秘钥</a>
      </p>
      <div class="box">
        <img src="../assets/images/login_button.png" alt="" class="submit" @click="submit()">
      </div>
      <div style="text-align: center;position: fixed;bottom: 1rem;">
        <img src="../assets/images/login_logo.png" alt="" style="width:70%">
      </div>
    </div>
    <div class="login_2" v-show="isShow">
      <textarea value="" v-model="secret"></textarea>
      <a href="javascript:;" class="m-btn" @click="closezc()">
        <img src="../assets/images/img-txbtn01.png" />
      </a>
    </div>
  </div>
</template>

<script>
  import Mnemonic from 'bitcore-mnemonic'
  export default {
    data() {
      return {
        password: "",
        secret: "",
        isShow: false
      }
    },
    methods: {
      createSignature() {
        var _this = this;
        _this.$axios({
          method: 'get',
          url: "http://mainnet.asch.io/api/accounts/new"
        }).then((res) => {
          _this.secret = res.data.secret;
          _this.isShow = true;
        }, (error) => {
          console.log(error);
        });
      },
      submit() {

        if (!Mnemonic.isValid(this.password)) {
          alert("密码不符合规范")
        } else {
          var _this = this;
          _this.$axios({
            method: 'get',
            url: _this.http189 + '/api/dapps/' + _this.dappId + '/accounts/' + _this.$AschJS.crypto.getAddress(
              _this.$AschJS
              .crypto.getKeys(_this.password).publicKey)
          }).then((res) => {

            if (res.data.success) {
              sessionStorage.setItem("balances", JSON.stringify(res.data.account.balances))
              sessionStorage.setItem("secret", _this.password)
              sessionStorage.setItem("publicKey", _this.$AschJS
                .crypto.getKeys(_this.password).publicKey)
              sessionStorage.setItem("privateKey", _this.$AschJS
                .crypto.getKeys(_this.password).privateKey)
              sessionStorage.setItem("address", _this.$AschJS.crypto.getAddress(
                _this.$AschJS
                .crypto.getKeys(_this.password).publicKey))
              _this.$router.push({
                path: "/center"
              })
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
    height: 9.68rem;
    background: url("../assets/images/login_bg.png") no-repeat;
    background-size: 100%;
    position: absolute;
    top: 50%;
    margin-top: -6rem;
    z-index: 2000;
  }

  .login input[type=password] {
    width: 56%;
    margin: 2.5rem 3.1rem 0 2.8rem;
    position: relative;
    z-index: 10;
    background: transparent;
    padding: 10px;
    font-size: 0.4rem;
    outline: 0;
    border: 0;
    color: #eebc7f;
  }

  .login .box {
    text-align: center;
    margin-top: 1rem;
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
    height: 380px;
    background: url("../assets/images/login_sc.png") no-repeat;
    background-size: 100%;
    position: absolute;
    top: 20%;
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
    margin: 2.8rem auto 0;
  }

  .m-btn img {
    width: 100%;
    height: 100%;
    vertical-align: top;
  }
</style>