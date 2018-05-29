<template>
    <div class="m-dazao">
    	<div v-show="tcShow" class="m-tcbg"></div>
	    <div v-show="tcShow" class="m-dzcontbox">
	      <div class="m-txt01">123</div>
	      <div class="m-txt02">123</div>
	      <div class="m-dztcbtnbox">
	        <a href="javascript:;" class="m-btn" @click="close()">
	          <img src="../assets/images/ico-dazaobtn01.png" />
	        </a>
	        <a href="javascript:;" class="m-btn" @click="close()">
	          <img src="../assets/images/ico-dazaobtn02.png" />
	        </a>
	      </div>
	    </div>
	    <div class="m-dzcardtcbox">
	    	<div class="m-listbox">
	    		<div class="m-list">
					<div class="m-imgbox">
						<img  src="../assets/images/card01.png"/>
					</div>
				</div>
				<div class="m-list">
					<div class="m-imgbox">
						<img  src="../assets/images/card01.png"/>
					</div>
				</div>
	    	</div>
	    </div>
    	<div v-if="sign" class="m-dztypebox">打造完成，区块确认中，请与10秒后在个人中心—打造记录中进行查看。
    	</div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
      	tcShow: true,
        sign: true,

      }
    },
    methods: {
      close() {
        this.tcShow = !this.tcShow
      },
      // signClick(){
      // 	let self = this;
      // 	self.sign = true;
      // 	setTimeout(function(){
      // 		self.sign = false;
      // 	}, 3000)
      // }
    },
    mounted:{
    }

  }

</script>

<style>
.m-dazao{
	width: 10.8rem;height:100%; display: inline-block;background: url("../assets/images/bg-dazao.jpg") no-repeat;
    background-size: 100% 100%;
}
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

  .m-dzcontbox .m-txt01 {
    width: 3.8rem;
    display: inline-block;
    background: #fff;
    margin: 3.6rem 0 0 .6rem;
    border: none;
    background: none;
    outline: none;
    font-size: .7rem;
    text-align: center;
  }
    .m-dzcontbox .m-txt02 {
    width: 3.8rem;
    display: inline-block;
    background: #fff;
    margin: -.2rem 0 0 2.6rem;
    border: none;
    background: none;
    outline: none;
    font-size: .7rem;
    text-align: center;
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
  	width: 7.3rem;height: 6rem; display: inline-block;margin: .8rem auto 0;
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

</style>
