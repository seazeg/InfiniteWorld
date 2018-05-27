<template>
 <div class="center-make">
 	<div class="m-topimg"><img src="../assets/images/bg-makelist-top.png" /></div>
 	<div class="m-listbox">
 		<div class="m-list">
 			<div class="m-titlebox">
 				<div class="m-txt">余额：5652</div>
 				<a class="m-link">充入钱包</a>
 				<a class="m-link">提到钱包</a>
 			</div>
 			<div class="m-text">ENS</div>
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
		width: 100%;display: inline-block;height: .78rem;margin-top: -.16rem;
    vertical-align: top;
	}
	.center-make .m-topimg img, .center-make .m-bottomimg img{
		width: 100%;
		height: 100%;
		vertical-align: top;
	}
	.center-make .m-listbox{
		width: 100%;display: inline-block;background: url('../assets/images/bg-makelist.png') repeat-y;background-size: 100%;vertical-align: top;    margin-top: -.6rem;
	}
	.center-make .m-listbox .m-list{
		width: 9.38rem;
		height: 1.98rem;
		margin: 0 auto;
		text-align: center;
		background: url('../assets/images/bg-wall-list.png');
		background-size: 100%;
	}
	.center-make .m-listbox .m-list:last-child{
		width: 9.38rem;
		height: 1.66rem;
		margin: 0 auto;
		text-align: center;
		background: url('../assets/images/bg-wall-lastlist.png');
		background-size: 100%;
	}
	.center-make .m-listbox .m-list .m-titlebox{
		width: auto; height: .91rem;display: inline-block;float: left;margin: .08rem 0 0 .5rem;
	}

	.center-make .m-listbox .m-list .m-titlebox .m-txt{
		width: 4.5rem; height: .91rem;display: inline-block;float: left;padding: 0 .1rem; font-size: .4rem; color: #472c0e;line-height: .91rem;text-align:left;
	}
	.center-make .m-listbox .m-list .m-titlebox .m-link{
		width: auto; height: .91rem;display: inline-block;float: left;padding: 0 .2rem;margin-left: -.1rem; font-size: .4rem; color: #472c0e;line-height: .91rem;text-decoration: underline;
	}
	.center-make .m-listbox .m-list .m-text{
		width: 100%;display: inline-block;margin-top: .05rem;padding: 0 .6rem;text-align: left;height: .4rem; font-size: .42rem; color: #472c0e;vertical-align: top;box-sizing: border-box; font-weight: bold;
	}

</style>
