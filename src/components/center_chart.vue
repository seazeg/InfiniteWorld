<template>
 <div class="center-make">
 	<div class="m-topimg"><img src="../assets/images/bg-makelist-top.png" /></div>
 	<div class="m-listbox">
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

 		<div class="m-contbox">
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
 		
 	</div>
 	<div class="m-bottomimg"><img src="../assets/images/bg-chartlist-bot.png" /></div>
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
		width: 100%;display: inline-block;height: .67rem;
    vertical-align: top;
	}
	.center-make .m-topimg img, .center-make .m-bottomimg img{
		width: 100%;
		height: 100%;
		vertical-align: top;
	}
	.center-make .m-listbox{
		width: 100%;display: inline-block;background: url('../assets/images/bg-makelist.png') repeat-y;background-size: 100%;vertical-align: top;    margin-top: -.6rem;position: relative;
	}
	.center-make .m-listbox .m-list{
		width: 9.35rem;
		height: 2rem;
		margin: 0 auto;
		text-align: center;
		background: url('../assets/images/img-chart-list.png');
		background-size: 100%;

	}
	.center-make .m-listbox .m-list:last-child{
		width: 9.35rem;
		height: 1.7rem;
		margin: 0 auto;
		text-align: center;
		background: url('../assets/images/img-chart-lastlist.png');
		background-size: 100%;
	}
	.center-make .m-listbox .m-list .ico-chart{
		width: 1.1rem; height: 1.1rem;display: inline-block;float: left; margin: .3rem 0 0 .5rem;
	}
	.center-make .m-listbox .m-list .ico-chart img{
		width: 100%;
		height: 100%;
		vertical-align: top;
	}

	.center-make .m-listbox .m-contbox{
		width: auto;display: inline-block;left: 2rem; top:0;position: absolute;
	}
	.center-make .m-listbox .m-contbox .m-li{
		width: auto;
		height: 2rem;
	}
	.center-make .m-listbox .m-contbox .m-li:last-child{
		width: auto;
		height: 1.7rem;
	}
	.center-make .m-listbox .m-contbox .m-li .m-name{
		width: auto;max-width: 2rem; display: inline-block;float: left;margin: .56rem .2rem 0 0;font-size: .4rem;color: #472c0e;font-weight: bold;
	}
	.center-make .m-listbox .m-contbox .m-li .m-zb{
		width: 3.5rem; display: inline-block;float: left;margin: .56rem .2rem 0 0;font-size: .32rem;color: #eda41a; text-shadow: 1px 1px .15rem #3f291b;font-weight: bold;
	}
	.center-make .m-listbox .m-contbox .m-li .m-zb span{
		color: #fff;
	}
	.center-make .m-listbox .m-contbox .m-li .m-lw{
		width: 3.4rem;  display: inline-block;float: left;margin-top: .56rem;font-size: .32rem;color: #eda41a; text-shadow: 1px 1px .15rem #3f291b;font-weight: bold;
	}
	.center-make .m-listbox .m-contbox .m-li .m-lw span{
		color: #fff;
	}



</style>
