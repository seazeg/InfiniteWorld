<template>
 <div class="center-devine">
 	<div class="m-topimg"><img src="../assets/images/bg-makelist-top.png" /></div>
 	<div v-if="noData" class="m-listbox">
		 <scroller :on-infinite="infinite" ref="myscroller">
			<div class="m-list" v-for="(item,index) in divineData"  :class="{'first':index==0}">
				<div class="m-titlebox">
					<div class="m-left"><img src="../assets/images/bg-make-tit01.png" /></div>
					<div class="m-txt">方解石占卜</div>
					<div class="m-right"><img src="../assets/images/bg-make-tit03.png" /></div>
				</div>
				<div class="m-textbox01">
					<div class="m-left">ENS:{{item.coin}}</div>
					<div class="m-right">{{item.str5}}</div>
				</div>
				<div class="m-textbox02">
					<div class="m-left">装备：{{item.itemname}}</div>
					<div class="m-right">时间：{{item.boxtime}}</div>
				</div>
			</div>
		 </scroller>
		
 	</div>
	 <div v-if="!noData" class="m-listbox nodata">
		  <div class="m-list ">
 			<div class="m-titlebox">
 				<div class="m-left"><img src="../assets/images/bg-make-tit01.png" /></div>
 				<div class="m-txt">暂无数据</div>
 				<div class="m-right"><img src="../assets/images/bg-make-tit03.png" /></div>
 			</div>
 		</div>
	 </div>
 	<div class="m-bottomimg"><img src="../assets/images/bg-makelist-bot.png" /></div>
 </div>
</template>

<script>
export default {
	    data() {
      return {
        tcShow: false,
		divineData:[],
		noData:true,
		lastBoxid:""
      }
    },
    methods: {
      open() {
        this.tcShow = !this.tcShow
	  },
	  //获取占卜记录
	  divineInit(boxid) {
		if(!!boxid){
			var _this = this;
			var params = {
				address : sessionStorage.getItem("address"),
				boxid : boxid||"999999999"
			}
			_this.$axios({
			method: 'get',
			url: _this.http184 + '/wb/boxlist',
			params: params,
				headers:{
						"Authorization": "basic " + sessionStorage.getItem('logintoken')
					}
			}).then((res) => {
				if(!!boxid){
					_this.divineData = _this.divineData.concat(res.data.data);
				}else{
					_this.divineData = res.data.data;
				}
				if(_this.divineData == ''){
					_this.noData =false;
				}
				
				// else{
				// 	for( var a = 0; a<_this.divineData.length; a++){
				// 		_this.divineData[a].boxtime = _this.divineData[a].boxtime.slice(5,16)
				// 	}
				// }
				if(res.data.data.length>0){
					_this.lastBoxid = res.data.data[res.data.data.length-1].boxid;
				}else{
					_this.lastBoxid = ""
				}
			}, (error) => {
			console.log(error);
			});
		}
        
	  },
	  infinite(done) {
      this.divineInit(this.lastBoxid);
      setTimeout(() => {
        done();
      }, 2000);
    },
    refresh() {
        console.log('refresh')
    },
    },
    mounted() {
	  //获取排行榜
	  let self = this;
	  self.divineInit("999999999");
	//   setInterval( function(){
	// 	self.divineInit();
	//   },5000)
    }
}
</script>

<style>
	.center-devine {
		width: 10.1rem;
		margin: .6rem auto 2.4rem;
	}
	.center-devine .m-topimg{
		width: 100%;display: inline-block;height: .75rem;
	}
	.center-devine .m-bottomimg{
		width: 100%;display: inline-block;height: .78rem;margin-top: -.16rem;
    vertical-align: top;
	}
	.center-devine .m-topimg img, .center-devine .m-bottomimg img{
		width: 100%;
		height: 100%;
		vertical-align: top;
	}
	.center-devine .m-listbox{
		width: 100%;display: inline-block;background: url('../assets/images/bg-makelist.png') repeat-y;background-size: 100%;vertical-align: top;height: 14rem;margin-top: -.6rem;position: relative;overflow: hidden;}
	.center-devine .m-listbox.nodata{height: 2.53rem;}
	.center-devine .m-listbox .m-list{
		width: 9.4rem;
		height: 3.03rem;
		margin: 0 auto;
		text-align: center;
		background: url('../assets/images/bg-divine-list.png');
		background-size: 100%;
	}
	.first{
		margin: 2.86rem auto 0!important;
	}
	.center-devine .m-listbox .m-list:last-child{
		width: 9.4rem;
		height: 2.53rem;
		margin: 0 auto;
		text-align: center;
		background: url('../assets/images/bg-divine-lastlist.png');
		background-size: 100%;
	}
	.center-devine .m-listbox .m-list .m-titlebox{
		width: auto; height: .91rem;display: inline-block;float: left;margin: .08rem 0 0 .3rem;
	}
	.center-devine .m-listbox .m-list .m-titlebox .m-left{
		width: 1.38rem; height: .91rem; display: inline-block;float: left;
	}
	.center-devine .m-listbox .m-list .m-titlebox .m-right{
		width: .87rem; height: .91rem; display: inline-block;float: left;margin-left: -.1rem;
	}
	.center-devine .m-listbox .m-list .m-titlebox .m-left img, .center-devine .m-listbox .m-list .m-titlebox .m-right img{
		width: 100%;
		height: 100%;
		vertical-align: top;
	}
	.center-devine .m-listbox .m-list .m-titlebox .m-txt{
		width: auto; height: .91rem;display: inline-block;float: left;background: url('../assets/images/bg-make-tit02.png') repeat-x;background-size: auto 100%; padding: 0 .1rem;margin-left: -.1rem; font-size: .4rem; color: #472c0e;line-height: .91rem;
	}
	.center-devine .m-listbox .m-list .m-textbox01{
		width: 100%;display: inline-block;margin-top: .1rem;padding: 0 .4rem; color: #472c0e;vertical-align: top;box-sizing: border-box;font-size: .38rem;
	}
	.center-devine .m-listbox .m-list .m-textbox01 .m-left{
		width: 2.8rem; margin-left:5%;display: inline-block;float: left;text-align: left;height: .4rem; 
	}
	.center-devine .m-listbox .m-list .m-textbox01 .m-right{
		width: 5rem;display: inline-block;float: right;text-align: left;height: .4rem;
	}
	.center-devine .m-listbox .m-list .m-textbox02{
		width: 100%; display: inline-block;margin-top: -.6rem;padding: 0 .4rem;font-size: .38rem; color: #472c0e;vertical-align: top;box-sizing: border-box;
	}
	.center-devine .m-listbox .m-list .m-textbox02 .m-left{
		width: 2.8rem; margin-left:5%;display: inline-block;float: left;text-align: left;height: .4rem; 
	}
	.center-devine .m-listbox .m-list .m-textbox02 .m-right{
		width: 5rem;display: inline-block;float: right;text-align: left;height: .4rem;
	}
.loading-layer{display: none!important;}
</style>
