import AschJS from 'asch-js'
import axios from 'axios'
import Vue from 'vue'

const utils = {
  contract: function (type, args, url, that, callback) {
    let secret = window.sessionStorage.getItem('secret');
    // let opt = JSON.parse(sessionStorage.getItem("options"))
    //普通合约调用
    let _transaction = AschJS.dapp.createInnerTransaction({
      fee: '0', //fee,
      type: 6666, //type,
      args: JSON.stringify(args)
    }, secret);
    //内部转账合约
    if (type == '3' || type == '2') {
      _transaction = AschJS.dapp.createInnerTransaction({
        fee: '10000000', //fee,
        type: type,
        args: JSON.stringify(args)
      }, secret);
    }
    if (type == '6') {
      var dappid = Vue.prototype.dappId;
      var currency = "XAS";
      var amount = 10 * 100000000;
      _transaction = AschJS.transfer.createInTransfer(dappid, currency, amount, secret, secondSecret || undefined);
    }

    axios({
      method: 'POST',
      url: url,
      data:_transaction,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "magic": "594fe0f3",
        // "magic":"5f5b3cf5"  //生产
      }
    }).then((res) => {
      let data = res.json();
      console.log(res);
      if (res.status === 200 && data.result) { //执行成功
        // callback(data, that);
      } else {
        if (data.msg.indexOf('Insufficient balance') > -1) { //error: "Error: Apply transaction error: Error: Insufficient balance"
          this.showToast('top', '余额不足,请充值');
          return;
        }
        if (data.msg.indexOf('Key is locked') > -1) {
          this.showToast('top', '你的操作正在进行网络确认，请稍后');
          return;
        }
        if (data.msg.indexOf('amount range') > -1) {
          this.showToast('top', '数额要大于0');
          return;
        }
        if (data.msg.indexOf('String is too long') > -1) {
          this.showToast('top', '您在登录时的秘钥过长或者输入的数值过大');
          return;
        }
        if (data.msg.indexOf('should be integer') > -1) {
          this.showToast('top', '您输入的数额过长或不为整数，请再次确认');
          return;
        }
        if (data.msg.indexOf('Invalid timestamp') > -1) {
          this.showToast('top', '本地时间不精准，请先校准本地时间');
          return;
        }
        if (data.msg.indexOf('second') > -1) {
          this.showToast('top', '设置了二级密码账号无法使用');
          return;
        }
        if (data.msg.indexOf('Account is locked') > -1) {
          this.showToast('top', '锁仓账户无法使用');
          return;
        }
        //Error: Apply transaction error: Error: L10001
        for (var key in this.serverMsg) {
          if (data.msg.indexOf(key) > -1) {
            this.showToast('top', this.serverMsg[key]);
            return;
          }
        }
        this.showToast('top', '执行失败 ' + data.msg);
        return;
      }
    }, (error) => {
      console.log(error);
    });

  }

}

export default utils