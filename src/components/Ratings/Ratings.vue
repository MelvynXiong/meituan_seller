<template>
    <!--ratings 作为视口， 如果ratings-wrapper高度超出视口，即开始滚动-->
    <div class="ratings" ref="ratingView">
      <div class="ratings-wrapper">
        <div class="overview">
          <div class="o-left">
            <div class="comment-score">
              <p class="score">{{ratings.comment_score}}</p>
              <p class="text">商家评分</p>
            </div>
            <div class="other-score">
              <div class="quality-score item">
                <span class="i-text">口味</span>
                <Star :score="ratings.quality_score" class="i-star"></Star>
                <span class="i-score">{{ratings.quality_score}}</span>
              </div>
              <div class="pack-score item">
                <span class="i-text">包装</span>
                <Star :score="ratings.pack_score" class="i-star"></Star>
                <span class="i-score">{{ratings.pack_score}}</span>
              </div>
            </div>
          </div>
          <div class="o-right">
            <div class="delivery-score">
              <p class="d-score">{{ratings.delivery_score}}</p>
              <p class="d-text">配送评分</p>
            </div>
          </div>
        </div>
        <Split></Split>

        <div class="content">

          <div class="rating-select" v-if="ratings.tab">
            <span class="tab-item" @click="selectTypeFn(2)" :class="{'active':selectType==2}">{{ratings.tab[0].comment_score_title}}</span>
            <span class="tab-item" @click="selectTypeFn(1)" :class="{'active':selectType==1}">{{ratings.tab[1].comment_score_title}}</span>
            <span class="tab-item" @click="selectTypeFn(0)" :class="{'active':selectType==0}">
              <img src="./icon_sub_tab_dp_normal@2x.png" v-show="selectType!=0">
              <img src="./icon_sub_tab_dp_highlighted@2x.png" v-show="selectType==0"/>
              {{ratings.tab[2].comment_score_title}}
            </span>
          </div>

          <div class="labels-view">
            <span v-for="item in ratings.labels" class="l-item" :class="{'highlight': item.label_star > 0}">
              {{item.content}}&ensp;{{item.label_count}}
            </span>
          </div>

          <ul class="rating-list">
            <li v-for="comment in selectComments" class="rating-item">
              <div class="comment-header">
                <img :src="comment.user_pic_url" v-if="comment.user_pic_url">
                <img src="./anonymity.png" v-if="!comment.user_pic_url">
              </div>
              <div class="comment-main">
                <div class="user">
                  {{comment.user_name}}
                </div>
                <div class="c-time">{{formatDate(comment.comment_time)}}</div>
                <div class="c-star">
                  <span class="star-text">评分</span>
                  <Star :score="comment.order_comment_score"></Star>
                </div>
                <p class="c-content" v-html="commentStr(comment.comment)"></p>
                <div class="img-wrapper" v-if="comment.comment_pics.length">
                  <img v-for="item in comment.comment_pics" :src="item.thumbnail_url">
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
  //导入Star组件
  import Star from "components/star/Star"
  import Split from "components/Split/Split"
  //导入BScroll
  import BScroll from "better-scroll"

  //全部
  const ALL = 2;
  //带图片
  const PICTURE = 1;
  //点评
  const COMMENT = 0;

  export default {
    name: "Ratings",
    data() {
      return {
        ratings: {},
        selectType: ALL
      }
    },
    created() {
      var that = this;
      //通过axios发起文件请求
      this.$axios.get('/api/ratings')
        .then(function (response) {
          var dataSource = response.data;
          if(dataSource.code == 0) {
            that.ratings = dataSource.data;


            //初始化滚动
            that.$nextTick(()=>{
              if(!that.scroll) {
                that.scroll = new BScroll(that.$refs.ratingView, {click: true});
              } else {
                that.scroll.refresh();
              }
            });

          }
        })
        .catch(function (error) {
          //错误处理
          console.log(error);
        });
    },
    methods: {
      selectTypeFn(type) {
        this.selectType = type;

        //刷新操作
        this.$nextTick(()=>{
          this.scroll.refresh();
        });
      },
      formatDate(time) {
        let date = new Date(time*1000);
        //时间格式
        let fmt = "yyyy.MM.dd";

        if(/(y+)/.test(fmt)) {
          let year = date.getFullYear().toString();
          fmt = fmt.replace(RegExp.$1,year);
        }
        if(/(M+)/.test(fmt)) {
          let month = date.getMonth() + 1;
          if(month <10) {
            month = "0" + month;
          }
          fmt = fmt.replace(RegExp.$1, month);
        }
        if(/(d+)/.test(fmt)) {
          let myDate = date.getDate();
          if(myDate < 10) {
            myDate = "0" + myDate;
          }
          fmt = fmt.replace(RegExp.$1, myDate);
        }
        return fmt;
      },
      commentStr(content) {
        let rel = /#[^#]+#/g;
        return content.replace(rel, '<i style="color: #576b95">$&</i>');
      }
    },
    computed : {
      selectComments() {
        if(this.selectType == ALL) {
          //全部
          return this.ratings.comments;

        } else if (this.selectType == PICTURE) {
          //有图
          let arr = [];
          this.ratings.comments.forEach((comment)=>{
            if(comment.comment_pics.length) {
              arr.push(comment);
            }
          });
          return arr;
        } else {
          return this.ratings.comments_dp.comments;
        }
      }
    },
    components: {
      Star,
      Split,
      BScroll
    }
  }
</script>

<style scoped>
  .ratings {
    /*使用绝对定位加top bottom的组合是用来确定该盒子的位置和高度*/
    position: absolute;
    left: 0;
    top: 221px;
    bottom: 0;
    width: 100%;
    overflow: hidden;
  }
  .overview {
    display: flex;
    padding: 20px 0 18px 0;
  }
  .o-left {
    display: flex;
    flex: 1;
    padding-left: 26px;
  }
  .comment-score {
    width: 48px;
    text-align: center;
    margin-right: 26px;
  }
  .score {
    font-size: 23px;
    font-weight: 800;
    color: #ffb000;
    margin-bottom: 9px;
  }
  .text {
    font-size: 11px;
    color: #666;
  }
  .other-score {
    margin-top: 3px;
  }
  .item {
    display: flex;
    height: 11px;
  }
  .i-text {
    font-size: 11px;
    color: #666;
    margin-right: 11px;
  }
  .i-star {
    margin-right: 11px;
  }
  .i-score {
    font-size: 11px;
    color: #ffb000;
  }
  .quality-score {
    margin-bottom: 14px;
  }

  .o-right {
    flex: 0 0 100px;
    text-align: center;
    border-left: 1px solid #9d9d9d;
  }
  .d-score {
    font-size: 19px;
    font-weight: 500;
    color: #999;
    margin-top: 3px;
    margin-bottom: 10px;
  }
  .d-text {
    font-size: 11px;
    color: #999;
  }

  .content {
    padding: 16px;
  }
  .rating-select {
    display: flex;
    margin-bottom: 11px;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #ffb000;
    border-radius: 3px;
  }
  .tab-item {
    flex: 1;
    height: 33px;
    line-height: 33px;
    font-size: 14px;
    color: #ffb000;
    text-align: center;
    border-right: 1px solid #ffb000;
  }
  .tab-item.active {
    color: #000;
    background: #ffb000;
  }
  .tab-item:last-child {
    border-right: 0;
    /*保证三栏等分*/
    flex-basis: 1px;
  }
  .tab-item:last-child img {
    height: 14px;
    vertical-align: middle;
  }

  .l-item {
    display: inline-block;
    height: 27px;
    line-height: 27px;
    padding: 0 10px;
    margin-right: 6px;
    margin-bottom: 6px;
    font-size: 12px;
    color: #999;
    background: #f4f4f4;
  }
  .l-item.highlight {
    color: #656565;
  }

  .rating-item {
    display: flex;
    box-sizing: border-box;
    padding: 16px 16px 16px 0;
    width: 100%;
    border-bottom: 1px solid #f4f4f4;
  }
  .comment-header {
    flex: 0 0 35px;
    margin-right: 11px;
  }
  .comment-header img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }
  .comment-main {
    flex: 1;
  }
  .user {
    float: left;
    width: 50%;
    font-size: 11px;
    color: #333;
  }
  .c-time {
    float: right;
    width: 50%;
    text-align: right;
    font-size: 9px;
    color: #666;
  }
  .c-star {
    clear: both;
    display: flex;
    padding-top: 12px;
    padding-bottom: 15px;
  }
  .star-text {
    font-size: 11px;
    color: #999;
    margin-right: 7px;
  }
  .c-content {
    font-size: 13px;
    line-height: 19px;
  }
  .img-wrapper {
    margin-top: 9px;
  }
  .img-wrapper img {
    width: 175px;
  }
</style>
