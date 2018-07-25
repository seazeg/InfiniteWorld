<template>
    <div class="m-dazao">
      <div v-if="!role" class="m-clickbtn" @click="cardList=true"></div>
      <div v-if="role" class="m-clickbtn"></div>
    	<div v-show="tcShow" class="m-tcbg"></div>
	    <div v-show="tcShow" class="m-dzcontbox">
        <div class="m-txt">打造将消耗</div>
	      <div class="m-txt01">ENS*{{dzens}}</div>
	      <div class="m-txt02">方解石*{{dzfjs}}</div>
	      <div class="m-dztcbtnbox">
	        <a href="javascript:;" class="m-btn" @click="dzEquip()">
	          <img src="../assets/images/ico-dazaobtn01.png" />
	        </a>
	        <a href="javascript:;" class="m-btn" @click="close()">
	          <img src="../assets/images/ico-dazaobtn02.png" />
	        </a>
	      </div>
	    </div>
	    <div class="m-dzcardtcbox" v-show="cardList">
	    	<div class="m-listbox">
	    		<div v-if="!(item.itemid =='1038' || item.itemid =='1039' ||item.itemid =='1040') || item.issale == '1'" class="m-list" v-for="(item, index) in bag">
            <div class="m-imgbox" @click="getResource(item)">
              <div v-if="item.itemtype != '4'" class="itemyl">{{item.itemyl}}</div>
              <div v-if="item.itemtype == '4'" class="itemys">{{item.itemylcrit}}%</div>
              <div v-if="item.itemtype == '4'" class="itemcd">{{item.itemcdcrit}}%</div>
              <img class="levelimg" :src="'../../static/images/'+ item.levelimg + '.png'" alt="">
              <img :src="'../../static/images/'+ item.img + '.png'"/>
            </div>
				</div>
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
      	tcShow: false,
        sign: false,
        signData:'',
        cardList: false,
        bag: [],
        dzfjs:'',
        dzens:'',
        role: false,
        dzPackid:'',
        
      }
    },
    methods: {
      close() {
        this.tcShow = !this.tcShow
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
          // for (var c = 0; c < _this.bag.length; c++) {
          //  _this.$set(_this.bag[c],'rolezb',false);
          // }
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
            _this.role = true;
            _this.signData = '请先创建角色';
            _this.sign = true;
          }else{
            _this.roleInfo = res.data.data;
          }
        }, (error) => {
          console.log(error);
        });
      },
      //获取打造需要的ens跟方解石
      getResource(ele) {
        var _this = this;
        _this.dzPackid = ele.packid;
        var params = {
          itemtype: "",
          address: sessionStorage.getItem("address"),
          packid: ele.packid,
        }
        _this.$axios({
          method: 'get',
          url: _this.http184 + '/wb/itempowercost',
          params: params
        }).then((res) => {
         _this.dzens = res.data.data[0].costens;
         _this.dzfjs = res.data.data[0].costitem;
         _this.cardList = false;
         _this.tcShow = true;

        }, (error) => {
          console.log(error);
        });
      },
      //打造装备
      dzEquip() {
        let self =this;
        var url = this.http184 + "/app/EnsContract";
        var type = 6666;
        var args = [sessionStorage.getItem("address"),"1104\u0004"+self.dzPackid];
        var result = this.$utils.contract(type, args, url,function(data){
          self.tcShow=false;
          if(data.result == false){
            if(data.msg == '合约失败,Error: Invalid timestamp'){
              self.signData = '请更新手机时间';
            }else if(data.msg == 'Error: Apply transaction error: Error: L10022' || data.msg == 'Error: Apply transaction error: Error: L10009'){
              self.signData = '余额不足';
            }else{
              self.signData = data.msg;
            }
            self.sign = true;
            setTimeout( function(){
              self.sign = false;
            },2000)
          }else if(data.result == true){
            self.signData = data.data;
            self.sign = true;
            setTimeout( function(){
              self.sign = false;
            },2000)
          }
          console.log("返回结果",data);
        });
      },
    },
    mounted() {
      this.roleInit();
      this.bagInit();
    }

  }

</script>

<style>
.m-dazao{
	width: 10.8rem;height:100%; display: inline-block;background: url("../assets/images/bg-dazao.jpg") no-repeat;
    background-size: 100% 100%;
}
.m-dazao .m-clickbtn{width: 100%; height: 100%;display: inline-block;}
  .m-dzcontbox {
    width: 8.7rem;
    height: 9.65rem;
    display: inline-block;
    position: fixed;
    left: 50%;
    top: 50%;
    margin: -4.82rem 0 0 -4.35rem;
    background: url("../assets/images/bg-dazaotc.png") no-repeat;
    background-size: 100% 100%;
    z-index: 2000;
    text-align: center;
  }
  .m-dzcontbox .m-txt {
    width: 100%;
    display: inline-block;
    background: #fff;
    margin: 2rem 0 0;
    border: none;
    background: none;
    outline: none;
    font-size: .7rem;
    text-align: center;
  }
  .m-dzcontbox .m-txt01 {
    width: 100%;
    display: inline-block;
    background: #fff;
    margin: .2rem 0 0;
    border: none;
    background: none;
    outline: none;
    font-size: .7rem;
    text-align: center;
  }
    .m-dzcontbox .m-txt02 {
    width: 100%;
    display: inline-block;
    background: #fff;
    margin: .2rem 0 0;
    border: none;
    background: none;
    outline: none;
    font-size: .7rem;
    text-align: center;
    vertical-align: top;
  }


  .m-dztcbtnbox {
    width: auto;
    display: inline-block;
    margin: 1.4rem auto 0;
  }

  .m-dztcbtnbox .m-btn {
    width: 3.23rem;
    height: 1.09rem;
    display: inline-block;
    margin: 0 .2rem 0;
  }

  .m-dztcbtnbox .m-btn img {
    width: 100%;
    height: 100%;
    vertical-align: top;
  }
.m-dztypebox{
  	display: inline-block;
    width: 80%;
    padding:.4rem .4rem;
    box-sizing: border-box;
    line-height: .46rem;
    font-size: .34rem;
    position: fixed;
    z-index: 1000;
    background: rgba(0,0,0,.8);
    left: 10%;
    bottom: 2rem;
    color: #eebc7f;
    border-radius: .2rem;
  }

  .m-dzcardtcbox {
    width: 8.7rem;
    height: 11.24rem;
    display: inline-block;
    position: fixed;
    left: 50%;
    top: 50%;
    margin: -5.62rem 0 0 -4.35rem;
    background: url("../assets/images/bg-dazaocardtc.png") no-repeat;
    background-size: 100% 100%;
    z-index: 2000;
    text-align: center;
  }
  .m-dzcardtcbox .m-listbox{
  	width: 7.3rem;height: 9.6rem; display: inline-block;margin: .8rem auto 0;overflow-x: hidden;overflow-y: auto;
  }
  	.m-dzcardtcbox .m-listbox .m-list{
		width: 3.35rem;
		height: 4.37rem;
		float: left;
		margin: 0 .13rem .4rem;
		text-align: center;
		background: url('../assets/images/bg-dazaocardlist.png');
		background-size: 100%;
	}
	.m-dzcardtcbox .m-listbox .m-list .m-imgbox{
		width: 2.8rem;height: 4.12rem;display: inline-block;margin:.2rem auto 0;	position: relative;
	}
	.m-dzcardtcbox .m-listbox .m-list .m-imgbox img{
		width: 100%;
    	height: 100%;
    	vertical-align: top;
	}
	.m-dzcardtcbox .m-listbox .m-list .m-imgbox .levelimg {
    width: 100%;
    height: 100%;
    position: absolute;
    left:0;
    top:0;
    z-index: 100;
    vertical-align: top;
  }
	.m-dzcardtcbox .m-listbox .m-list .m-imgbox .itemyl{
    width: auto;
    color: #fff;
    font-size: 0.1rem;
    position: absolute;
    left: 1.5rem;
    top: .55rem;
  }
	.m-dzcardtcbox .m-listbox .m-list .m-imgbox .itemys{
    width: 1rem;
    color: #fff;
    font-size: 0.1rem;
    position: absolute;
    left: 1rem;
    top: .55rem;
  }
	.m-dzcardtcbox .m-listbox .m-list .m-imgbox .itemcd{
    width: 1rem;
    color: #fff;
    font-size: 0.1rem;
    position: absolute;
    left: 2.2rem;
    top: .55rem;
  }

</style>
