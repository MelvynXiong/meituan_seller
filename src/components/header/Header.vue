<template>
  <div class="header">
    <!--顶部通栏-->
    <div class="top-wrapper">
      <div class="back-wrapper">
        <span class="icon-arrow_lift"></span>
      </div>
      <form class="search-wrapper">
        <span class="search-icon"></span>
        <input class="search-bar" type="text" placeholder="搜索店内商品">
      </form>
      <div class="more-wrapper">
        <a class="spelling-bt" href="#">
          拼单
        </a>
        <div class="more-bt"></div>
      </div>
    </div>
    <!--主题内容-->
    <div class="content"></div>
    <!--公告内容-->
    <div class="bulletin-wrapper"></div>
  </div>
</template>

<script>
    export default {
      name: "Header",
      props: {
        poiInfo: {
          type: Object,
          default: {}
        }
      }
    }
</script>

<style scoped>
  @import url("demo.css");
  @import url;
</style>
