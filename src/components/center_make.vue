<template>
 <div class="center-make">
 	<div class="m-topimg"><img src="../assets/images/bg-makelist-top.png" /></div>
 	<div class="m-listbox">
		 <scroller :on-infinite="infinite" ref="myscroller">
			 <div v-if="noData" class="m-list" v-for="item in makeData">
				<div class="m-titlebox">
					<div class="m-left"><img src="../assets/images/bg-make-tit01.png" /></div>
					<div class="m-txt">打造{{item.itemname}}</div>
					<div class="m-right"><img src="../assets/images/bg-make-tit03.png" /></div>
				</div>
				<div class="m-text">{{item.memo}}</div>
				<div class="m-date">时间：{{item.crtime}}</div>
			</div>
		 </scroller>
 		
		 <div v-if="!noData" class="m-list">
 			<div class="m-text">暂无数据</div>
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
		makeData:[],
		noData:true,
		lastLid:'',
      }
    },
    methods: {
      open() {
        this.tcShow = !this.tcShow
	  },
	  //获取占卜记录
	  makeInit(lid) {
		if(!!lid){
			var _this = this;
			var params = {
				address : sessionStorage.getItem("address"),
				lid : lid||"999999999"
			}
			_this.$axios({
			method: 'get',
			url: _this.http184 + '/wb/powerloglist',
			params: params
			}).then((res) => {
				if(!!lid){
					_this.makeData = _this.makeData.concat(res.data.data);
				}else{
					_this.makeData = res.data.data;
				}
				if(_this.makeData == ''){
					_this.noData =false;
				}else{
					for( var a = 0; a<_this.makeData.length; a++){
						_this.makeData[a].crtime = _this.makeData[a].crtime.slice(5,16)
					}
				}
				if(res.data.data.length>0){
					_this.lastLid = res.data.data[res.data.data.length-1].lid;
				}else{
					_this.lastLid = ""
				}
				
			}, (error) => {
			console.log(error);
			});
		}
        
	  },
	infinite(done) {
      this.makeInit(this.lastLid);
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
	  self.makeInit('999999999');
    }

}
</script>

<style>
	.center-make {
		width: 10.1rem;
		margin: .6rem auto 2.4rem;
	}
	.center-make .m-topimg{
		width: 100%;display: inline-block;height: .75rem;
	}
	.center-make .m-bottomimg{
		width: 100%;display: inline-block;height: .78rem;margin-top: -.16rem;
    vertical-align: top;
	}
	.center-make .m-topimg img, .center-make .m-bottomimg img{
		width: 100%;
		height: 100%;
		vertical-align: top;
	}
	.center-make .m-listbox{
		width: 100%;display: inline-block;background: url('../assets/images/bg-makelist.png') repeat-y;background-size: 100%;vertical-align: top;height: 14rem;margin-top: -.6rem;position: relative;overflow: hidden;
	}
	.center-make .m-listbox .m-list{
		width: 9.4rem;
		height: 3.03rem;
		margin: 0 auto;
		text-align: center;
		background: url('../assets/images/bg-make-list.jpg');
		background-size: 100%;
	}
	.center-devine .m-listbox .m-list:first-child{
		margin-top: 3rem;
	}
	.center-make .m-listbox .m-list:last-child{
		width: 9.4rem;
		height: 2.53rem;
		margin: 0 auto;
		text-align: center;
		background: url('../assets/images/bg-make-lastlist.jpg');
		background-size: 100%;
	}
	.center-make .m-listbox .m-list .m-titlebox{
		width: auto; height: .91rem;display: inline-block;float: left;margin: .08rem 0 0 .3rem;
	}
	.center-make .m-listbox .m-list .m-titlebox .m-left{
		width: 1.38rem; height: .91rem; display: inline-block;float: left;
	}
	.center-make .m-listbox .m-list .m-titlebox .m-right{
		width: .87rem; height: .91rem; display: inline-block;float: left;margin-left: -.1rem;
	}
	.center-make .m-listbox .m-list .m-titlebox .m-left img, .center-make .m-listbox .m-list .m-titlebox .m-right img{
		width: 100%;
		height: 100%;
		vertical-align: top;
	}
	.center-make .m-listbox .m-list .m-titlebox .m-txt{
		width: auto; height: .91rem;display: inline-block;float: left;background: url('../assets/images/bg-make-tit02.png') repeat-x;background-size: auto 100%; padding: 0 .1rem;margin-left: -.1rem; font-size: .4rem; color: #472c0e;line-height: .91rem;
	}
	.center-make .m-listbox .m-list .m-text{
		width: 100%;display: inline-block;margin-top: .1rem;padding: 0 .4rem;text-align: left;height: .4rem; font-size: .38rem; color: #472c0e;vertical-align: top;box-sizing: border-box;
	}
	.center-make .m-listbox .m-list .m-date{
		width: auto; display: inline-block;float: right;margin: -.61rem .7rem 0 0; font-size: .38rem; color: #472c0e;vertical-align: top;
	}

</style>
