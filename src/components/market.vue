<template>
  <div class="market">
    <div class="search">
      <!-- <input type="text" placeholder="搜索你想要的" @keyup="search()" v-model="key"> -->
      <div style="position: relative;bottom: 0.1rem;">
        <p class="input">
          <span @click="selShow1=!selShow1">阶数：{{input1}}</span>

          <ul class="select1" v-show="selShow1">
            <li v-for="item in list1" @click="add(1,item)">{{item.name}}</li>
          </ul>

        </p>
        <p class="input">
          <span @click="selShow2=!selShow2">品级：{{input2}}</span>
          <ul class="select2" v-show="selShow2">
            <li v-for="item in list2" @click="add(2,item)">{{item.name}}</li>

          </ul>

        </p>
        <p class="input">
          <span @click="selShow3=!selShow3">系列：{{input3}}</span>
          <ul class="select3" v-show="selShow3">
            <li v-for="item in list3" @click="add(3,item)">{{item.name}}</li>
          </ul>

        </p>
      </div>
    </div>
    <div class="list">
      <scroller :on-infinite="infinite" ref="myscroller">
        <div class="box" v-for="item in marketData">
          <div class="info">
            <span class="name">{{item.itemname}}</span>
            <span v-if="item.itemtype !== 4" class="jlz">炼力值:{{item.itemyl}}</span>
            <span v-if="item.itemtype == 4" class="jlz">冷却:{{item.itemcdcrit}}%跃升:{{item.itemylcrit}}%</span>
            <span class="level">{{item.powername}}</span>
            <span class="ens">ENS:{{item.price}}</span>
          </div>
          <img src="../assets/images/market_buy.png" alt="" @click="buy(item)">
        </div>
      </scroller>
    </div>
    <notice v-show="noticeShow">购买成功，区块确认中，请与10秒后在角色—交易记录中 进行查看。
    </notice>

    <!-- 弹层 -->
    <div class="marketLayer" v-show="marketLayer">
      <div class="card">
        <div v-if="!(buyData.itemid == '1038' || buyData.itemid == '1039' || buyData.itemid == '1040') && buyData.itemtype != '4'" class="itemyl">{{buyData.itemyl}}</div>
        <div v-if="!(buyData.itemid == '1038' || buyData.itemid == '1039' || buyData.itemid == '1040') && buyData.itemtype == '4'" class="itemys">{{buyData.itemylcrit}}%</div>
        <div v-if="!(buyData.itemid == '1038' || buyData.itemid == '1039' || buyData.itemid == '1040') && buyData.itemtype == '4'" class="itemcd">{{buyData.itemcdcrit}}%</div>
        <img class="levelimg" :src="'../../static/images/'+ buyData.levelimg + '.png'" alt="">
        <img :src="'../../static/images/'+ buyData.img + '.png'" alt="">
      </div>
      <p>{{buyData.price}}ENS</p>
      <div class="box">
        <img src="../assets/images/role_ok.png" alt="" class="ok" @click="buyFn(buyData)">
        <img src="../assets/images/role_no.png" alt="" class="no" @click="marketLayer=false">
      </div>
    </div>
    <notice v-show="sign">{{signData}}</notice>
  </div>
</template>

<script>
  import data from '../json/carddata'
  import leveldata from '../json/cardlevel'

  export default {
    data() {
      return {
        carddata: data,
        cardlevel:leveldata,
        signData: '',
        marketData: '',
        noticeShow: false,
        marketLayer: false,
        selShow1: false,
        selShow2: false,
        selShow3: false,
        sign: false,
        input1: "全部",
        input2: "全部",
        input3: "全部",
        list1: [{
          name: "全部",
          type: '0'
        }, {
          name: "一阶",
          type: 1
        }, {
          name: "二阶",
          type: 2
        }, {
          name: "三阶",
          type: 3
        }, {
          name: "四阶",
          type: 4
        }, {
          name: "五阶",
          type: 5
        }, {
          name: "六阶",
          type: 6
        }, {
          name: "七阶",
          type: 7
        }, {
          name: "八阶",
          type: 8
        }, {
          name: "九阶",
          type: 9
        }, {
          name: "十阶",
          type: 10
        }],
        list2: [{
          name: "全部",
          type: '0'
        }, {
          name: "平淡无奇",
          type: 1
        }, {
          name: "星罗棋布",
          type: 2
        }, {
          name: "屈指可数",
          type: 3
        }, {
          name: "绝无仅有",
          type: 4
        }, {
          name: "世所罕见",
          type: 5
        }, {
          name: "珍奇异宝",
          type: 6
        }, {
          name: "百年难遇",
          type: 7
        }, {
          name: "沧海一粟",
          type: 8
        }, {
          name: "空前绝后",
          type: 9
        }, {
          name: "寥若星辰",
          type: 10
        }],
        list3: [{
          name: "全部",
          type: ''
        }, {
          name: "戒指",
          type: "1"
        }, {
          name: "臂章",
          type: "2"
        }, {
          name: "项链",
          type: "4"
        }, {
          name: "手镯",
          type: "3"
        }, {
          name: "药剂",
          type: "100"
        }],
        buyData: '',
        pid: 0,
        powerid: 0,
        itemtype: "",
        key: "",

        noData: '',
        moveList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        lastTime:""
      }
    },
    methods: {
      buyFn(obj) {
        let self = this;
        var url = this.http184 + "/app/EnsContract";
        var type = 6666;
        var args = [sessionStorage.getItem("address"), "1004\u0004" + obj.packid];
        var result = this.$utils.contract(type, args, url, function (data) {
          self.marketLayer = false;
          if (data.result == false) {
            if (data.msg == '合约失败,Error: Invalid timestamp') {
              self.signData = '请更新手机时间';
            }else if(data.msg == 'Error: Apply transaction error: Error: L10022' || data.msg == 'Error: Apply transaction error: Error: L10009'){
              self.signData = '余额不足';
            } else {
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
            self.init();
          }
          console.log("返回结果", data);
        });
      },
      add(type, obj) {
        if (type == 1) {
          this.input1 = obj.name;
          this.pid = obj.type;
          this.selShow1 = false;
          this.init()
        } else if (type == 2) {
          this.input2 = obj.name;
          this.powerid = obj.type;
          this.selShow2 = false;
          this.init()
        } else if (type == 3) {
          this.input3 = obj.name;
          this.itemtype = obj.type;
          this.selShow3 = false;
          this.init()
        }
      },
      init(time) {
        var _this = this;
        var params = {
          pid: _this.pid,
          powerid: _this.powerid,
          itemtype: _this.itemtype,
          saleuptime: time||"2040/12/12"
        }
        _this.$axios({
          method: 'get',
          url: _this.http184 + '/wb/marketlist',
          params: params
        }).then((res) => {
          if(!!time){
            _this.marketData = _this.marketData.concat(res.data.data);
          }else{
            _this.marketData = res.data.data;
          }
        
          _this.lastTime = res.data.data[res.data.data.length-1].saleuptime;
        }, (error) => {
          console.log(error);
        });
      },
      buy(ele) {
        let self = this;
        self.marketLayer = true;
        self.buyData = ele;
        for (var a = 0; a < self.carddata.length; a++) {
          if (self.buyData.itemid == self.carddata[a].id) {
            self.buyData.img = self.carddata[a].img
          }
        }
        for (var v = 0; v < self.cardlevel.length; v++) {
          if (self.buyData.powerid == self.cardlevel[v].id) {
            self.buyData.levelimg = self.cardlevel[v].img
          }
          }
        self.packid = self.buyData.packid
      },
      //购买装备
      buyEquip() {
        let self = this;
        var url = this.http184 + "/app/EnsContract";
        var type = 6666;
        var args = [sessionStorage.getItem("address"), "1004\u0004" + this.packid];
        var result = this.$utils.contract(type, args, url, function (data) {
          self.tcShow = false;
          if (data.result == false) {
            if (data.msg == '合约失败,Error: Invalid timestamp') {
              self.signData = '请更新手机时间';
            } else {
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
          }
          console.log("返回结果", data);
        });

      },
      infinite(done) {
      
      this.init(this.lastTime);
          
      setTimeout(() => {
        done();
      }, 2000);
        // if(this.noData) {
        // setTimeout(()=>{
        //     this.$refs.myscroller.finishInfinite(2);
        // })
        // return;
        // }
        // let self = this;
        // let start = this.moveList.length;

        // setTimeout(() => {
        //     for(let i = start + 1; i < start + 10; i++) {
        //         self.moveList.push(i)
        //     }
        //     if(start > 30) {
        //         self.noData = "没有更多数据"
        //     }
        //     self.$refs.myscroller.resize();
        //     done()
        // }, 1500)

    },
    refresh() {
        console.log('refresh')
    },
      search() {
        var _this = this;
        //_this.key

        // var params = {
        //   pid: _this.pid,
        //   powerid: _this.powerid,
        //   itemtype: _this.itemtype,
        //   saleuptime: "2040/12/12"
        // }
        // _this.$axios({
        //   method: 'get',
        //   url: _this.http184 + '/wb/marketlist',
        //   params: params
        // }).then((res) => {
        //   console.log("市场列表", res.data);
        //   _this.marketData = res.data.data;
        // }, (error) => {
        //   console.log(error);
        // });
        //麻痹没有查询字段,傻逼后端
      }
    },
    mounted() {
      this.init();

      

    }
  }
</script>


<style>
  .market {
    width: 100%;
  }

  .market .search {
    width: 95%;
    /* height: 2.3rem; */
    /* background: url("../assets/images/market_search.png") no-repeat; */
    background-size: 100%;
    margin: 15px 0 5px 2.5%;
  }

  .market .search input {
    background: transparent;
    outline: 0;
    border: none;
    font-size: 0.4rem;
    position: relative;
    bottom: 0.38rem;
    left: 1.3rem;
  }

  .market .search p.input {
    width: 30%;
    height: 1.1rem;
    background: url("../assets/images/market_input.png") no-repeat;
    background-size: 100%;
    display: inline-block;
    margin: 0 0.5%;
    color: #be8749;
    font-size: 0.4rem;
    line-height: 1.1rem;
    position: relative;
  }


  .market .search p.input span {
    margin-left: 12px;
    width: 2.4rem;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }


  .market .search .select1 {
    position: absolute;
    width: 2rem;
    height: 8.8rem;
    background: url("../assets/images/market_input_1.png") no-repeat;
    background-size: 100% 100%;
    z-index: 66;
    top: 1.1rem;
    margin-left: 1.1rem;
  }

  .market .search .select1 li {
    color: #2a1b0d;
    font-size: 0.4rem;
    font-weight: bold;
    text-align: center;
    height: 0.77rem;
  }

  .market .search .select2 {
    position: absolute;
    width: 2.7rem;
    height: 8.8rem;
    background: url("../assets/images/market_input_2.png") no-repeat;
    background-size: 100% 100%;
    z-index: 66;
    top: 1.1rem;
    margin-left: 0.4rem;
  }

  .market .search .select2 li {
    color: #2a1b0d;
    font-size: 0.4rem;
    font-weight: bold;
    text-align: center;
    height: 0.77rem;
  }

  .market .search .select3 {
    position: absolute;
    width: 1.6rem;
    height: 5.5rem;
    background: url("../assets/images/market_input_3.png") no-repeat;
    background-size: 100% 90%;
    z-index: 66;
    top: 1.1rem;
    margin-left: 1.4rem;
  }

  .market .search .select3 li {
    color: #2a1b0d;
    font-size: 0.4rem;
    font-weight: bold;
    text-align: center;
    height: 0.77rem;
  }

  .market .list {
    width: 95%;
    margin-left: 2.5%;
    display: inline-block;
    position: relative;
    height: 17rem;
  }

  .market .list .box {
    width: 100%;
    height: 2.6rem;
    background: url("../assets/images/market_bg.png") repeat-y;
    background-size: 100%;
    position: relative;

  }

  .market .list .box .info {
    margin-left: .8rem;
    margin-top: .8rem;
    display: inline-block;
  }

  .market .list .box .info span {
    font-size: 0.4rem;
    color: #472c0e;
    display: inline-block;
    float: left;
  }
  
  .market .list .box .info span.name{
    width: 2rem;
  }
  .market .list .box .info span.jlz{
    width: 6rem;
    margin-right: 1rem;
  }
   .market .list .box .info span.level{
    width: 2rem;
    margin-top: .1rem;
  }
  .market .list .box .info span.ens{
    width: 6rem;
    margin-top: .1rem;
  }

  .market .list .box img {
    width: 20%;
    display: inline-block;
    position: absolute;
    top: 0.9rem;
    right: 0.7rem;
  }

  .market input::-webkit-input-placeholder {
    color: #be8749;
  }

  .market input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #be8749;
  }

  .market input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #be8749;
  }

  .market input:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #be8749;
  }


  .marketLayer {
    width: 80%;
    margin-left: 10%;
    height: 350px;
    background: url("../assets/images/market_layer.png") no-repeat;
    background-size: 100%;
    position: fixed;
    top: 30%;
  }

  .marketLayer .card {
    width: 3.15rem;
    height: 4.2rem;
    text-align: center;
    margin: 0 auto;
    margin-top: 1.2rem;
    position: relative;
  }

  .marketLayer .card img {
    width: auto;
    margin: 0 auto;
    height: 100%;
    display: inline-block;
  }

  .marketLayer .card .itemyl{
    width: auto;
    color: #fff;
    font-size: 0.1rem;
    position: absolute;
    left: 1.8rem;
    top: .55rem;
  }
  .marketLayer .card .itemys{
    width: 1rem;
    color: #fff;
    font-size: 0.1rem;
    position: absolute;
    left: 1rem;
    top: .55rem;
  }
  .marketLayer .card .itemcd{
    width: 1rem;
    color: #fff;
    font-size: 0.1rem;
    position: absolute;
    left: 2.2rem;
    top: .55rem;
  }
  .marketLayer .card .levelimg {
    width: 100%;
    height: 100%;
    position: absolute;
    left:0;
    top:0;
    z-index: 100;
    vertical-align: top;
  }

  .marketLayer p {
    font-size: 0.5rem;
    text-align: center;
    line-height: 1.35rem;
    color: #eda41a;
    text-shadow: 0 1px #3f291b, 1px 0 #3f291b, -1px 0 #3f291b, 0 -1px #3f291b;
  }

  .marketLayer .box {
    text-align: center;
    margin-top: 0.5rem;
  }


  .marketLayer img.ok {
    width: 30%;
  }

  .marketLayer img.no {
    width: 30%;
  }
</style>