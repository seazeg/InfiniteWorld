<template>
 <div class="center">
 	<div class="m-vipmes">
 		<div class="img-hd"><img src="../assets/images/img-hd.png" /></div>
 		<div class="m-name">易老斯</div>
 		<a class="z-buildbtn" @click=""><img src="../assets/images/img-build.png" /></a>
 	</div>
 	<div class="m-btnbox">
 		<div class="m-list"><span>签到</span></div>
 		<div class="m-list"><span>占卜记录</span></div>
 		<div class="m-list"><span>打造记录</span></div>
 		<div class="m-list"><span>钱包</span></div>
 		<div class="m-list"><span>卡牌图鉴</span></div>
 		<div class="m-list"><span>排行榜</span></div>
 		<div class="m-list"><span>邀请好友</span></div>
 	</div>
 </div>
</template>

<script>
export default {

}
</script>

<style>
	.center {
		width: 100%;
		height: 24.56rem;
		margin-bottom: 2.4rem;
		display: inline-block;
		background: url("../assets/images/img-vipbg01.png") no-repeat;
		background-size: 100% 100%;
	}
	.center .m-vipmes{
		width: 9rem;
		height: 2.5rem;
		margin: 1.2rem auto 0;
	}
	.center .m-vipmes .img-hd{
		width: 1.96rem;
		height: 1.96rem;
		display: inline-block;
		float: left;
		border-radius: 50%;
		overflow:hidden; 
		margin: .2rem 0 0 .56rem;
	}
	.center .m-vipmes .img-hd img{
		width: 100%;
		height: 100%;
		vertical-align: top;
	}
	.center .m-vipmes .m-name{
		width: auto;
		max-width: 3rem;
		float: left;
		display: inline-block;
		font-size: .5rem;
		color: #472c0e;
		margin:.9rem 0 0 .2rem;
	}
	.center .m-vipmes .z-buildbtn{
		width: 3.8rem;
		height: 1.5rem;
		display: inline-block;
		float: right;
		margin: .5rem .4rem 0 0;
	}
	.center .m-vipmes .z-buildbtn img{
		width: 100%;
		height: 100%;
		vertical-align: top;
	}
	.center .m-btnbox{
		width: 8.9rem;
		height: 2.8rem;
		margin: .4rem auto 0;
	}
	.center .m-btnbox .m-list{
		width: 8.9rem;
		height: 2.82rem;
		text-align: center;
	}
	.center .m-btnbox .m-list span{
		width: auto;
		margin: 1rem auto 0;
		font-size: .4rem;
		color: #eebc7f;
		display: inline-block;
	}
	.center .m-btnbox .m-list:last-child span{
		margin: 1.2rem auto 0;
	}
</style>
