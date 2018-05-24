<template>
  <div class="market">
    <div class="search">
      <input type="text" placeholder="搜索你想要的">
    </div>
    <div class="list">
      <div class="box">
        <div class="info">
          <span>尘位之臣</span>
          <span>炼力值:30</span>
          <span>35ENS</span>
        </div>
        <img src="../assets/images/market_buy.png" alt="">
      </div>
      <div class="box">
        <div class="info">
          <span>尘位之臣</span>
          <span>炼力值:30</span>
          <span>35ENS</span>
        </div>
        <img src="../assets/images/market_buy.png" alt="">
      </div>
      <div class="box">
        <div class="info">
          <span>尘位之臣</span>
          <span>炼力值:30</span>
          <span>35ENS</span>
        </div>
        <img src="../assets/images/market_buy.png" alt="">
      </div>
      <div class="box">
        <div class="info">
          <span>尘位之臣</span>
          <span>炼力值:30</span>
          <span>35ENS</span>
        </div>
        <img src="../assets/images/market_buy.png" alt="">
      </div>
    </div>
    <notice v-show="noticeShow">购买成功，区块确认中，请与10秒后在角色—交易记录中 进行查看。
    </notice>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        noticeShow: true
      }
    }
  }

</script>


<style>
  .market {
    width: 100%;
  }

  .market .search {
    width: 95%;
    height: 50px;
    background: url("../assets/images/market_search.png") no-repeat;
    background-size: 100%;
    margin: 15px 0 5px 2.5%;
  }

  .market .search input {
    background: transparent;
    outline: 0;
    border: none;
    font-size: 0.4rem;
    position: relative;
    bottom: 0.38rem;
    left: 1.3rem;
  }


  .market .list {
    width: 95%;
    margin-left: 2.5%;
  }

  .market .list .box {
    width: 100%;
    height: 2.6rem;
    background: url("../assets/images/market_bg.png") repeat-y;
    background-size: 100%;

  }

  .market .list .box .info {
    line-height: 2.2rem;
    margin-left: 1.2rem;
    display: inline-block;
  }

  .market .list .box .info span {
    font-size: 0.4rem;
    color: #472c0e;
  }

  .market .list .box img {
    width: 20%;
    display: inline-block;
    position: relative;
    top: 0.3rem;
    left: 0.5rem;
  }

  input::-webkit-input-placeholder {
    color: #6d533c;
  }

  input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #6d533c;
  }

  input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #6d533c;
  }

  input:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #6d533c;
  }

</style>
