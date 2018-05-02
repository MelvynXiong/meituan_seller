<template>
  <transition name="detail">
    <div class="food" v-show="showFlag" ref="foodView">
      <div class="food-wrapper">
        <div class="food-content">
          <div class="img-wrapper">
            <img class="food-img" :src="food.picture">

            <span class="icon-close close-bt" @click="closeView"></span>
            <img class="share-bt" src="./share.png">
            <img class="more-bt" src="./more.png">
          </div>
          <div class="content-wrapper">
            <h3 class="name">{{food.name}}</h3>
            <p class="saled">{{food.month_saled_content}}</p>
            <img class="product" v-show="food.product_label_picture" :src="food.product_label_picture">
            <p class="price">
              <span class="text">￥{{food.min_price}}</span>
              <span class="unit">/{{food.unit}}</span>
            </p>

            <div class="cartcontrol-wrapper">
              <Cartcontrol :food="food"></Cartcontrol>
            </div>
            <div class="buy" @click="addFirst" v-show="!food.count || food.count==0">
              选规格
            </div>
          </div>
        </div>
        <Split></Split>
        <div class="rating-wrapper">
          <div class="rating-title">
            <div class="like-ratio" v-if="food.rating">
              <span class="title">{{food.rating.title}}</span>
              <span class="ratio">({{food.rating.like_ratio_desc}}<i>{{food.rating.like_ratio}}</i>)</span>
            </div>
            <div class="snd-title" v-if="food.rating">
              <span class="s-text">{{food.rating.snd_title}}</span>
              <span class="icon icon-keyboard_arrow_right"></span>
            </div>
          </div>

          <ul class="rating-content" v-if="food.rating">
            <li v-for="comment in food.rating.comment_list" class="rating-item">
              <div class="comment-header">
                <img :src="comment.user_icon" v-if="comment.user_icon">
                <img src="./anonymity.png" v-if="!comment.user_icon">
              </div>
              <div class="comment-main">
                <div class="user">
                  {{comment.user_name}}
                </div>
                <div class="time">{{comment.comment_time}}</div>
                <div class="content">{{comment.comment_content}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  //导入Cartcontrol
  import Cartcontrol from "components/Cartcontrol/Cartcontrol"
  //导入BScroll
  import BScroll from "better-scroll"
  import Vue from 'vue'
  import Split from 'components/Split/Split'
  export default {
    name: "Food",
    data() {
      return {
        showFlag: false
      }
    },
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      //父组件是可以调用子组件的方法
      showView() {
        this.showFlag = true;

        //Bscroll初始化
        this.$nextTick(()=>{
          if(!this.scroll) {
            this.scroll = new BScroll(this.$refs.foodView, {click: true});
          } else {
            this.scroll.refresh();
          }
        });
      },
      closeView() {
        this.showFlag = false;
      },
      addFirst() {
        Vue.set(this.food, 'count', 1);
      }
    },
    components: {
      Cartcontrol,
      BScroll,
      Split
    }
  }
</script>

<style scoped>
  @import "../../common/styles/icon.css";
  .food {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 51px;
    width: 100%;
    background: #fff;
    z-index: 97;
  }
  .detail-enter-active,
  .detail-leave-active {
    transition: 1.0s
  }
  .detail-enter,
  .detail-leave-to {
    transform: translateX(100%);
  }
  .food-content {
    position: relative;
  }
  .img-wrapper {
    position: relative;
    /*!*高度如何撑开,在定位中，使用padding-top或padding-bottom设置为100%, 盒子高度会根据盒子的宽度来计算*!*/
    /*padding-top: 100%;*/
  }
  .food-img {
    width: 100%;
    /*
    * 如果不照课程视频里那样写，图片如果很大的情况下，等图片完全加载完后，要重新渲染
    */
    /*position: absolute;*/
    /*left: 0;*/
    /*bottom: 0;*/
    /*width: 100%;*/
    /*height: 100%;*/
  }
  .close-bt {
    position: absolute;
    left: 10px;
    top: 10px;
    width: 30px;
    height: 30px;
    font-size: 30px;
    color: #fff;
    text-align: center;
    background: #7f7f7f;
    border-radius: 50%;
  }
  .share-bt {
    position: absolute;
    top: 10px;
    right: 50px;
    width: 30px;
  }
  .more-bt {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
  }

  .content-wrapper {
    padding: 0 0 16px 16px;
  }
  .name {
    line-height: 30px;
    font-size: 15px;
    color: #333;
    font-weight: bold;
  }
  .saled {
    margin-bottom: 6px;
    font-size: 11px;
    color: #9d9d9d;
  }
  .product {
    height: 15px;
    margin-bottom: 16px;
  }
  .price {
    font-size: 0;
  }
  .text {
    font-size: 17px;
    color: #fb4e44;
  }
  .unit {
    font-size: 11px;
    color: #9d9d9d;
  }
  .cartcontrol-wrapper {
    position: absolute;
    right: 12px;
    bottom: 10px;
    padding: 2px;
  }
  .buy {
    position: absolute;
    right: 12px;
    bottom: 10px;
    width: 64px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    text-align: center;
    background: #ffd161;
    border-radius: 30px;
  }

  .rating-wrapper {
    padding-left: 16px;
  }
  .rating-title {
    display: flex;
    padding: 16px 16px 16px 0;
    justify-content: space-between;
  }
  .title {
    font-size: 13px;
  }
  .ratio {
    font-size: 11px;
  }
  .ratio i {
    font-size: 11px;
    color: #fb4e44;
  }
  .icon,
  .s-text {
    font-size: 13px;
    color: #9d9d9d;
  }
  .icon {
    margin-left: 12px;
    vertical-align: middle;
  }

  .rating-item {
    display: flex;
    box-sizing: border-box;
    padding: 15px 14px 17px 0;
    width: 100%;
    border-top: 1px solid #f4f4f4;
  }
  .comment-header {
    flex: 0 0 41px;
    margin-right: 10px;
  }
  .comment-header img {
    width: 41px;
    height: 41px;
    border-radius: 50%;
  }
  .comment-main {
    flex: 1;
    margin-top: 6px;
  }
  .user {
    float: left;
    width: 50%;
    font-size: 12px;
    color: #333;
  }
  .time {
    float: right;
    width: 50%;
    text-align: right;
    font-size: 10px;
    color: #666;
  }
  .content {
    margin-top: 17px;
    font-size: 13px;
    line-height: 19px;
  }
</style>
