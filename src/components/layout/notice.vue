<template>
  <div class="com_notice">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "notice"
  }

</script>

<style>
  .com_notice {
    width: 84%;
    background: rgba(0, 0, 0, 0.5);
    font-size: 0.24rem;
    color: #eebc7f;
    padding: 20px 0.6rem;
    border-radius: 10px;
    position: absolute;
    bottom: 10%;
  }

</style>
