<template>
    <div class="nav">
      <!-- 使用 router-link 组件来导航. -->
      <!-- 通过传入 `to` 属性指定链接. -->
      <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
      <router-link to="/goods" class="nav-item">
        点菜
        <i class="line"></i>
      </router-link>
      <router-link to="/Ratings" class="nav-item">
        评价({{commentNum}})
        <i class="line"></i>
      </router-link>
      <router-link to="/seller" class="nav-item">
        商家
        <i class="line"></i>
      </router-link>
    </div>
</template>

<script>
    export default {
      name: "Nav",
      props: {
        commentNum: {
          type: Number,
          default: 0
        }
      }
    }
</script>

<style scoped>
  @import url("../../../static/CSS/reset.css");
  .nav {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #e4e4e4;
  }
  .nav-item {
    flex: 1;
    text-align: center;
    font-size: 13px;
    text-decoration: none;
    color: #666;
    position: relative;
  }
  /*选中后的样式*/
  .active {
    color: #ffbb22;
  }
  .active .line {
    width: 21px;
    height: 2px;
    display: inline-block;
    background: #ffbb22;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%);
  }
</style>
