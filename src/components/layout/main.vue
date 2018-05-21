<template>
  <div class="iw_main">
    <slot></slot>
    <div class="menu" v-if="ismenu"></div>
  </div>
</template>

<script>
  export default {
    name: "layout",
    props: {
      ismenu: {
        type: Boolean,
        default: true
      }
    }
  }

</script>

<style>
  .iw_main {
    overflow: hidden;
  }

  .iw_main .menu {}

</style>
