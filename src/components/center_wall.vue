<template>
  <div>
    <div class="m-walimg">
      <img src="../assets/images/img-wall-top.png" />
    </div>
    <div class="center-wall">
      <div class="m-topimg">
        <img src="../assets/images/bg-walllist-top.png" />
      </div>
      <div class="m-listbox">
        <div class="m-list">
          <div class="m-titlebox">
            <div class="m-txt">余额：5652</div>
            <a class="m-link" @click="openIn()">充入钱包</a>
            <a class="m-link" @click="openOut()">提到钱包</a>
          </div>
          <div class="m-text">XAS</div>
        </div>
        <div class="m-list">
          <div class="m-titlebox">
            <div class="m-txt">余额：5652</div>
            <a class="m-link" @click="openIn()">充入钱包</a>
            <a class="m-link" @click="openOut()">提到钱包</a>
          </div>
          <div class="m-text">XAS</div>
        </div>
      </div>
      <div class="m-bottomimg">
        <img src="../assets/images/bg-chartlist-bot.png" />
      </div>
    </div>
    <div v-show="tcinShow || tcoutShow" class="m-tcbg"></div>
    <div v-show="tcinShow" class="m-wallincontbox">
      <div class="m-txt">将游戏内资产提到钱包，将消耗0.1ENS。</div>
      <input type="text" class="m-invitcode" maxlength="4" v-model="ENSInNum"/>
      <div class="m-wallinbtnbox">
        <a href="javascript:;" class="m-btn" @click="ENSIn()">
          <img src="../assets/images/img-txbtn01.png" />
        </a>
        <a href="javascript:;" class="m-btn" @click="openIn()">
          <img src="../assets/images/img-txbtn02.png" />
        </a>
      </div>
    </div>
    <div v-show="tcoutShow" class="m-walloutcontbox">
      <div class="m-txt">将游戏内资产提到钱包，将消耗0.1ENS。</div>
      <input type="text" class="m-invitcode" maxlength="4" v-model="ENSOutNum" />
      <div class="m-wallinbtnbox">
        <a href="javascript:;" class="m-btn" @click="ENSOut()">
          <img src="../assets/images/img-txbtn01.png" />
        </a>
        <a href="javascript:;" class="m-btn" @click="openOut()">
          <img src="../assets/images/img-txbtn02.png" />
        </a>
      </div>
    </div>
    <notice v-show="sign">{{msg}}</notice>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        tcinShow: false,
        tcoutShow: false,
        ENSOutNum: "",
        ENSInNum:"",
        msg: "",
        sign: false
      }
    },
    methods: {
      openIn() {
        this.tcinShow = !this.tcinShow
      },
      openOut() {
        this.tcoutShow = !this.tcoutShow
      },
      ENSIn() {
        var _this = this;
        var url = this.http189 + "/peer/transactions";
        var type = 6;
        var args = ["XAS", this.ENSInNum, sessionStorage.getItem("address")];
        this.$utils.contract(type, args, url, function (data) {
          if (data.msg.indexOf('Insufficient balance') > -1) {
            _this.msg = "余额不足,请充值";
            _this.sign = true
            return;
          }
          if (data.msg.indexOf('Key is locked') > -1) {
            _this.msg = '你的操作正在进行网络确认，请稍后';
            _this.sign = true
            return;
          }
          if (data.msg.indexOf('amount range') > -1) {
            _this.msg = '数额要大于0';
            _this.sign = true
            return;
          }
          if (data.msg.indexOf('String is too long') > -1) {
            _this.msg = '您在登录时的秘钥过长或者输入的数值过大';
            _this.sign = true
            return;
          }
          if (data.msg.indexOf('should be integer') > -1) {
            _this.msg = '您输入的数额过长或不为整数，请再次确认';
            _this.sign = true
            return;
          }
          if (data.msg.indexOf('Invalid timestamp') > -1) {
            _this.msg = '本地时间不精准，请先校准本地时间';
            _this.sign = true
            return;
          }
          if (data.msg.indexOf('second') > -1) {
            _this.msg = '设置了二级密码账号无法使用';
            _this.sign = true
            return;
          }
          if (data.msg.indexOf('Account is locked') > -1) {
            _this.msg = '锁仓账户无法使用'
            _this.sign = true
            return;
          }
        })
      },
      ENSOut() {
        var _this = this;
        var url = this.http184 + "/app/EnsContract";
        var type = 2;
        var args = ["XAS", this.ENSOutNum, sessionStorage.getItem("address")];
        this.$utils.contract(type, args, url, function (data) {
          if (data.msg.indexOf('Insufficient balance') > -1) {
            _this.msg = "余额不足,请充值";
            _this.sign = true
            return;
          }
          if (data.msg.indexOf('Key is locked') > -1) {
            _this.msg = '你的操作正在进行网络确认，请稍后';
            _this.sign = true
            return;
          }
          if (data.msg.indexOf('amount range') > -1) {
            _this.msg = '数额要大于0';
            _this.sign = true
            return;
          }
          if (data.msg.indexOf('String is too long') > -1) {
            _this.msg = '您在登录时的秘钥过长或者输入的数值过大';
            _this.sign = true
            return;
          }
          if (data.msg.indexOf('should be integer') > -1) {
            _this.msg = '您输入的数额过长或不为整数，请再次确认';
            _this.sign = true
            return;
          }
          if (data.msg.indexOf('Invalid timestamp') > -1) {
            _this.msg = '本地时间不精准，请先校准本地时间';
            _this.sign = true
            return;
          }
          if (data.msg.indexOf('second') > -1) {
            _this.msg = '设置了二级密码账号无法使用';
            _this.sign = true
            return;
          }
          if (data.msg.indexOf('Account is locked') > -1) {
            _this.msg = '锁仓账户无法使用'
            _this.sign = true
            return;
          }
        })
      },
    },
    mounted() {
      let self = this;
      //self.ENSOut();
    },
    updated () {
      this.sign = false
    }

  }
</script>

<style>
  .m-walimg {
    width: 100%;
    height: 2.3rem;
    display: inline-block;
  }

  .m-walimg img {
    width: 100%;
    height: 100%;
    vertical-align: top;
  }

  .center-wall {
    width: 10.1rem;
    margin: 0 auto 2.4rem;
  }

  .center-wall .m-topimg {
    width: 100%;
    display: inline-block;
    height: .75rem;
    float: left;
  }

  .center-wall .m-bottomimg {
    width: 100%;
    display: inline-block;
    height: .78rem;
  }

  .center-wall .m-topimg img,
  .center-wall .m-bottomimg img {
    width: 100%;
    height: 100%;
    vertical-align: top;
  }

  .center-wall .m-listbox {
    width: 100%;
    display: inline-block;
    background: url('../assets/images/bg-walllist.png') repeat-y;
    background-size: 100%;
    float: left;
  }

  .center-wall .m-listbox .m-list {
    width: 9.38rem;
    height: 1.98rem;
    margin: 0 auto;
    text-align: center;
    background: url('../assets/images/bg-wall-list.png');
    background-size: 100%;
  }

  .center-wall .m-listbox .m-list:last-child {
    width: 9.38rem;
    height: 1.66rem;
    margin: 0 auto;
    text-align: center;
    background: url('../assets/images/bg-wall-lastlist.png');
    background-size: 100%;
  }

  .center-wall .m-listbox .m-list .m-titlebox {
    width: auto;
    height: .91rem;
    display: inline-block;
    float: left;
    margin: .08rem 0 0 .5rem;
  }

  .center-wall .m-listbox .m-list .m-titlebox .m-txt {
    width: 4.5rem;
    height: .91rem;
    display: inline-block;
    float: left;
    padding: 0 .1rem;
    font-size: .4rem;
    color: #472c0e;
    line-height: .91rem;
    text-align: left;
  }

  .center-wall .m-listbox .m-list .m-titlebox .m-link {
    width: auto;
    height: .91rem;
    display: inline-block;
    float: left;
    padding: 0 .2rem;
    margin-left: -.1rem;
    font-size: .4rem;
    color: #472c0e;
    line-height: .91rem;
    text-decoration: underline;
  }

  .center-wall .m-listbox .m-list .m-text {
    width: 100%;
    display: inline-block;
    margin-top: .05rem;
    padding: 0 .6rem;
    text-align: left;
    height: .4rem;
    font-size: .42rem;
    color: #472c0e;
    vertical-align: top;
    box-sizing: border-box;
    font-weight: bold;
  }

  .m-wallincontbox {
    width: 10.26rem;
    height: 11.72rem;
    display: inline-block;
    position: fixed;
    left: 50%;
    top: 50%;
    margin: -5.87rem 0 0 -5.12rem;
    background: url("../assets/images/bg-wallintc.png") no-repeat;
    background-size: 100% 100%;
    z-index: 2000;
    text-align: center;
  }

  .m-wallincontbox .m-txt {
    width: 54%;
    line-height: .6rem;
    margin: 4rem 25% 0 21%;
    display: inline-block;
    font-size: .42rem;
    color: #eda41a;
    text-shadow: 0 0 10px #3f291b;
    max-height: 1.1rem;
    overflow: hidden;
    text-align: left;
  }

  .m-wallincontbox .m-invitcode {
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

  .m-wallincontbox .m-wallinbtnbox {
    width: auto;
    display: inline-block;
    margin: 1.4rem auto 0;
  }

  .m-wallincontbox .m-wallinbtnbox .m-btn {
    width: 2.95rem;
    height: 1.2rem;
    display: inline-block;
    margin: 0 .4rem 0;
  }

  .m-wallincontbox .m-wallinbtnbox .m-btn img {
    width: 100%;
    height: 100%;
    vertical-align: top;
  }

  .m-walloutcontbox {
    width: 10.26rem;
    height: 11.72rem;
    display: inline-block;
    position: fixed;
    left: 50%;
    top: 50%;
    margin: -5.87rem 0 0 -5.12rem;
    background: url("../assets/images/bg-wallouttc.png") no-repeat;
    background-size: 100% 100%;
    z-index: 2000;
    text-align: center;
  }

  .m-walloutcontbox .m-txt {
    width: 54%;
    line-height: .6rem;
    margin: 4rem 25% 0 21%;
    display: inline-block;
    font-size: .42rem;
    color: #eda41a;
    text-shadow: 0 0 10px #3f291b;
    max-height: 1.1rem;
    overflow: hidden;
    text-align: left;
  }

  .m-walloutcontbox .m-invitcode {
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

  .m-walloutcontbox .m-wallinbtnbox {
    width: auto;
    display: inline-block;
    margin: 1.4rem auto 0;
  }

  .m-walloutcontbox .m-wallinbtnbox .m-btn {
    width: 2.95rem;
    height: 1.2rem;
    display: inline-block;
    margin: 0 .4rem 0;
  }

  .m-walloutcontbox .m-wallinbtnbox .m-btn img {
    width: 100%;
    height: 100%;
    vertical-align: top;
  }
</style>