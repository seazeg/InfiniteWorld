<template>
 <div class="center-card">
	<div class="m-list">
		<div class="m-imgbox">
			<img />
			<div v-if="tcShow" class="m-tc">
				<div class="m-txt01">当前产出：26843</div>
				<div class="m-txt02">领悟需求：26843</div>
				<div class="m-txt03">上次产出时间：<br />2018/5/3 14:11</div>
			</div>
		</div>
	</div>
	<div class="m-list">
		<div class="m-imgbox">
			<img />
			<div v-if="tcShow" class="m-tc">
				<div class="m-txt01">当前产出：26843</div>
				<div class="m-txt02">领悟需求：26843</div>
				<div class="m-txt03">上次产出时间：<br />2018/5/3 14:11</div>
			</div>
		</div>
	</div>
	<div class="m-list">
		<div class="m-imgbox">
			<img />
			<div v-if="tcShow" class="m-tc">
				<div class="m-txt01">当前产出：26843</div>
				<div class="m-txt02">领悟需求：26843</div>
				<div class="m-txt03">上次产出时间：<br />2018/5/3 14:11</div>
			</div>
		</div>
	</div>
	<div class="m-list">
		<div class="m-imgbox">
			<img src="../assets/images/card01.png" />
			<div v-if="tcShow" class="m-tc">
				<div class="m-txt01">当前产出：26843</div>
				<div class="m-txt02">领悟需求：26843</div>
				<div class="m-txt03">上次产出时间：<br />2018/5/3 14:11</div>
			</div>
		</div>
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
	.center-card .m-list .m-imgbox .m-tc .m-txt01{
		width: 100%; display: inline-block; height: .75rem;background: rgba(71,44,14,.66); text-align: center;color: #fff;font-size: .36rem;line-height: .75rem;vertical-align: top; margin-top: .3rem;
	}
	.center-card .m-list .m-imgbox .m-tc .m-txt02{
		width: 100%; display: inline-block; height: .75rem;background: rgba(71,44,14,.66); text-align: center;color: #fff;font-size: .36rem;line-height: .75rem;vertical-align: top; margin-top: .3rem;
	}
	.center-card .m-list .m-imgbox .m-tc .m-txt03{
		width: 100%; display: inline-block; padding:.3rem 0;background: rgba(71,44,14,.66); text-align: center;color: #fff;font-size: .36rem;line-height: .5rem;vertical-align: top; margin-top: .3rem;
	}

</style>
