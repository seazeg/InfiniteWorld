<template>
	<div>
	<div class="m-img"><img src="../assets/images/img-chart-top.png" /></div>
		 <div class="center-chart">
		 	<div class="m-topimg"><img src="../assets/images/bg-makelist-top.png" /></div>
		 	<div class="m-listbox">
		 		<div class="m-chartcontbox">
		 			<div class="m-li">
		 				<div class="m-name">名称</div>
		 				<div class="m-zb">占卜次数：<span>123</span></div>
		 				<div class="m-lw">领悟：<span>123</span></div>
		 			</div>
		 			<div class="m-li">
		 				<div class="m-name">名称</div>
		 				<div class="m-zb">占卜次数：<span>123</span></div>
		 				<div class="m-lw">领悟：<span>123</span></div>
		 			</div>
		 			<div class="m-li">
		 				<div class="m-name">名称</div>
		 				<div class="m-zb">占卜次数：<span>123</span></div>
		 				<div class="m-lw">领悟：<span>123</span></div>
		 			</div>
		 			<div class="m-li">
		 				<div class="m-name">名称</div>
		 				<div class="m-zb">占卜次数：<span>123</span></div>
		 				<div class="m-lw">领悟：<span>123</span></div>
		 			</div>
		 			<div class="m-li">
		 				<div class="m-name">名称</div>
		 				<div class="m-zb">占卜次数：<span>123</span></div>
		 				<div class="m-lw">领悟：<span>123</span></div>
		 			</div>
		 			<div class="m-li">
		 				<div class="m-name">名称</div>
		 				<div class="m-zb">占卜次数：<span>123</span></div>
		 				<div class="m-lw">领悟：<span>123</span></div>
		 			</div>
		 		</div>
		 		<div class="m-list">
		 			<i class="ico-chart"><img src="../assets/images/img-ph01.png" /></i>
		 		</div>
		 		<div class="m-list">
		 			<i class="ico-chart"><img src="../assets/images/img-ph02.png" /></i>
		 		</div>
		 		<div class="m-list">
		 			<i class="ico-chart"><img src="../assets/images/img-ph03.png" /></i>
		 		</div>
		 		<div class="m-list">
		 			<i class="ico-chart"><img src="../assets/images/img-ph04.png" /></i>
		 		</div>
		 		<div class="m-list">
		 			<i class="ico-chart"><img src="../assets/images/img-ph05.png" /></i>
		 		</div>
		 		<div class="m-list">
		 			<i class="ico-chart"><img src="../assets/images/img-ph06.png" /></i>
		 		</div>
		 	</div>
		 	<div class="m-bottomimg"><img src="../assets/images/bg-chartlist-bot.png" /></div>
		 </div>
	</div>
 
</template>

<script>
export default {
	    data() {
      return {
        tcShow: false,
      }
    },
    methods: {
      open() {
        this.tcShow = !this.tcShow
	  },
	  //获取排行榜
	  chartInit() {
        var _this = this;
        var params = {
        }
        _this.$axios({
          method: 'get',
          url: _this.http184 + '/wb/ylrandlist',
          params: params
        }).then((res) => {
          console.log("排行榜", res.data);
        }, (error) => {
          console.log(error);
        });
      },
    },
    mounted() {
	  //获取排行榜
	  let self = this;
	  self.chartInit();
	  setInterval( function(){
		self.chartInit();
	  },5000)
    }

}
</script>

<style>

	.m-img{
		width: 100%; height: 2.35rem; display: inline-block;
	}
	.m-img img{
		width: 100%;
		height: 100%;
		vertical-align: top;
	}
	.center-chart {
		width: 10.1rem;
		margin: 0 auto 2.4rem;
	}
	.center-chart .m-topimg{
		width: 100%;display: inline-block;height: .75rem;
	}
	.center-chart .m-bottomimg{
		width: 100%;display: inline-block;height: .67rem;
    vertical-align: top;
	}
	.center-chart .m-topimg img, .center-chart .m-bottomimg img{
		width: 100%;
		height: 100%;
		vertical-align: top;
	}
	.center-chart .m-listbox{
		width: 100%;display: inline-block;background: url('../assets/images/bg-makelist.png') repeat-y;background-size: 100%;vertical-align: top;    margin-top: -.6rem;position: relative;
	}
	.center-chart .m-listbox .m-list{
		width: 9.35rem;
		height: 2rem;
		margin: 0 auto;
		text-align: center;
		background: url('../assets/images/img-chart-list.png');
		background-size: 100%;

	}
	.center-chart .m-listbox .m-list:last-child{
		width: 9.35rem;
		height: 1.7rem;
		margin: 0 auto;
		text-align: center;
		background: url('../assets/images/img-chart-lastlist.png');
		background-size: 100%;
	}
	.center-chart .m-listbox .m-list .ico-chart{
		width: 1.1rem; height: 1.1rem;display: inline-block;float: left; margin: .3rem 0 0 .5rem;
	}
	.center-chart .m-listbox .m-list .ico-chart img{
		width: 100%;
		height: 100%;
		vertical-align: top;
	}

	.center-chart .m-listbox .m-chartcontbox{
		width: auto;display: inline-block;left: 2rem; top:0;position: absolute;
	}
	.center-chart .m-listbox .m-chartcontbox .m-li{
		width: auto;
		height: 2rem;
	}
	.center-chart .m-listbox .m-chartcontbox .m-li:last-child{
		width: auto;
		height: 1.7rem;
	}
	.center-chart .m-listbox .m-chartcontbox .m-li .m-name{
		width: auto;max-width: 2rem; display: inline-block;float: left;margin: .56rem .2rem 0 0;font-size: .4rem;color: #472c0e;font-weight: bold;
	}
	.center-chart .m-listbox .m-chartcontbox .m-li .m-zb{
		width: 2.8rem; display: inline-block;float: left;margin: .56rem .2rem 0 0;font-size: .32rem;color: #eda41a; text-shadow: 1px 1px .15rem #3f291b;font-weight: bold;
	}
	.center-chart .m-listbox .m-chartcontbox .m-li .m-zb span{
		color: #fff;
	}
	.center-chart .m-listbox .m-chartcontbox .m-li .m-lw{
		width: 2.8rem;  display: inline-block;float: left;margin-top: .56rem;font-size: .32rem;color: #eda41a; text-shadow: 1px 1px .15rem #3f291b;font-weight: bold;
	}
	.center-chart .m-listbox .m-chartcontbox .m-li .m-lw span{
		color: #fff;
	}



</style>
