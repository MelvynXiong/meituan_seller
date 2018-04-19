<template>
  <div class="header" :style="content_bg">
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
        <span class="more-bt">
          <span class="s-radius"></span><span class="s-radius"></span><span class="s-radius"></span>
        </span>
      </div>
    </div>
    <!--主题内容-->
    <div class="content">
      <div class="icon" :style="head_bg">
      </div>
      <div class="name">
        <h3>{{poiInfo.name}}</h3>
      </div>
      <div class="collect">
        <img src="./star.png">
        <span>收藏</span>
      </div>
    </div>
    <!--公告内容-->
    <div class="bulletin-wrapper">
      <img class="b-icon" v-if="poiInfo.discounts2" :src="poiInfo.discounts2[0].icon_url">
      <span v-if="poiInfo.discounts2" class="b-text">{{poiInfo.discounts2[0].info}}</span>
      <div v-if="poiInfo.discounts2" class="b-detail" @click="showBulletin">
        {{poiInfo.discounts2.length}}个活动
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>
    <!--公告详情-->
    <transition name="bulletin">
      <div class="bulletin-detail" v-show="isShow">
        <div class="detail-wrapper">
          <div class="content-wrapper" :style="detail_bg">
            <div class="c-icon" :style="head_bg"></div>
            <h3 class="p-name">{{poiInfo.name}}</h3>
            <!--评价稍后-->
            <div class="score">
              <Star :score="poiInfo.wm_poi_score"></Star>
              <span v-if="poiInfo.wm_poi_score">{{poiInfo.wm_poi_score}}</span>
            </div>
            <p class="tip">
              {{poiInfo.min_price_tip}} <i>|</i>
              {{poiInfo.shipping_fee_tip}} <i>|</i>
              {{poiInfo.delivery_time_tip}}
            </p>
            <p class="d-time">
              配送时间：
              {{poiInfo.shipping_time}}
            </p>
            <div class="discounts">
              <p>
                <img v-if="poiInfo.discounts2" :src="poiInfo.discounts2[0].icon_url">
                <span v-if="poiInfo.discounts2">{{poiInfo.discounts2[0].info}}</span>
              </p>
            </div>
          </div>
          <div class="close-wrapper" @click="closeBulletin">
            <span class="icon-close"></span>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
  //导入Star
  import Star from "components/star/Star"

  export default {
    name: "Header",
    data() {
      return {
        isShow: false //公告详情是否显示
      }
    },

    props: {
      //组件传值
      poiInfo: {
        type: Object,
        default: {}
      }
    },
    components: {
      Star
    },
    computed: {
      //计算属性
      content_bg() {
        return "background-image: url("+ this.poiInfo.head_pic_url +")"
      },
      head_bg() {
        return "background-image: url("+ this.poiInfo.pic_url +")"
      },
      detail_bg() {
        return "background-image: url("+ this.poiInfo.poi_back_pic_url +")"
      }
    },
    methods: {
      showBulletin() {
        this.isShow = true;
      },
      closeBulletin() {
        this.isShow = false;
      }
    }
  }
</script>

<style scoped>
  @import url("../../common/styles/icon.css");
  .header {
    height: 160px;
    /*手机顶部的信息栏会占位置*/
    padding-top: 20px;
    background-size: 100% 230px;
  }
  .top-wrapper {
    display: flex;
  }
  .back-wrapper {
    width: 50px;
    height: 31px;
    text-align: center;
    line-height: 31px;
  }
  .back-wrapper span {
    vertical-align: middle;
    color: #fff;
  }
  .search-wrapper {
    flex: 1;
    height: 31px;
  }
  .search-icon {
    position: absolute;
    width: 28px;
    height: 31px;
    background: url("titans_h5_search@2x.png") no-repeat 11px center;
    background-size: 13px 13px;
  }
  .search-bar {
    box-sizing: border-box;
    width: 100%;
    height: 31px;
    border: 0;
    outline: none;
    background: #cdcdcc;
    border-radius: 25px;
    padding-left: 28px;
  }
  .more-wrapper {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    width: 104px;
    height: 31px;
    padding: 7px 15px 0 24px;
  }
  .spelling-bt {
    display: inline-block;
    width: 30px;
    height: 17px;
    line-height: 17px;
    text-align: center;
    color: #fff;
    font-size: 11px;
    border: 1px solid #fff;
    text-decoration: none;
  }
  .more-bt {
    display: flex;
    justify-content: space-around;
    padding-top: 6px;
    width: 20px;
    height: 24px;
  }
  .s-radius {
    display: inline-block;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    border: 1px solid #fff;
  }

  /*主题内容*/
  .content {
    padding: 17px 10px 11px 10px;
    height: 50px;
  }
  .icon {
    float: left;
    width: 50px;
    height: 50px;
    background-size: 135% 100%;
    background-position: center;
    border-radius: 5px;
  }
  .name {
    float: left;
    padding: 18px 0 0 12px;
  }
  .name h3 {
    font-size: 16px;
    font-weight: bold;
    color: #fff;
  }
  .collect {
    float: right;
    width: 25px;
    height: 37px;
    padding-top: 6px;
    text-align: center;
  }
  .collect img {
    width: 20px;
    height: 20px;
  }
  .collect span {
    margin-top: 7px;
    color: #fff;
    font-size: 11px;
  }

  /*公告内容*/
  .bulletin-wrapper {
    height: 16px;
    padding: 0 10px;
  }
  .b-icon {
    width: 16px;
    height: 16px;
    float: left;
    margin-right: 6px;
  }
  .b-text {
    float: left;
    font-size: 11px;
    color: #fff;
    line-height: 16px;
  }
  .b-detail {
    float: right;
    color: #fff;
    font-size: 11px;
    line-height: 16px;
  }
  .b-detail span {
    float: right;
    font-size: 16px;
    line-height: 16px;
  }


  /*公告详情*/
  .bulletin-detail {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    background: rgba(98,98,98,0.8);
    z-index: 1;
  }
  .detail-wrapper {
    width: 100%;
    height: 100%;
    padding: 43px 20px 125px 20px;
    /*如果是content-box，该box宽度会比100%大*/
    box-sizing: border-box;
  }
  .content-wrapper {
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    border-radius: 10px;
    text-align: center;
  }
  .c-icon {
    display: inline-block;
    width: 60px;
    height: 60px;
    margin-top: 40px;
    background-size: 135% 100%;
    background-position: center;
    border-radius: 5px;
  }
  .p-name {
    margin-top: 13px;
    font-size: 15px;
    color: #fff;
  }
  /*star*/
  .score {
    height: 10px;
    margin-top: 6px;
    text-align: center;
    font-size: 0;
  }
  .star {
    display: inline-block;
    margin-right: 7px;
  }
  .score span {
    display: inline-block;
    font-size: 10px;
    color: #fff;
  }
  .tip {
    margin-top: 8px;
    font-size: 11px;
    color: #bababc;
  }
  .tip i {
    margin: 0 7px;
  }
  .d-time {
    margin-top: 13px;
    font-size: 11px;
    color: #bababc;
  }
  .discounts {
    margin-top: 20px;
    padding: 0 20px;
  }
  .discounts p {
    padding-top: 20px;
    border-top: 1px solid #bababc;
  }
  .discounts img {
    width: 16px;
    height: 16px;
    vertical-align: middle;
  }
  .discounts span {
    font-size: 11px;
    line-height: 16px;
    color: #fff;
  }
  .close-wrapper {
    padding-top: 20px;
    height: 40px;
    text-align: center;
  }
  .close-wrapper span {
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 50%;
    border: 1px solid rgba(140,140,140,0.9);
    font-size: 14px;
    color: #fff;
    background: rgba(118,118,118,0.7);
  }

  /*vue 进入过渡效果*/
  /*<transition name="bulletin"></transition>*/
  /*过渡开始状态*/
  /*.xxx-enter*/
  /*.xxx-leave*/

  /*过渡结束状态*/
  /*.xxx-enter-to*/
  /*.xxx-leave-to*/
  /*过渡时间，延迟，曲线函数*/
  /*.xxx-enter-active*/
  /*.xxx-leave-active*/

  .bulletin-enter-active,
  .bulletin-leave-active {
    transition: 2s all;
  }
  .bulletin-enter,
  .bulletin-leave-to {
    opacity: 0;
  }
  .bulletin-enter-to,
  .buuletin-leave {
    opacity: 1;
  }

</style>
