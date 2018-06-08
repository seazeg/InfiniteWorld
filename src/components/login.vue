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
         console.log(this.$AschJS.crypto.getKeys(this.password));
         console.log(this.$AschJS.crypto.getAddress(this.$AschJS.crypto.getKeys(this.password).publicKey));
        //  _this.$axios({
        //   method: 'get',
        //   url: _this.servUrl + '/api/getPhotos',
        //   params
        // }).then((res) => {
        //   _this.data = JSON.parse(res.data.data.src);
        //   console.log(_this.data);
        // }, (error) => {
        //   console.log(error);
        // });
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
