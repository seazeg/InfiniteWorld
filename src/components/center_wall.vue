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
        <div class="m-list" v-for="item in balancesList">
          <div class="m-titlebox">
            <div class="m-txt">余额：{{item.balance/1e8}}</div>
            <a class="m-link" @click="openIn()">充入钱包</a>
            <a class="m-link" @click="openOut()">提到钱包</a>
          </div>
          <div class="m-text">ENS</div>
        </div>
        <div class="m-wallbox">

          <div class="m-idkeybox">
            <div class="m-leftbox">
              <div class="m-text">私钥</div>
              <a href="javascript:;" v-if="!idkeyShow" class="m-btn" @click="showIdkey()">查看</a>
              <a href="javascript:;" v-if="idkeyShow" class="m-btn" @click="hiddenIdkey()">隐藏</a>
              <a href="javascript:;" class="m-btn btn" :data-clipboard-text="secret">复制</a>
            </div>
            <div v-if="idkeyShow" class="m-textarea">{{secret}}</div>
            <div v-if="!idkeyShow" class="m-textarea">
              <p class="m-hidden">******</p>
            </div>
          </div>
          <div class="m-htmlbox">
            <div class="m-leftbox">
              <div class="m-text">地址</div>
              <a href="javascript:;" data-clipboard-target="#demoInput" class="m-btn">复制</a>
            </div>
            <div class="m-textarea02" id="demoInput">{{address}}</div>
            <div class="m-tip">请保存好您的私钥，切勿泄露给他人！</div>
          </div>
        </div>
        <!-- <div class="m-list" v-for="item in balancesList" v-if="item.currency == 'ENDLESS.ENS'">
          <div class="m-titlebox">
            <div class="m-txt">余额：{{item.balance/1e8}}</div>
            <a class="m-link" @click="openIn()">充入钱包</a>
            <a class="m-link" @click="openOut()">提到钱包</a>
          </div>
          <div class="m-text">ENS</div>
        </div> -->
      </div>
      <div class="m-bottomimg">
        <img src="../assets/images/bg-chartlist-bot.png" />
      </div>
    </div>
    <div v-show="tcinShow || tcoutShow" class="m-tcbg"></div>
    <div v-show="tcinShow" class="m-wallincontbox">
      <div class="m-txt">将钱包内资产充入游戏，将消耗0.1XAS</div>
      <input type="text" class="m-invitcode" maxlength="10" v-model="ENSInNum" />
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
      <div class="m-txt">将游戏内资产提到钱包，将消耗10ENS。</div>
      <input type="text" class="m-invitcode" maxlength="10" v-model="ENSOutNum" />
      <div class="m-wallinbtnbox">
        <a href="javascript:;" class="m-btn" @click="ENSOut()">
          <img src="../assets/images/img-txbtn01.png" />
        </a>
        <a href="javascript:;" class="m-btn" @click="openOut()">
          <img src="../assets/images/img-txbtn02.png" />
        </a>
      </div>
    </div>
    <notice v-show="issign">{{msg}}</notice>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        tcinShow: false,
        tcoutShow: false,
        ENSOutNum: "",
        ENSInNum: "",
        msg: "",
        issign: false,
        balancesList: [],
        idkeyShow: false,
        secret:'',
        address:'',
      }
    },
    methods: {
      copy() {

      },
      init() {
        var _this = this;
        _this.secret = sessionStorage.getItem("secret");
        _this.address = sessionStorage.getItem("address");
         _this.balancesList = [{
                balance: $.cookie("enscoin"),
                currency: "ENDLESS.ENS"
              }]
        // _this.$axios({
        //   method: 'get',
        //   url: _this.http189 + '/api/dapps/' + _this.dappId + '/accounts/' + sessionStorage.getItem("address"),
        //   	headers:{
				// 		"Authorization": "basic " + sessionStorage.getItem('logintoken')
				// 	}
        // }).then((res) => {
        //   if (res.data.success) {
        //     sessionStorage.setItem("balances", JSON.stringify(res.data.account.balances));
        //     if (JSON.parse(sessionStorage.getItem("balances")) == '') {
        //       console.log(123)
        //       _this.balancesList = [{
        //         balance: 0,
        //         currency: "ENDLESS.ENS"
        //       }]
        //     } else {
        //       _this.balancesList = JSON.parse(sessionStorage.getItem("balances"))
        //     }

        //   }
        // }, (error) => {
        //   console.log(error);
        // });
      },
      showIdkey() {
        let self = this;
        self.idkeyShow = true;
      },
      hiddenIdkey() {
        let self = this;
        self.idkeyShow = false;
      },
      openIn() {
        this.tcinShow = !this.tcinShow
      },
      openOut() {
        this.tcoutShow = !this.tcoutShow
      },
      ENSIn() {
        var _this = this;
        // var url = this.http189 + "/peer/transactions";
        // var type = 6;
        // var args = ["ENDLESS.ENS", this.ENSInNum * 1e8, sessionStorage.getItem("address")];
        var url = this.http184 + "/app/EnsContract";
        var type = 6;
        var outENS = (this.ENSInNum * 1e8).toString();
        var args = ["ENDLESS.ENS", outENS, sessionStorage.getItem("address")];
        this.$utils.contract(type, args, url, function (data) {
          _this.tcinShow = !_this.tcinShow;
          _this.ENSInNum = '';
          setTimeout(function () {
            _this.roleInit();
          }, 1010);
          if (data.result == false) {
            _this.msg = "余额不足,请充值";
            _this.issign = true
            return;
          }
          // if (data.error.indexOf('Key is locked') > -1) {
          //   _this.msg = '你的操作正在进行网络确认，请稍后';
          //   _this.issign = true
          //   return;
          // }
          // if (data.error.indexOf('amount range') > -1) {
          //   _this.msg = '数额要大于0';
          //   _this.issign = true
          //   return;
          // }
          // if (data.error.indexOf('String is too long') > -1) {
          //   _this.msg = '您在登录时的秘钥过长或者输入的数值过大';
          //   _this.issign = true
          //   return;
          // }
          // if (data.error.indexOf('should be integer') > -1) {
          //   _this.msg = '您输入的数额过长或不为整数，请再次确认';
          //   _this.issign = true
          //   return;
          // }
          // if (data.error.indexOf('Invalid timestamp') > -1) {
          //   _this.msg = '本地时间不精准，请先校准本地时间';
          //   _this.issign = true
          //   return;
          // }
          // if (data.error.indexOf('second') > -1) {
          //   _this.msg = '设置了二级密码账号无法使用';
          //   _this.issign = true
          //   return;
          // }
          // if (data.error.indexOf('Account is locked') > -1) {
          //   _this.msg = '锁仓账户无法使用'
          //   _this.issign = true
          //   return;
          // }
          // if (!data.result) {
          //   _this.msg = data.msg
          //   _this.issign = true
          //   return;
          // }
          // if (data.success) {
          //   _this.msg = '操作失败'
          //   _this.issign = true
          //   return;
          // }
          // if (!!data.transactionId) {
          //   _this.msg = '充值成功!'
          //   _this.issign = true
          //   return;
          // }
          _this.msg = "区块确认中，请与10秒后在个人中心—钱包中进行查看。";
          _this.issign = true;
          setTimeout(function () {
            _this.issign = false;
          }, 3000);
          setTimeout(function () {
            _this.roleInit();
          }, 1010);
        })
      },
      roleInit() {
        var _this = this;
        _this.secret = sessionStorage.getItem("secret");
        _this.address = sessionStorage.getItem("address");
        var params = {
          address: sessionStorage.getItem("address")
        }
        _this.$axios({
          method: 'get',
          url: _this.http184 + '/wb/baserole',
          params: params,
          	headers:{
						"Authorization": "basic " + sessionStorage.getItem('logintoken')
					}
        }).then((res) => {
          _this.balancesList = [{
                balance: res.data.data.enscoin,
                currency: "ENDLESS.ENS"
              }]
              $.cookie('enscoin',res.data.data.enscoin)
        }, (error) => {
          console.log(error);
        });
      },
      ENSOut() {
        var _this = this;
        var url = this.http184 + "/app/EnsContract";
        var type = 2;
        var outENS = (this.ENSOutNum * 1e8).toString();
        var args = ["ENDLESS.ENS", outENS, sessionStorage.getItem("address")];
        this.$utils.contract(type, args, url, function (data) {
          _this.tcoutShow = !_this.tcoutShow;
          _this.ENSOutNum = '';
          setTimeout(function () {
            _this.roleInit();
          }, 1010);
          if (!data.result) {
            _this.msg = data.msg
            _this.issign = true
            return;
          }
          _this.msg = "提现成功，所提ENS将于24小时内到账。";
          _this.issign = true;
          setTimeout(function () {
            _this.issign = false;
          }, 3000);


          if (data.msg.indexOf('Insufficient balance') > -1) {
            _this.msg = "余额不足,请充值";
            _this.issign = true
            return;
          }
          if (data.msg.indexOf('Key is locked') > -1) {
            _this.msg = '你的操作正在进行网络确认，请稍后';
            _this.issign = true
            return;
          }
          if (data.msg.indexOf('amount range') > -1) {
            _this.msg = '数额要大于0';
            _this.issign = true
            return;
          }
          if (data.msg.indexOf('String is too long') > -1) {
            _this.msg = '您在登录时的秘钥过长或者输入的数值过大';
            _this.issign = true
            return;
          }
          if (data.msg.indexOf('should be integer') > -1) {
            _this.msg = '您输入的数额过长或不为整数，请再次确认';
            _this.issign = true
            return;
          }
          if (data.msg.indexOf('Invalid timestamp') > -1) {
            _this.msg = '本地时间不精准，请先校准本地时间';
            _this.issign = true
            return;
          }
          if (data.msg.indexOf('second') > -1) {
            _this.msg = '设置了二级密码账号无法使用';
            _this.issign = true
            return;
          }
          if (data.msg.indexOf('Account is locked') > -1) {
            _this.msg = '锁仓账户无法使用'
            _this.issign = true
            return;
          }
          // if (!data.success) {
          //   _this.msg = '操作失败'
          //   _this.issign = true
          //   return;
          // }
        })
      },
    },
    mounted() {
      let _this = this;
      //self.ENSOut();
      setInterval(function () {
        _this.issign = false
      }, 3000)
      // if (JSON.parse(sessionStorage.getItem("balances")) == '') {
      //   console.log(123)
      //   _this.balancesList = [{
      //     balance: 0,
      //     currency: "ENDLESS.ENS"
      //   }]
      // } else {
      //   _this.balancesList = JSON.parse(sessionStorage.getItem("balances"))
      // }
      _this.roleInit();
      new ClipboardJS('.m-btn');

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

  .center-wall .m-listbox .m-wallbox {
    width: 9.1rem;
    background: #94815f;
    display: inline-block;
    margin-left: .5rem;
  }

  .center-wall .m-listbox .m-wallbox .m-idkeybox {
    width: 100%;
    display: inline-block;
    margin: .8rem 0;
    border-bottom: 2px solid #655d4d;
    padding-bottom: .8rem;
  }

  .center-wall .m-listbox .m-wallbox .m-htmlbox {
    width: 100%;
    display: inline-block;
    margin-bottom: .8rem;
  }

  .center-wall .m-listbox .m-wallbox .m-leftbox {
    width: 2rem;
    display: inline-block;
    float: left;
    margin: 0 .5rem;
  }

  .center-wall .m-listbox .m-wallbox .m-leftbox .m-text {
    width: 100%;
    display: inline-block;
    float: left;
    text-align: center;
    height: .4rem;
    line-height: .4rem;
    font-size: .3rem;
    color: #fff;
  }

  .center-wall .m-listbox .m-wallbox .m-leftbox .m-btn {
    width: 100%;
    display: inline-block;
    border: 2px solid #81511c;
    text-align: center;
    height: .8rem;
    line-height: .8rem;
    font-size: .3rem;
    color: #fff;
    vertical-align: top;
    margin-top: .4rem;
    float: left;
  }

  .center-wall .m-listbox .m-wallbox .m-textarea {
    width: 5.6rem;
    display: inline-block;
    float: right;
    margin-right: .5rem;
    border: 2px solid #81511c;
    border-radius: .1rem;
    padding: .5rem;
    box-sizing: border-box;
    font-size: .3rem;
    text-align: center;
    min-height: 3rem;
  }

  .center-wall .m-listbox .m-wallbox .m-textarea {
    width: 5.6rem;
    display: inline-block;
    float: right;
    margin-right: .5rem;
    border: 2px solid #81511c;
    border-radius: .1rem;
    padding: .5rem;
    box-sizing: border-box;
    font-size: .3rem;
    text-align: center;
    min-height: 3rem;
  }

  .center-wall .m-listbox .m-wallbox .m-textarea02 {
    width: 5.6rem;
    display: inline-block;
    float: right;
    margin-right: .5rem;
    border: 2px solid #81511c;
    border-radius: .1rem;
    padding: .5rem;
    box-sizing: border-box;
    font-size: .3rem;
    text-align: center;
    word-break: break-all;
    min-height: 1.75rem;
    background: transparent;
  }

  .center-wall .m-listbox .m-wallbox .m-textarea .m-hidden {
    width: 100%;
    display: inline-block;
    height: 1.8rem;
    line-height: 1.8rem;
  }

  .center-wall .m-listbox .m-wallbox .m-tip {
    width: 100%;
    display: inline-block;
    text-align: center;
    font-size: .3rem;
    color: #4e3838;
    margin: .5rem 0;
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