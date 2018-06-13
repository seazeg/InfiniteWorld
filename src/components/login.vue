<template>
  <div>
    <div class="login">
      <input type="password" value="" v-model="password">
      <p>
        <input type="checkbox" name="" id="">
        <span>记住秘钥</span>
        <a>创建秘钥</a>
      </p>
      <div class="box">
        <img src="../assets/images/login_button.png" alt="" class="submit" @click="submit()">
      </div>
      <div style="text-align: center;position: fixed;bottom: 1rem;">
        <img src="../assets/images/login_logo.png" alt="" style="width:70%">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        password: ""
      }
    },
    methods: {
      submit() {
        var _this = this;
        var publicKey = this.$AschJS.crypto.getKeys(this.password).publicKey;
        var privateKey = this.$AschJS.crypto.getKeys(this.password).privateKey;
        var address = this.$AschJS.crypto.getAddress(publicKey);

        sessionStorage.setItem("publicKey",publicKey)
        sessionStorage.setItem("privateKey",privateKey)
        sessionStorage.setItem("address",address)
        sessionStorage.setItem("secret",this.password)
        sessionStorage.setItem("secondSecret","erjimima2017")
        sessionStorage.setItem("options",JSON.stringify(this.$AschJS.signature.createSignature(this.password, "erjimima2017")))
        
      console.log(this.$AschJS.signature.createSignature(this.password, "erjimima2017"));
        
        _this.$axios({
          method: 'get',
          url: _this.http189 + '/api/dapps/' + publicKey + '/accounts/' + address
        }).then((res) => {
          console.log(res);
        }, (error) => {
          console.log(error);
        });


      }
    }
  }

</script>

<style>
  .login {
    width: 96%;
    margin-left: 2%;
    height: 380px;
    background: url("../assets/images/login_bg.png") no-repeat;
    background-size: 100%;
    position: absolute;
    top: 20%;
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

</style>
