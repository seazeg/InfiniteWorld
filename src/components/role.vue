<template>
  <div class="role">
    <img src="../assets/images/role_button.png" alt="" @click="open" v-show="!this.layerShow">
    <transition name="component-fade" mode="out-in">
      <div class="layer" v-show="layerShow">
        <div class="left">
          <p @click="change(1)">
            <img src="../assets/images/role1.jpg" alt="" v-if="!left.role1">
            <img src="../assets/images/role1_hover.jpg" alt="" v-else>
          </p>
          <p @click="change(2)">
            <img src="../assets/images/role2.jpg" alt="" v-if="!left.role2">
            <img src="../assets/images/role2_hover.jpg" alt="" v-else>
          </p>
          <p @click="change(3)">
            <img src="../assets/images/role3.jpg" alt="" v-if="!left.role3">
            <img src="../assets/images/role3_hover.jpg" alt="" v-else>
          </p>
          <p @click="change(4)">
            <img src="../assets/images/role4.jpg" alt="" v-if="!left.role4">
            <img src="../assets/images/role4_hover.jpg" alt="" v-else>
          </p>
        </div>
        <div class="right">
          <div v-if="left.role1">
            <div class="roleInfo">
              <span class="field">领悟：11</span>
              <span class="field">精神：120</span>
              <span class="field">冷却：12%</span>
              <span class="field">跃升：11%</span>
            </div>
            <div class="roleinfo2">
              <span>
                <p>角宫</p>
              </span>
              <span>
                <p>入相</p>
              </span>
              <span>
                <p>映点</p>
              </span>
              <span>
                <p>善星</p>
              </span>
            </div>
          </div>
          <div v-if="left.role2">
            <div class="roleinfo2 fixed">
              <span @click="rolezb=true">
                <div class="role_zb" v-show="rolezb">
                  <div>装备</div>
                  <div @click="rolesj=true">上架</div>
                  <div @click="rolefj=true">分解</div>
                </div>
              </span>
              <span>
              </span>
              <span>
              </span>
              <span>
              </span>
              <span>
              </span>
              <span>
              </span>
              <span>
              </span>
              <span>
              </span>
            </div>
          </div>
          <div v-if="left.role3">
            <div class="roleinfo2 fixed">
              <table class="table">
                <thead>
                  <tr>
                    <th>价格</th>
                    <th>时间</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>封印之约 30ENS</td>
                    <td>5/16 10:32</td>
                    <td>
                      <a>取消</a>
                    </td>
                  </tr>
                  <tr>
                    <td>封印之约 30ENS</td>
                    <td>5/16 10:32</td>
                    <td>
                      <a>取消</a>
                    </td>
                  </tr>
                  <tr>
                    <td>封印之约 30ENS</td>
                    <td>5/16 10:32</td>
                    <td>
                      <a>取消</a>
                    </td>
                  </tr>
                  <tr>
                    <td>封印之约 30ENS</td>
                    <td>5/16 10:32</td>
                    <td>
                      <a>取消</a>
                    </td>
                  </tr>
                  <tr>
                    <td>封印之约 30ENS</td>
                    <td>5/16 10:32</td>
                    <td>
                      <a>取消</a>
                    </td>
                  </tr>
                  <tr>
                    <td>封印之约 30ENS</td>
                    <td>5/16 10:32</td>
                    <td>
                      <a>取消</a>
                    </td>
                  </tr>
                  <tr>
                    <td>封印之约 30ENS</td>
                    <td>5/16 10:32</td>
                    <td>
                      <a>取消</a>
                    </td>
                  </tr>
                  <tr>
                    <td>封印之约 30ENS</td>
                    <td>5/16 10:32</td>
                    <td>
                      <a>取消</a>
                    </td>
                  </tr>
                  <tr>
                    <td>封印之约 30ENS</td>
                    <td>5/16 10:32</td>
                    <td>
                      <a>取消</a>
                    </td>
                  </tr>
                  <tr>
                    <td>封印之约 30ENS</td>
                    <td>5/16 10:32</td>
                    <td>
                      <a>取消</a>
                    </td>
                  </tr>
                  <tr>
                    <td>封印之约 30ENS</td>
                    <td>5/16 10:32</td>
                    <td>
                      <a>取消</a>
                    </td>
                  </tr>
                  <tr>
                    <td>封印之约 30ENS</td>
                    <td>5/16 10:32</td>
                    <td>
                      <a>取消</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div v-if="left.role4">
            <div class="roleinfo2 fixed">
              <table class="table">
                <thead>
                  <tr>
                    <th>交易</th>
                    <th>时间</th>

                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>封印之约 30ENS</td>
                    <td>5/16 10:32</td>
                  </tr>
                  <tr>
                    <td>封印之约 30ENS</td>
                    <td>5/16 10:32</td>
                  </tr>
                  <tr>
                    <td>封印之约 30ENS</td>
                    <td>5/16 10:32</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <notice v-show="noticeShow">分解成功，区块确认中，请与10秒后在角色—背包中进行 查看。
    </notice>
    <!-- 分解 -->
    <div class="role_fenjie" v-show="rolefj">
      <div class="box">
        <img src="../assets/images/role_ok.png" alt="" class="ok" @click="">
        <img src="../assets/images/role_no.png" alt="" class="no" @click="rolefj=false">
      </div>

    </div>
    <!-- 上架 -->
    <div class="rolesj" v-show="rolesj">
      <input type="number" value="" v-model="roleENS">
      <div class="box">
        <img src="../assets/images/role_ok.png" alt="" class="ok" @click="">
        <img src="../assets/images/role_no.png" alt="" class="no" @click="rolesj=false,roleENS=''">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        layerShow: false,
        left: {
          role1: true,
          role2: false,
          role3: false,
          role4: false
        },
        rolezb: false,
        noticeShow: false,
        rolefj: false,
        rolesj: false,
        roleENS: ""
      }
    },
    methods: {
      open() {
        this.layerShow = !this.layerShow
      },
      change(type) {
        if (type == 1) {
          this.left.role1 = true
          this.left.role2 = false
          this.left.role3 = false
          this.left.role4 = false
        } else if (type == 2) {
          this.left.role1 = false
          this.left.role2 = true
          this.left.role3 = false
          this.left.role4 = false
        } else if (type == 3) {
          this.left.role1 = false
          this.left.role2 = false
          this.left.role3 = true
          this.left.role4 = false
        } else if (type == 4) {
          this.left.role1 = false
          this.left.role2 = false
          this.left.role3 = false
          this.left.role4 = true
        }
      },
      roleInit() {
        var _this = this;
        var params = {
          address: "AAQ43FbgeZvwDZXyVKyqfJisNV2RYYtRyp",
        }
        _this.$axios({
          method: 'get',
          url: _this.http184 + '/wb/rolepack',
          params: params
        }).then((res) => {
          console.log("角色装备", res.data);
        }, (error) => {
          console.log(error);
        });
      },
      bagInit() {
        var _this = this;
        var params = {
          itemtype: "",
          address: "AAQ43FbgeZvwDZXyVKyqfJisNV2RYYtRyp",
          packid: 999999999
        }
        _this.$axios({
          method: 'get',
          url: _this.http184 + '/wb/mypacklist',
          params: params
        }).then((res) => {
          console.log("背包列表", res.data);
        }, (error) => {
          console.log(error);
        });
      },
      buyListInit() {
        var _this = this;
        var params = {
          itemtype: "",
          address: "AAQ43FbgeZvwDZXyVKyqfJisNV2RYYtRyp",
          saletime: "2040/12/12"
        }
        _this.$axios({
          method: 'get',
          url: _this.http184 + '/wb/buylist',
          params: params
        }).then((res) => {
          console.log("交易记录", res.data);
        }, (error) => {
          console.log(error);
        });
      },
      saleListInit() {
        var _this = this;
        var params = {
          itemtype: "",
          address: "AAQ43FbgeZvwDZXyVKyqfJisNV2RYYtRyp",
          saletime: "2040/12/12"
        }
        _this.$axios({
          method: 'get',
          url: _this.http184 + '/wb/salelist',
          params: params
        }).then((res) => {
          console.log("卖出记录", res.data);
        }, (error) => {
          console.log(error);
        });
      },
      myGroundingInit() {
        var _this = this;
        var params = {
          itemtype: "",
          address: "AAQ43FbgeZvwDZXyVKyqfJisNV2RYYtRyp",
          saleuptime: "2040/12/12"
        }
        _this.$axios({
          method: 'get',
          url: _this.http184 + '/wb/mymarketlist',
          params: params
        }).then((res) => {
          console.log("卖出记录", res.data);
        }, (error) => {
          console.log(error);
        });
      },
    },
    mounted() {
      //获取角色穿戴
      this.roleInit();
      //背包内容初始化
      this.bagInit();
      //交易列表初始化
      this.buyListInit();
      //卖出记录
      this.saleListInit();
      //我的上架
      this.myGroundingInit();
    }
  }

</script>

<style>
  .role>img {
    width: 100%;
    position: absolute;
    bottom: 15%;
  }

  .role .layer {
    background: url("../assets/images/role_pop.png") no-repeat;
    background-size: 100%;
    width: 95%;
    height: 480px;
    position: absolute;
    top: 12%;
    margin-left: 2.5%;
  }

  .role .layer .left {
    position: relative;
    width: 28%;
    margin-left: 4.5%;
    display: inline-block;
    margin-top: 35px;
  }

  .role .layer .left>p {
    width: 100%;
  }

  .role .layer .left>p img {
    width: 100%;

  }

  .role .layer .right {
    width: 63%;
    float: right;
    margin-top: 35px;

  }

  .role .layer .right .roleInfo {
    margin-bottom: 10px;
  }

  .role .layer .right .roleInfo .field {
    width: 32%;
    display: inline-block;
    background: url("../assets/images/role_icon.png") no-repeat;
    background-size: 100%;
    font-size: 0.38rem;
    padding: 0 10px;
    line-height: 30px;
    color: #eda41a;
    text-shadow: 0 1px #3f291b, 1px 0 #3f291b, -1px 0 #3f291b, 0 -1px #3f291b;
  }


  .role .layer .right .roleinfo2 {
    overflow-y: scroll;
    height: 243px;
  }


  .role .layer .right .roleinfo2 span {
    width: 40%;
    height: 130px;
    background: #85735b;
    display: inline-block;
    position: relative;
  }

  .role .layer .right .roleinfo2 span p {
    width: 100%;
    background: #463d30;
    height: 30px;
    color: #fff;
    font-size: 0.32rem;
    text-align: center;
    line-height: 30px;
    position: absolute;
    bottom: 0;
  }

  .role .layer .right .roleinfo2.fixed {
    margin-top: 20px;
    overflow-y: scroll;
    height: 324px;
  }

  .role .layer .right .roleinfo2.fixed>span {
    position: relative;
  }

  .role .layer .right .roleinfo2 .role_zb {
    width: 70%;
    height: 100px;
    display: inline-block;
    background: url("../assets/images/role_zb.jpg") no-repeat;
    background-size: 100%;
    font-size: 0.38rem;
    position: absolute;
    right: 0;
    padding: 10px 0;
  }

  .role .layer .right .roleinfo2 .role_zb>div {
    width: 100%;
    text-align: center;
    padding: 3px 0;
    color: #2a1b0d;
    font-weight: bold
  }

  .role_fenjie {
    width: 80%;
    margin-left: 10%;
    height: 300px;
    background: url("../assets/images/role_fenjie.png") no-repeat;
    background-size: 100%;
    position: absolute;
    top: 20%;
  }


  .role_fenjie .box {
    text-align: center;
    margin-top: 3.6rem;
  }

  .role_fenjie img.ok {
    width: 30%;
  }

  .role_fenjie img.no {
    width: 30%;
  }

  .rolesj {
    width: 80%;
    margin-left: 10%;
    height: 350px;
    background: url("../assets/images/role_shangjia.png") no-repeat;
    background-size: 100%;
    position: absolute;
    top: 20%;
  }

  .rolesj input {
    width: 41%;
    margin: 3.2rem 3.1rem 0 2.8rem;
    padding: 5px;
    position: relative;
    z-index: 1000;
    background: transparent;
    padding: 10px;
    font-size: 0.16rem;
    outline: 0;
    border: 0;
  }

  .rolesj .box {
    text-align: center;
    margin-top: 2rem;
  }


  .rolesj img.ok {
    width: 30%;
  }

  .rolesj img.no {
    width: 30%;
  }

  .role .layer .right .table {
    width: 86%;
    /* margin-top: 20px; */
  }

  .role .layer .right .table th {
    font-size: 0.42rem;
    color: #d2b46c;
    text-shadow: 0 1px #452b2a, 1px 0 #452b2a, -1px 0 #452b2a, 0 -1px #452b2a;
    background: rgba(185, 159, 108, 0.8);
    padding: 5px 0;
  }

  .role .layer .right .table td {
    padding: 10px 0;
    font-size: 0.3rem;
    color: #452b2a;
    border-bottom: 1px solid #452b2a;
    text-align: center;
  }

  .role .layer .right .table td a {
    color: #1b3fb9;
    text-decoration: underline;
  }

  @media screen and (max-width: 320px) {
    .role .layer .right .roleinfo2 {
      height: 200px
    }
    .role .layer .right .roleinfo2.fixed {
      height: 270px;
    }
  }

  @media (min-width: 379px) and (max-width: 414px) {
    .role .layer .right .roleinfo2 {
      height: 275px
    }
    .role .layer .right .roleinfo2.fixed {
      height: 365px;
    }
  }

</style>
