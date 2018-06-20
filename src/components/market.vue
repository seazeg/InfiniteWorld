<template>
  <div class="market">
    <div class="search">
      <input type="text" placeholder="搜索你想要的">
      <div style="position: relative;bottom: 0.1rem;">
        <p class="input">
          <span @click="selShow1=!selShow1">阶数：{{input1}}</span>

          <ul class="select1" v-show="selShow1">
            <li v-for="item in list1" @click="add(1,item.name)">{{item.name}}</li>
          </ul>

        </p>
        <p class="input">
          <span @click="selShow2=!selShow2">品级：{{input2}}</span>
          <ul class="select2" v-show="selShow2">
            <li v-for="item in list2" @click="add(2,item.name)">{{item.name}}</li>

          </ul>

        </p>
        <p class="input">
          <span @click="selShow3=!selShow3">系列：{{input3}}</span>
          <ul class="select3" v-show="selShow3">
            <li v-for="item in list3" @click="add(3,item.name)">{{item.name}}</li>
          </ul>

        </p>
      </div>
    </div>
    <div class="list">
      <div class="box" v-for="item in marketData">
        <div class="info">
          <span>尘位之臣</span>
          <span>炼力值:30</span>
          <span>ENS</span>
        </div>
        <img src="../assets/images/market_buy.png" alt="">
      </div>
      <!-- <div class="box">
        <div class="info">
          <span>尘位之臣</span>
          <span>炼力值:30</span>
          <span>35ENS</span>
        </div>
        <img src="../assets/images/market_buy.png" alt="">
      </div>
      <div class="box">
        <div class="info">
          <span>尘位之臣</span>
          <span>炼力值:30</span>
          <span>35ENS</span>
        </div>
        <img src="../assets/images/market_buy.png" alt="">
      </div>
      <div class="box">
        <div class="info">
          <span>尘位之臣</span>
          <span>炼力值:30</span>
          <span>35ENS</span>
        </div>
        <img src="../assets/images/market_buy.png" alt="">
      </div> -->
    </div>
    <notice v-show="noticeShow">购买成功，区块确认中，请与10秒后在角色—交易记录中 进行查看。
    </notice>

    <!-- 弹层 -->
    <div class="marketLayer" v-show="marketLayer">
      <div class="card">
        <img src="" alt="">
      </div>
      <p>35ENS</p>
      <div class="box">
        <img src="../assets/images/role_ok.png" alt="" class="ok" @click="">
        <img src="../assets/images/role_no.png" alt="" class="no" @click="marketLayer=false">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        marketData:'',
        noticeShow: true,
        marketLayer: false,
        selShow1: false,
        selShow2: false,
        selShow3: false,
        input1: "全部",
        input2: "全部",
        input3: "全部",
        list1: [{
          name: "一阶"
        }, {
          name: "二阶"
        }, {
          name: "三阶"
        }, {
          name: "四阶"
        }, {
          name: "五阶"
        }, {
          name: "六阶"
        }, {
          name: "七阶"
        }, {
          name: "八阶"
        }, {
          name: "九阶"
        }, {
          name: "十阶"
        }],
        list2: [{
          name: "平淡无奇"
        }, {
          name: "星罗棋布"
        }, {
          name: "屈指可数"
        }, {
          name: "绝无仅有"
        }, {
          name: "世所罕见"
        }, {
          name: "珍奇异宝"
        }, {
          name: "百年难遇"
        }, {
          name: "沧海一粟"
        }, {
          name: "空前绝后"
        }, {
          name: "寥若星辰"
        }],
        list3: [{
          name: "戒指"
        }, {
          name: "臂章"
        }, {
          name: "项链"
        }, {
          name: "手镯"
        }]
      }
    },
    methods: {
      add(type, obj) {
        if (type == 1) {
          this.input1 = obj;
          this.selShow1 = false;
        } else if (type == 2) {
          this.input2 = obj;
          this.selShow2 = false;
        } else if (type == 3) {
          this.input3 = obj;
          this.selShow3 = false;
        }
      },
      init() {
        var _this = this;
        var params = {
          pid: 0,
          powerid: 0,
          itemtype: "",
          saleuptime: "2040/12/12"
        }
        _this.$axios({
          method: 'get',
          url: _this.http184 + '/wb/marketlist',
          params: params
        }).then((res) => {
          console.log("市场列表", res.data);
          _this.marketData = res.data.data;
        }, (error) => {
          console.log(error);
        });

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
    height: 2.3rem;
    background: url("../assets/images/market_search.png") no-repeat;
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
    height: 8.5rem;
    background: url("../assets/images/market_input_1.png") no-repeat;
    background-size: 100%;
    z-index: 66;
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
    height: 8.5rem;
    background: url("../assets/images/market_input_2.png") no-repeat;
    background-size: 100%;
    z-index: 66;
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
    background-size: 100%;
    z-index: 66;
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
  }

  .market .list .box {
    width: 100%;
    height: 2.6rem;
    background: url("../assets/images/market_bg.png") repeat-y;
    background-size: 100%;

  }

  .market .list .box .info {
    line-height: 2.2rem;
    margin-left: 1.2rem;
    display: inline-block;
  }

  .market .list .box .info span {
    font-size: 0.4rem;
    color: #472c0e;
  }

  .market .list .box img {
    width: 20%;
    display: inline-block;
    position: relative;
    top: 0.3rem;
    left: 0.5rem;
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
    position: absolute;
    top: 20%;
  }

  .marketLayer .card {
    width: 80%;
    height: 4.2rem;
    background: #fff;
    margin: 0 auto;
    margin-top: 1.2rem;
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
