<template>
	<div>
	<div class="m-img"><img src="../assets/images/img-chart-top.png" /></div>
		 <div class="center-chart">
		 	<div class="m-topimg"><img src="../assets/images/bg-makelist-top.png" /></div>
		 	<div class="m-listbox">
		 		<div class="m-chartcontbox">
		 			<div class="m-li" v-for="item in chartData">
						<i class="ico-chart"><img class="img" :src="'../../static/images/'+ item.img + '.png'" alt=""></i>
		 				<div class="m-name">{{item.nickname}}</div>
		 				<div class="m-zb">占卜次数：<span>{{item.boxcount}}</span></div>
		 				<div class="m-lw">领悟：<span>{{item.str1}}</span></div>
		 			</div>
		 		</div>
		 	</div>
		 	<div class="m-bottomimg"><img src="../assets/images/bg-chartlist-bot.png" /></div>
		 </div>
	</div>
 
</template>

<script>
import imgdata from '../json/phb'

export default {
	    data() {
      return {
		phbImg: imgdata,
        tcShow: false,
		chartData:'',
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
					params: params,
						headers:{
						"Authorization": "basic " + sessionStorage.getItem('logintoken')
					}
        }).then((res) => {
          console.log("排行榜", res.data);
		  _this.chartData = res.data.data;
		  for(var i=0;i<_this.chartData.length;i++){
			  _this.chartData[i].str1 = _this.chartData[i].str1*1/100;
		  }
		  console.log(123)
		  for (var a = 0; a < _this.phbImg.length; a++) {
            for (var b = 0; b < _this.chartData.length; b++) {
              if (b+1 == _this.phbImg[a].id) {
                _this.chartData[b].img = _this.phbImg[a].img
              }
            }
          }
        }, (error) => {
          console.log(error);
        });
      },
    },
    mounted() {
	  //获取排行榜
	  let self = this;
	  self.chartInit();
	//   setInterval( function(){
	// 	self.chartInit();
	//   },5000)
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
		width: 100%;display: inline-block;overflow: hidden; background: url('../assets/images/bg-makelist.png') repeat-y;background-size: 100%;vertical-align: top;    margin-top: -.6rem;position: relative;
	}

	.center-chart .m-listbox .m-chartcontbox{
		width: 100%;display: inline-block;vertical-align: top;text-align: center;
	}
	.center-chart .m-listbox .m-chartcontbox .m-li{
		width: 9.35rem;
		height: 2rem;
		display: inline-block;
		margin: 0 auto;
		text-align: center;
		background: url('../assets/images/img-chart-list.png');
		background-size: 100%;
		vertical-align: top;
	}
	.center-chart .m-listbox .m-chartcontbox .m-li:last-child{
		width: 9.35rem;
		height: 1.7rem;
		margin: 0 auto;
		text-align: center;
		background: url('../assets/images/img-chart-lastlist.png');
		background-size: 100%;
	}
	.center-chart .m-listbox .m-chartcontbox .m-li .ico-chart{
		width: 1.1rem; height: 1.1rem;display: inline-block;float: left; margin: .3rem 0 0 .5rem;
	}
	.center-chart .m-listbox .m-chartcontbox .m-li .ico-chart img{
		width: 100%;
		height: 100%;
		vertical-align: top;
	}
	.center-chart .m-listbox .m-chartcontbox .m-li .m-name{
		width: 2.8rem; display: inline-block;float: left;margin: .56rem .2rem 0 0;font-size: .4rem;color: #472c0e;font-weight: bold;
	}
	.center-chart .m-listbox .m-chartcontbox .m-li .m-zb{
		width: 4.4rem; display: inline-block;float: left;margin: .3rem .2rem 0 0;font-size: .32rem;color: #eda41a; text-shadow: 1px 1px .15rem #3f291b;font-weight: bold;text-align: left;
	}
	.center-chart .m-listbox .m-chartcontbox .m-li .m-zb span{
		color: #fff;
	}
	.center-chart .m-listbox .m-chartcontbox .m-li .m-lw{
		width: 4.4rem;  display: inline-block;float: left;margin-top: .05rem;font-size: .32rem;color: #eda41a; text-shadow: 1px 1px .15rem #3f291b;font-weight: bold;text-align: left;
	}
	.center-chart .m-listbox .m-chartcontbox .m-li .m-lw span{
		color: #fff;
	}



</style>
