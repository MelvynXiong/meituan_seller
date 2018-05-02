<template>
  <div id="app">
    <!--header-->
    <Myheader :poiInfo='poiInfo'></Myheader>
    <!--nav-->
    <Mynav :commentNum="commentNum"></Mynav>
    <!--main-->
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>

<script>

//import 1.导入
import Myheader from 'components/header/Header'
import Mynav from 'components/nav/Nav'
export default {
  name: 'App',
  components: {
    // 2.注册
    Myheader, Mynav
  },
  data() {
    return {
      //header组件需要的信息（商家信息）
      poiInfo: {},
      commentNum: 0
    }
  },
  created() {
    var that = this;

    //发起异步请求，获取数据
    //通过axios发起文件请求
    this.$axios.get('/api/goods')
      .then(function (response) {
        //获取到数据后的操作
        //console.log(response);
        var dataSource = response.data;
        if(dataSource.code == 0) {
          that.poiInfo = dataSource.data.poi_info;
          //console.log(that.poiInfo);
        }
      })
      .catch(function (error) {
        //错误处理
        console.log(error);
      });
    //通过axios发起文件请求
    this.$axios.get('/api/ratings')
      .then(function (response) {
        var dataSource = response.data;
        if(dataSource.code == 0) {
          that.commentNum = dataSource.data.comment_num;
        }
      })
      .catch(function (error) {
        //错误处理
        console.log(error);
      });
  }
}
</script>

<style>

</style>
