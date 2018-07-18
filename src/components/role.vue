<template>
  <div class="role">
    <div class="m-jsbox" @click="audio">
      <img src="" alt="" class="m-jsboximg">
    </div>
    <img src="../assets/images/role_button.png" alt="" @click="open" v-show="!this.layerShow &&btnshow">
    <transition name="component-fade" mode="out-in">
      <div class="layer" v-show="layerShow">
        <div class="left">
          <p @click="change(1)">
            <img src="../assets/images/role1.jpg" alt="" v-if="!left.role1" @click="rolepackInit()">
            <img src="../assets/images/role1_hover.jpg" alt="" v-else>
          </p>
          <p @click="change(2)">
            <img src="../assets/images/role2.jpg" alt="" v-if="!left.role2">
            <img src="../assets/images/role2_hover.jpg" alt="" v-else>
          </p>
          <p @click="change(3)">
            <img src="../assets/images/role3.jpg" alt="" v-if="!left.role3" @click="myGroundingInit()">
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
              <span class="field">领悟：{{roleInfo.roleyl}}</span>
              <span class="field">精神：{{roleInfo.rolejs}}</span>
              <span class="field">冷却：{{roleInfo.rolecdcrit}}%</span>
              <span class="field">跃升：{{roleInfo.roleylcrit}}%</span>
            </div>
            <div class="roleinfo2">
              <span v-for="item in rolepack">
                <img v-if="item.isband == '1'" class="fyimg" :src="'../../static/images/fy_card.png'" alt="">
                <img v-if="item.isband == '0'" class="fyimg" :src="'../../static/images/jf_card.png'" alt="">
                <img class="levelimg" :src="'../../static/images/'+ item.levelimg + '.png'" alt="">
                <img class="img" :src="'../../static/images/'+ item.img + '.png'" alt="">
                <p>{{item.itemname}}</p>
              </span>
            </div>
          </div>
          <div v-if="left.role2">

            <div class="roleinfo2 fixed">
              <span v-for="(item, index) in bag" @click="showBtn(index)">
                <img v-if="item.isband == '0'" class="fyimg" :src="'../../static/images/fy_card.png'" alt="">
                <img v-if="item.isband == '1'" class="fyimg" :src="'../../static/images/jf_card.png'" alt="">
                <img class="levelimg" :src="'../../static/images/'+ item.levelimg + '.png'" alt="">
                <img class="img" :src="'../../static/images/'+ item.img + '.png'" alt="">
                <div class="role_zb" v-if="item.rolezb">
                  <div v-if="!item.iszb== '0' && item.isband == '1'" @click="equipOn(item)">装备</div>
                  <div v-if="item.iszb== '0' && item.isband == '1'" @click="equipOff(item)">卸下</div>
                  <div v-if="item.isband == '0'" @click="openSell(item)">上架</div>
                  <div v-if="item.isband == '0'" @click="openjf(item)">解封</div>
                  <div v-if="item.isband == '1'" @click="openfy(item)">封禁</div>
                  <div @click="deczb(item)">分解</div>
                </div>
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
                  <tr v-for="item in myGrounding">
                    <td>{{item.itemname}} {{item.price}}ENS</td>
                    <td>{{item.saleuptime}}</td>
                    <td>
                      <a href="javascript:;"  @click="sellDown(item)">取消</a>
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
                  <tr v-for="item in saleList">
                    <td>{{item.itemname}} {{item.price}}ENS</td>
                    <td>{{item.saletime}}</td>
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
        <img src="../assets/images/role_ok.png" alt="" class="ok" @click="decompose()">
        <img src="../assets/images/role_no.png" alt="" class="no" @click="rolefj=false">
      </div>
    </div>
    <!-- 封印 -->
    <div class="role_fengyin" v-show="rolefy">
      <div class="box">
        <div class="m-txt">再次封印将消耗</div>
	      <div class="m-txt01">ENS*{{fyens}}</div>
	      <div class="m-txt02">方解石*{{fyfjs}}</div>
        <img src="../assets/images/role_ok.png" alt="" class="ok" @click="fy()">
        <img src="../assets/images/role_no.png" alt="" class="no" @click="rolefy=false">
      </div>
    </div>
    <!-- 解封 -->
    <div class="role_jiefeng" v-show="rolejf">
      <div class="box">
        <img src="../assets/images/role_ok.png" alt="" class="ok" @click="jf()">
        <img src="../assets/images/role_no.png" alt="" class="no" @click="rolejf=false">
      </div>
    </div>
    <!-- 上架 -->
    <div class="rolesj" v-show="rolesj">
      <input type="number" value="" v-model="roleENS">
      <div class="box">
        <img src="../assets/images/role_ok.png" alt="" class="ok" @click="equipSell()">
        <img src="../assets/images/role_no.png" alt="" class="no" @click="rolesj=false,roleENS=''">
      </div>
    </div>
    <audio id="aud1">
      <!-- <source src="/i/song.ogg" type="audio/ogg"> -->
      <source src="../assets/audio/01.mp3" type="audio/mpeg">
    </audio>
    <audio id="aud2">
      <!-- <source src="/i/song.ogg" type="audio/ogg"> -->
      <source src="../assets/audio/02.mp3" type="audio/mpeg">
    </audio>
    <audio id="aud3">
      <!-- <source src="/i/song.ogg" type="audio/ogg"> -->
      <source src="../assets/audio/03.mp3" type="audio/mpeg">
    </audio>
    <audio id="aud4">
      <!-- <source src="/i/song.ogg" type="audio/ogg"> -->
      <source src="../assets/audio/04.mp3" type="audio/mpeg">
    </audio>
    <audio id="aud5">
      <!-- <source src="/i/song.ogg" type="audio/ogg"> -->
      <source src="../assets/audio/05.mp3" type="audio/mpeg">
    </audio>
    <audio id="aud6">
      <!-- <source src="/i/song.ogg" type="audio/ogg"> -->
      <source src="../assets/audio/06.mp3" type="audio/mpeg">
    </audio>
    <audio id="aud7">
      <!-- <source src="/i/song.ogg" type="audio/ogg"> -->
      <source src="../assets/audio/07.mp3" type="audio/mpeg">
    </audio>
    <audio id="aud8">
      <!-- <source src="/i/song.ogg" type="audio/ogg"> -->
      <source src="../assets/audio/08.mp3" type="audio/mpeg">
    </audio>
    <audio id="aud9">
      <!-- <source src="/i/song.ogg" type="audio/ogg"> -->
      <source src="../assets/audio/09.mp3" type="audio/mpeg">
    </audio>
    <audio id="aud10">
      <!-- <source src="/i/song.ogg" type="audio/ogg"> -->
      <source src="../assets/audio/10.mp3" type="audio/mpeg">
    </audio>
    <audio id="aud11">
      <!-- <source src="/i/song.ogg" type="audio/ogg"> -->
      <source src="../assets/audio/11.mp3" type="audio/mpeg">
    </audio>
    <audio id="aud12">
      <!-- <source src="/i/song.ogg" type="audio/ogg"> -->
      <source src="../assets/audio/12.mp3" type="audio/mpeg">
    </audio>
    <audio id="aud13">
      <!-- <source src="/i/song.ogg" type="audio/ogg"> -->
      <source src="../assets/audio/13.mp3" type="audio/mpeg">
    </audio>
    <audio id="aud14">
      <!-- <source src="/i/song.ogg" type="audio/ogg"> -->
      <source src="../assets/audio/14.mp3" type="audio/mpeg">
    </audio>
    <audio id="aud15">
      <!-- <source src="/i/song.ogg" type="audio/ogg"> -->
      <source src="../assets/audio/15.mp3" type="audio/mpeg">
    </audio>
    <audio id="aud16">
      <!-- <source src="/i/song.ogg" type="audio/ogg"> -->
      <source src="../assets/audio/16.mp3" type="audio/mpeg">
    </audio>
    <audio id="aud17">
      <!-- <source src="/i/song.ogg" type="audio/ogg"> -->
      <source src="../assets/audio/17.mp3" type="audio/mpeg">
    </audio>
    <audio id="aud18">
      <!-- <source src="/i/song.ogg" type="audio/ogg"> -->
      <source src="../assets/audio/18.mp3" type="audio/mpeg">
    </audio>
    <audio id="aud19">
      <!-- <source src="/i/song.ogg" type="audio/ogg"> -->
      <source src="../assets/audio/19.mp3" type="audio/mpeg">
    </audio>
    <audio id="aud20">
      <!-- <source src="/i/song.ogg" type="audio/ogg"> -->
      <source src="../assets/audio/20.mp3" type="audio/mpeg">
    </audio>
    <audio id="aud21">
      <!-- <source src="/i/song.ogg" type="audio/ogg"> -->
      <source src="../assets/audio/21.mp3" type="audio/mpeg">
    </audio>
    <audio id="aud22">
      <!-- <source src="/i/song.ogg" type="audio/ogg"> -->
      <source src="../assets/audio/22.mp3" type="audio/mpeg">
    </audio>
    <audio id="aud23">
      <!-- <source src="/i/song.ogg" type="audio/ogg"> -->
      <source src="../assets/audio/23.mp3" type="audio/mpeg">
    </audio>
    <audio id="aud24">
      <!-- <source src="/i/song.ogg" type="audio/ogg"> -->
      <source src="../assets/audio/24.mp3" type="audio/mpeg">
    </audio>
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
        layerShow: false,
        audioPlay: false,
        btnshow: true,
        jsImg: '1',
        oldVideo: '',
        oldstr: '',
        left: {
          role1: true,
          role2: false,
          role3: false,
          role4: false
        },
        //rolezb: false,
        sign: false,
        signData:'',
        sellPackid:'',
        decPackid:'',
        noticeShow: false,
        rolefj: false,
        rolefy: false,
        fyPackid:'',
        fyens:'',
        fyfjs:'',
        rolejf: false,
        jfPackid:'',
        rolesj: false,
        roleENS: "",
        myGrounding: [],
        saleList: [],
        buyList: [],
        bag: [],
        roleInfo: {
          roleyl: "",
          rolejs: "",
          rolecdcrit: "",
          roleylcrit: ""
        },
        rolepack: []
      }
    },
    methods: {
      open() {
        this.layerShow = !this.layerShow
      },
      showBtn(ele){
        let self = this;
        if(self.bag[ele].rolezb == true){
          self.bag[ele].rolezb = false;
        }else{
          for(var e=0; e<self.bag.length;e++){
            self.bag[e].rolezb = false;
          }
          self.bag[ele].rolezb = true;
        }
        
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
      //角色帧动画
      jskt() {
        let self = this;
        setInterval(function () {
          self.jsImg++;
          $('.m-jsboximg').attr('src', '../../static/images/img-js' + self.jsImg + '.png')
          if (self.jsImg == 24) {
            self.jsImg = 0;
          }
        }, 200)
      },
      roleInit() {
        var _this = this;
        var params = {
          address: sessionStorage.getItem("address")
        }
        _this.$axios({
          method: 'get',
          url: _this.http184 + '/wb/role',
          params: params
        }).then((res) => {
          if(res.data.data == null){
            _this.btnshow = false;
            _this.signData = '请先创建角色';
            _this.sign = true;
            setTimeout( function(){
              _this.sign = false;
            },2000);
          }else{
            _this.roleInfo = res.data.data;
          }
        }, (error) => {
          console.log(error);
        });
      },
      rolepackInit() {
        var _this = this;
        var params = {
          address: sessionStorage.getItem("address")
        }
        _this.$axios({
          method: 'get',
          url: _this.http184 + '/wb/rolepack',
          params: params
        }).then((res) => {
          _this.rolepack = res.data.data;
          for (var a = 0; a < _this.carddata.length; a++) {
            for (var b = 0; b < _this.rolepack.length; b++) {
              if (_this.rolepack[b].itemid == _this.carddata[a].id) {
                _this.rolepack[b].img = _this.carddata[a].img
              }
            }
          }
          for (var v = 0; v < _this.cardlevel.length; v++) {
            for (var z = 0; z < _this.rolepack.length; z++) {
              if (_this.rolepack[z].powerid == _this.cardlevel[v].id) {
                _this.rolepack[z].levelimg = _this.cardlevel[v].img
              }
            }
          }
        }, (error) => {
          console.log(error);
        });
      },
      bagInit() {
        var _this = this;
        var params = {
          itemtype: "",
          address: sessionStorage.getItem("address"),
          packid: 999999999
        }
        _this.$axios({
          method: 'get',
          url: _this.http184 + '/wb/mypacklist',
          params: params
        }).then((res) => {
          _this.bag = res.data.data;
          for (var c = 0; c < _this.bag.length; c++) {
           _this.$set(_this.bag[c],'rolezb',false);
          }
          for (var a = 0; a < _this.carddata.length; a++) {
            for (var b = 0; b < _this.bag.length; b++) {
              if (_this.bag[b].itemid == _this.carddata[a].id) {
                _this.bag[b].img = _this.carddata[a].img
              }
            }
          }
          for (var v = 0; v < _this.cardlevel.length; v++) {
            for (var z = 0; z < _this.bag.length; z++) {
              if (_this.bag[z].powerid == _this.cardlevel[v].id) {
                _this.bag[z].levelimg = _this.cardlevel[v].img
              }
            }
          }
        }, (error) => {
          console.log(error);
        });
      },
      buyListInit() {
        var _this = this;
        var params = {
          itemtype: "",
          address: sessionStorage.getItem("address"),
          saletime: "2040/12/12"
        }
        _this.$axios({
          method: 'get',
          url: _this.http184 + '/wb/buylist',
          params: params
        }).then((res) => {
          _this.buyList = res.data.data;
        }, (error) => {
          console.log(error);
        });
      },
      saleListInit() {
        var _this = this;
        var params = {
          itemtype: "",
          address: sessionStorage.getItem("address"),
          saletime: "2040/12/12"
        }
        _this.$axios({
          method: 'get',
          url: _this.http184 + '/wb/salelist',
          params: params
        }).then((res) => {
          _this.saleList = res.data.data;
        }, (error) => {
          console.log(error);
        });
      },
      myGroundingInit() {
        var _this = this;
        var params = {
          itemtype: "",
          address: sessionStorage.getItem("address"),
          saleuptime: "2040/12/12"
        }
        _this.$axios({
          method: 'get',
          url: _this.http184 + '/wb/mymarketlist',
          params: params
        }).then((res) => {
          _this.myGrounding = res.data.data;
        }, (error) => {
          console.log(error);
        });
      },
      //打开封禁弹窗
      openfy(ele) {
        var _this = this;
        _this.fyPackid = ele.packid;
        var params = {
          itemtype: "",
          address: sessionStorage.getItem("address"),
          packid: ele.packid,
        }
        _this.$axios({
          method: 'get',
          url: _this.http184 + '/wb/getbindcount',
          params: params
        }).then((res) => {
         console.log(res.data.data);
         _this.fyens = res.data.data.bindens;
         _this.fyfjs = res.data.data.bindcount;
         _this.rolefy = true;
        }, (error) => {
          console.log(error);
        });
      },
      //封禁装备
      fy() {
        let self =this;
        var url = this.http184 + "/app/EnsContract";
        var type = 6666;
        var args = [sessionStorage.getItem("address"),"1112\u0004"+self.fyPackid+"\u00041"];
        var result = this.$utils.contract(type, args, url,function(data){
          if(data.result == false){
            self.rolefy = false;
            self.signData = data.msg;
            self.sign = true;
            setTimeout( function(){
              self.sign = false;
            },2000)
          }else if(data.result == true){
            self.rolefy = false;
            self.signData = data.data;
            self.sign = true;
            setTimeout( function(){
              self.sign = false;
            },2000);
            self.bagInit();
          }
          console.log("返回结果",data);
        });
      },
      //打开解封弹窗
      openjf(ele) {
        let self = this;
        self.jfPackid = ele.packid;
        self.rolejf = true;
      },
      //解封装备
      jf() {
        let self =this;
        var url = this.http184 + "/app/EnsContract";
        var type = 6666;
        var args = [sessionStorage.getItem("address"),"1112\u0004"+self.jfPackid+"\u00040"];
        var result = this.$utils.contract(type, args, url,function(data){
          self.rolejf = false;
          if(data.result == false){
            self.signData = data.msg;
            self.sign = true;
            setTimeout( function(){
              self.sign = false;
            },2000)
          }else if(data.result == true){
            self.signData = data.data;
            self.sign = true;
            setTimeout( function(){
              self.sign = false;
            },2000);
            self.bagInit();
          }
          console.log("返回结果",data);
        });
      },
      //穿上装备
      equipOn(ele) {
        let self =this;
        var url = this.http184 + "/app/EnsContract";
        var type = 6666;
        var args = [sessionStorage.getItem("address"),"1101\u0004"+ele.packid+"\u00041"];
        var result = this.$utils.contract(type, args, url,function(data){
          if(data.result == false){
            self.signData = data.msg;
            self.sign = true;
            ele.rolezb = false;
            setTimeout( function(){
              self.sign = false;
            },2000)
          }else if(data.result == true){
            ele.rolezb = false;
            self.signData = data.data;
            self.sign = true;
            setTimeout( function(){
              self.sign = false;
            },2000)
          }
          console.log("返回结果",data);
        });
      },
      //卸下装备
      equipOff(ele) {
        let self =this;
        var url = this.http184 + "/app/EnsContract";
        var type = 6666;
        var args = [sessionStorage.getItem("address"),"1101\u0004"+ele.packid+"\u00040"];
        var result = this.$utils.contract(type, args, url,function(data){
          if(data.result == false){
            self.signData = data.msg;
            self.sign = true;
            ele.rolezb = false;
            setTimeout( function(){
              self.sign = false;
            },2000)
          }else if(data.result == true){
            ele.rolezb = false;
            self.signData = data.data;
            self.sign = true;
            setTimeout( function(){
              self.sign = false;
            },2000)
          }
          console.log("返回结果",data);
        });
      },
      //打开卖装备弹层
      openSell(ele) {
        let self =this;
        ele.rolezb = false;
        self.rolesj=true;
        self.sellPackid =ele.packid;
      },
      //卖装备
      equipSell() {
        let self =this;
        if(self.roleENS == ''){
          self.signData = '请正确填写卖价！';
          self.sign = true;
          setTimeout( function(){
            self.sign = false;
          },2000)
        }else{
          var url = this.http184 + "/app/EnsContract";
          var type = 6666;
          var args = [sessionStorage.getItem("address"),"1103\u0004"+self.sellPackid+"\u0004ENDLESS.ENS\u00041\u0004"+self.roleENS];
          var result = this.$utils.contract(type, args, url,function(data){
            if(data.result == false){
              self.signData = data.msg;
              self.rolesj=false;
              self.sign = true;
              setTimeout( function(){
                self.sign = false;
              },2000)
            }else if(data.result == true){
              self.rolesj=false;
              self.signData = data.data;
              self.sign = true;
              setTimeout( function(){
                self.sign = false;
              },2000)
            }
            console.log("返回结果",data);
          });
        }
      },
      //取消卖装备
      sellDown(ele) {
        let self =this;
          var url = this.http184 + "/app/EnsContract";
          var type = 6666;
          var args = [sessionStorage.getItem("address"),"1103\u0004"+ele.packid+"\u0004\u00040\u00040"];
          var result = this.$utils.contract(type, args, url,function(data){
            if(data.result == false){
              self.signData = data.msg;
              self.rolesj=false;
              self.sign = true;
              setTimeout( function(){
                self.sign = false;
              },2000)
            }else if(data.result == true){
              self.rolesj=false;
              self.signData = data.data;
              self.sign = true;
              setTimeout( function(){
                self.sign = false;
              },2000);
              self.myGroundingInit();
            }
            console.log("返回结果",data);
          });

      },
      //设定分解装备的Packid
      deczb(ele){
        let self = this;
        ele.rolezb = false;
        self.decPackid = ele.packid;
        self.rolefj = true;
      },
     //分解装备
      decompose() {
        let self =this;
        var url = this.http184 + "/app/EnsContract";
        var type = 6666;
        var args = [sessionStorage.getItem("address"),"1105\u0004"+self.decPackid];
        var result = this.$utils.contract(type, args, url,function(data){
          if(data.result == false){
            self.signData = data.msg;
            self.rolefj=false;
            self.sign = true;
            setTimeout( function(){
              self.sign = false;
            },2000)
          }else if(data.result == true){
            self.rolefj=false;
            self.signData = data.data;
            self.sign = true;
            setTimeout( function(){
              self.sign = false;
            },2000)
          }
          console.log("返回结果",data);
        });
        
      },

      audio() {
        let self = this;
        var num = Math.random(); //Math.random()：得到一个0到1之间的随机数
        num = Math.ceil(num * 24); //num*24的取值范围在0~80之间,使用向上取整就可以得到一个1~24的随机数
        //num就是你要的随机数,如果你希望个位数前加0,那么这样:
        var str;
        if (num < 10) {
          str = "0" + num
        } else {
          str = num.toString();
        }
        var myVideo = document.getElementById("aud" + str);
        if (self.oldVideo == '') {
          myVideo.play();
          self.oldVideo = document.getElementById("aud" + str);
        } else {
          if (self.oldstr != str) {
            self.oldVideo.pause();
            self.oldVideo.currentTime = 0;
            myVideo.play();
            self.oldVideo = document.getElementById("aud" + str);
          }
        }
        self.oldstr = str
      }
    },
    mounted() {
      //角色
      this.roleInit();
      //获取角色穿戴
      this.rolepackInit();
      //背包内容初始化
      this.bagInit();
      //交易列表初始化
      this.buyListInit();
      //卖出记录
      this.saleListInit();
      //我的上架
      this.myGroundingInit();
      //角色动画
      this.jskt()
    }
  }
</script>

<style>
  .role>img {
    width: 100%;
    position: absolute;
    bottom: 15%;
    left: 0;
    z-index: 100;
  }

  /* .role .m-jsbox {
    width: 9rem;
    height: 16rem;
    margin: 0 auto;
  } */

  .role .m-jsbox {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background-size: 100% 100%;
  }

  .role .m-jsbox img {
    width: 100%;
    height: 100%;
    display: inline-block;
    vertical-align: top;
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
    width: 60%;
    float: right;
    margin-top: 35px;
    margin-right: 5%;
  }

  .role .layer .right .roleInfo {
    margin-bottom: 10px;
    margin-left: .4rem;
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
    margin: 0 5% .2rem;
    height: 130px;
    background: #85735b;
    display: inline-block;
    position: relative;
  }

  .role .layer .right .roleinfo2 span p {
    width: 100%;
    background: rgba(70, 61, 48, .5);
    height: 30px;
    color: #fff;
    font-size: 0.32rem;
    text-align: center;
    line-height: 30px;
    position: absolute;
    bottom: 0;
  }

  .role .layer .right .roleinfo2 span .img {
    width: 100%;
    height: 100%;
    vertical-align: top;
  }
  .role .layer .right .roleinfo2 span .levelimg {
    width: 100%;
    height: 100%;
    position: absolute;
    left:0;
    top:0;
    z-index: 100;
    vertical-align: top;
  }
  .role .layer .right .roleinfo2 span .fyimg {
    width: 100%;
    height: 100%;
    position: absolute;
    left:0;
    top:0;
    z-index: 200;
    vertical-align: top;
  }

  .role .layer .right .roleinfo2.fixed {
    margin-top: 20px;
    overflow-y: scroll;
    height: 324px;
  }

  .role .layer .right .roleinfo2.fixed>span {
    position: relative;
    margin-bottom: .2rem;
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
    top:0;
    padding: 10px 0;
    z-index: 600;
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
    z-index: 1000;
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

  .role_fengyin {
    width: 80%;
    margin-left: 10%;
    height: 7.2rem;
    background: url("../assets/images/role_fengyin.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 20%;
    z-index: 1000;
  }


  .role_fengyin .box {
    text-align: center;
  }
  .role_fengyin .box .m-txt {
    width: 100%;
    display: inline-block;
    margin: .8rem 0 0;
    border: none;
    background: none;
    outline: none;
    font-size: .7rem;
    text-align: center;
  }
  .role_fengyin .box .m-txt01 {
    width: 100%;
    display: inline-block;
    margin: .2rem 0 0;
    border: none;
    background: none;
    outline: none;
    font-size: .7rem;
    text-align: center;
  }
  .role_fengyin .box .m-txt02 {
    width: 100%;
    display: inline-block;
    margin: .2rem 0 .8rem;
    border: none;
    background: none;
    outline: none;
    font-size: .7rem;
    text-align: center;
    vertical-align: top;
  }

  .role_fengyin img.ok {
    width: 30%;
  }

  .role_fengyin img.no {
    width: 30%;
  }

.role_jiefeng {
    width: 80%;
    margin-left: 10%;
    height: 300px;
    background: url("../assets/images/role_jiefeng.png") no-repeat;
    background-size: 100%;
    position: absolute;
    top: 20%;
    z-index: 1000;
  }


  .role_jiefeng .box {
    text-align: center;
    margin-top: 3.6rem;
  }

  .role_jiefeng img.ok {
    width: 30%;
  }

  .role_jiefeng img.no {
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
    z-index: 1000;
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
    margin-left: 8%;
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