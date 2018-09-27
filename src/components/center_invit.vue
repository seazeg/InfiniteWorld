<template>
	<div class="center-invit">
    <div class="m-yqm">{{yqm}}</div>
    <div class="m-textbox01">您可以复制您的专属广告语，将文档黏贴并发送给您的好友</div>
    <div class="m-textbox02">无尽世界是基于阿希链的去中心化自治游戏平台，打造资产，数据上链游戏生态，现诚邀您体验无尽世界首款区块链游戏《卟星师》，下载链接：http://fir.im/7mkx填写邀请码"{{yqm}}"进行注册，QQ交流群：193244055</div>
    <div class="m-copybtn btn" :data-clipboard-text="yqm"><img src="../assets/images/img-copybtn.png" /></div>
    <div class="m-yqtxt">每成功邀请1位用户将额外获得被邀请用户每日所得10%ENS</div>
    <div class="m-yqlistbox">
      <div class="m-list">
        <div class="m-left">被邀请账户</div>
        <div class="m-right">昨日总收益：{{allEns}}</div>
      </div>
    </div>
    <div class="m-yqlistbox01">
      <div class="m-list" v-for="item in yqList">
        <div class="m-left">{{item.nickname}}</div>
        <div class="m-right">{{item.coin}}</div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
	    data() {
      return {
        tcinShow: false,
        yqm:'',
        yqList:'',
        allEns:'0',
      }
    },
    methods: {
      openIn() {
        this.tcinShow = !this.tcinShow
      },
      roleInit() {
        var _this = this;
        var params = {
          address: sessionStorage.getItem("address")
        }
        _this.$axios({
          method: 'get',
          url: _this.http184 + '/wb/role',
          params: params,
          	headers:{
						"Authorization": "basic " + sessionStorage.getItem('logintoken')
					}
        }).then((res) => {
          if(res.data.data == null){
            _this.yqm = '请先创建角色';
          }else{
            _this.yqm = res.data.data.invate;
          }
        }, (error) => {
          console.log(error);
        });
      },
      listInit() {
        var _this = this;
        var params = {
          address: sessionStorage.getItem("address")
        }
        _this.$axios({
          method: 'get',
          url: _this.http184 + '/wb/invatelist',
          params: params,
          	headers:{
						"Authorization": "basic " + sessionStorage.getItem('logintoken')
					}
        }).then((res) => {
            console.log(123)
            _this.yqList=res.data.data;
            var num = 0;
            for( let c = 0; c<_this.yqList.length;c++){
              num = num+_this.yqList[c].coin*1
            }
            console.log(num)
            _this.allEns = num;
          
        }, (error) => {
          console.log(error);
        });
        
      },
    },
        mounted() {
      let _this = this;
      _this.roleInit();
      _this.listInit();
      new ClipboardJS('.m-copybtn');

    }

}
</script>

<style>
	.center-invit {
		width: 10.05rem;
    height: 14.44rem;
		margin: .55rem auto 2.4rem;
    background: url('../assets/images/bg-invite.png') no-repeat;
    background-size: 100% 100%;
    text-align: center;
	}

  .center-invit .m-yqm {
    width: 100%;
    margin: 1.6rem auto 0;
    display: inline-block;
    font-size: 1rem;
    color: #c98a1a;
  }
  .center-invit .m-copybtn{
    width: 3.25rem;
    height: .8rem;
    margin: .2rem auto 0;
    display: inline-block;
    vertical-align: top;
  }
  .center-invit .m-copybtn img {
    width: 100%;
    height: 100%;
    vertical-align: top;
  }
  .center-invit .m-textbox01{
    width: 100%;display: inline-block;padding: 0 1rem; color: #957959;vertical-align: top;box-sizing: border-box;font-size: .29rem;text-align: left;
  }
  .center-invit .m-textbox02{
    width: 100%;display: inline-block;padding: 0 1rem; color: #ceb37d;vertical-align: top;box-sizing: border-box;font-size: .32rem;text-align: left;line-height: .5rem;
  }
  .center-invit .m-textbox02 span{
      width: 100%; text-align: center;display: inline-block;
  }
  .center-invit .m-yqtxt{
    width: 100%;display: inline-block;margin-top: 1.4rem;padding: 0 1rem; color: #f43800;vertical-align: top;box-sizing: border-box;font-size: .3rem;text-align: center;
  }
  .center-invit .m-yqlistbox{
    width: 6.4rem;display: inline-block;margin: .2rem auto 0;vertical-align: top;
  }
  .center-invit .m-yqlistbox .m-list{
    width: 100%;display: inline-block; line-height:.38rem;height: .38rem;vertical-align: top;float: left;
  }
  .center-invit .m-yqlistbox .m-list .m-left{
    width: auto;display: inline-block;float: left;max-width: 70%;overflow:hidden;font-size: .26rem;color: #1c212c; 
  }
  .center-invit .m-yqlistbox .m-list .m-right{
    width: auto;display: inline-block;float: right;font-size: .26rem;color: #1c212c; 
  }
  .center-invit .m-yqlistbox01{
    width: 6.4rem;display: inline-block;margin: -.6  rem auto 0;max-height: 1.5rem; overflow-y: auto;overflow-x: hidden;vertical-align: top;
  }
  .center-invit .m-yqlistbox01 .m-list{
    width: 100%;display: inline-block; line-height:.38rem;height: .38rem;vertical-align: top;float: left;
  }
  .center-invit .m-yqlistbox01 .m-list .m-left{
    width: auto;display: inline-block;float: left;max-width: 70%;overflow:hidden;font-size: .26rem;color: #1c212c; 
  }
  .center-invit .m-yqlistbox01 .m-list .m-right{
    width: auto;display: inline-block;float: right;font-size: .26rem;color: #1c212c; 
  }


</style>
