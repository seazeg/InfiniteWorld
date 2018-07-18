<template>
 <div class="center-card">
	<div class="m-list" v-for="item in cardData" @click="open(item)">
		<div class="m-imgbox">
			<!-- <img src="../assets/images/card01.png" /> -->
			<img :src="'../../static/images/'+ item.img + '.png'" alt="">
		</div>
	</div>
	<div v-show="tcShow" class="m-tcbg"></div>
    <div v-if="tcShow" class="m-tc">
		<div class="m-xqcard"><img :src="'../../static/images/'+ showImg + '.png'" alt=""></div>
		<div v-if="!cardxq" class="m-cardxqbtn" @click="openCard()"><img src="../assets/images/ico-xqbtn.png" /></div>
		<div v-if="cardxq" class="m-xqtxtbox" @click="openCard()">
			<div class="m-txt01">当前产出：<span>{{procount}}</span></div>
			<div class="m-txt02">领悟需求：<span>26843</span></div>
			<div class="m-txt03">上次产出时间：<span>{{lastprotime}}</span></div>
		</div>
	</div>

 </div>
</template>

<script>
import data from '../json/carddata'
export default {
	    data() {
      return {
		carddata: data,
        tcShow: false,
		cardxq: false,
		cardData:[],
		showImg:'',
		lastprotime:'',
		procount:'',
      }
    },
    methods: {
      open(ele) {
		console.log(ele);
		let self = this;
		self.showImg= ele.img;
		if(ele.lastprotime == null){
			self.lastprotime = '00-00-00 00:00:00'
		}else{
			self.lastprotime = ele.lastprotime
		}
		self.procount = ele.procount
        self.tcShow = !self.tcShow
      },
	  openCard() {
        this.cardxq = !this.cardxq
	  },
	  	  //获取占卜记录
	  cardInit() {
        var _this = this;
        var params = {
			address : sessionStorage.getItem("address"),
        }
        _this.$axios({
          method: 'get',
          url: _this.http184 + '/wb/itemlist',
          params: params
        }).then((res) => {
          console.log("卡牌图鉴", res.data);
			_this.cardData = res.data.data;
			for (var a = 0; a < _this.carddata.length; a++) {
            for (var b = 0; b < _this.cardData.length; b++) {
              if (_this.cardData[b].itemid == _this.carddata[a].id) {
                _this.cardData[b].img = _this.carddata[a].img
              }
            }
          }
			for( var a = 0; a<_this.cardData.length; a++){
				//_this.cardData[a].boxtime = _this.cardData[a].boxtime.slice(5,16)
			}
        }, (error) => {
          console.log(error);
        });
      },
	},
	mounted() {
	  //获取卡牌图鉴
	  let self = this;
	  self.cardInit();
    }

}
</script>

<style>
	.center-card {
		width: auto;
    	margin: .6rem .16rem 2.4rem;
    	display: inline-block;
	}
	.center-card .m-list{
		width: 4.96rem;
		height: 6.47rem;
		float: left;
		margin: 0 .13rem .6rem;
		text-align: center;
		background: url('../assets/images/bg-card.png');
		background-size: 100%;
	}
	.center-card .m-list .m-imgbox{
		width: 3.6rem;height: 5.3rem;display: inline-block;margin:.66rem auto 0;	position: relative;
	}
	.center-card .m-list .m-imgbox img{
		width: 100%;
    	height: 100%;
    	vertical-align: top;
	}
	.center-card .m-list .m-imgbox .m-tc{
		width: 4rem;height: 5rem;display: inline-block;left: 0; top:0;position: absolute;z-index: 100;
	}
	.center-card .m-tc {
    width: 9.35rem;
    height: 12.23rem;
    display: inline-block;
    position: fixed;
    left: 50%;
    top: 50%;
    margin: -6.12rem 0 0 -4.67rem;
    background: url("../assets/images/bg-cardxq.png") no-repeat;
    background-size: 100% 100%;
    z-index: 2000;
    text-align: center;
  }
  .center-card .m-tc .m-xqcard{
	  width: 6.3rem;height: 9.3rem;display: inline-block;margin: 1rem auto 0;
  }
  .center-card .m-tc .m-xqcard img{
		width: 100%;
    	height: 100%;
    	vertical-align: top;
	}
  .center-card .m-tc .m-cardxqbtn{
	  width: 3.1rem; height: 1.15rem;display: inline-block;margin: 0 auto;
  }
  .center-card .m-tc .m-cardxqbtn img{
		width: 100%;
    	height: 100%;
    	vertical-align: top;
	}
	.center-card .m-tc .m-xqtxtbox{
	  width: 6.3rem;height: 9.3rem;display: inline-block;position: absolute;left:1.52rem;top:1rem;background:rgba(0,0,0, .8);z-index: 1000;
  }
	.center-card .m-tc .m-xqtxtbox .m-txt01{
		width: 80%; display: inline-block;  padding:.3rem 0;text-align: left;color: #fff;font-size: .48rem;line-height: .7rem;vertical-align: top; margin-top: .3rem;
	}
	.center-card .m-tc .m-xqtxtbox .m-txt02{
		width: 80%; display: inline-block;  padding:.3rem 0; text-align: left;color: #fff;font-size: .48rem;line-height: .7rem;vertical-align: top; margin-top: .3rem;
	}
	.center-card .m-tc .m-xqtxtbox .m-txt03{
		width: 80%; display: inline-block; padding:.3rem 0; text-align: left;color: #fff;font-size: .48rem;line-height: .7rem;vertical-align: top; margin-top: .3rem;
	}
	.center-card .m-tc .m-xqtxtbox .m-txt01 span, .center-card .m-tc .m-xqtxtbox .m-txt02 span, .center-card .m-tc .m-xqtxtbox .m-txt03 span{
		width: 100%;display: inline-block; padding-left: .4rem; box-sizing: border-box;
	}

</style>
