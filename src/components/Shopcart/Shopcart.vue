<template>
    <div class="shopcart">
      <div class="shopcart-wrapper" :class="{'highlight':totalCount>0}">
        <div class="content-left">
          <div class="logo-wrapper" :class="{'highlight':totalCount>0}" @click="toggleList">
            <span class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></span>
            <i class="f-num" v-show="totalCount">{{totalCount}}</i>
          </div>
          <div class="desc-wrapper">
            <p class="total-price" v-show="totalPrice">￥{{totalPrice}}</p>
            <p class="tip" :class="{'highlight':totalCount>0}">另需{{poiInfo.shipping_fee_tip}}</p>
          </div>
        </div>
        <div class="content-right" :class="{'highlight':totalCount>0}">
          {{payStr}}
        </div>
        <!--购物车详情页-->
        <div class="s-list" :class="{'show':listShow}" v-show="listShow">
          <div class="list-top" v-if="poiInfo.discounts2">
            {{poiInfo.discounts2[0].info}}
          </div>
          <div class="list-header">
            <h3 class="title">1号口袋</h3>
            <div class="clear" @click="clearAll">
              <img src="./ash_bin.png">
              <span>清空购物车</span>
            </div>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="food in selectFoods">
                <div class="l-desc-wrapper">
                  <div class="desc-left">
                    <p class="l-f-name">{{food.name}}</p>
                    <p class="l-f-unit" v-show="!food.description">{{food.unit}}</p>
                    <p class="description" v-show="food.description">{{food.description}}</p>
                  </div>
                  <div class="desc-right">
                    <span class="price">￥{{food.min_price}}</span>
                  </div>
                </div>
                <div class="l-cartcontrol-wrapper">
                  <Cartcontrol :food="food"></Cartcontrol>
                </div>
              </li>
            </ul>
          </div>
          <div class="list-bottom"></div>
        </div>
      </div>

      <div class="shopcart-mask" v-show="listShow" @click="hideMask"></div>
    </div>
</template>

<script>
    import Cartcontrol from "components/Cartcontrol/Cartcontrol"
    //导入BScroll
    import BScroll from "better-scroll"
    export default {
      name: "Shopcart",
      data() {
        return {
          fold: true
        }
      },
      props: {
        // min_price_tip: {
        //   type: String,
        //   default: ''
        // },
        // shipping_fee_tip: {
        //   type:String,
        //   default: ''
        // },
        poiInfo: {
          type: Object,
          default: {

          }
        },
        selectFoods: {
          type: Array,
          default() {
            return [
              // {
              //   min_price: 10,
              //   count: 3
              // },
              // {
              //   min_price: 7,
              //   count: 50
              // }
            ];
          }
        }
      },
      computed: {
          //总个数
        totalCount() {
          let num = 0;
          this.selectFoods.forEach((food) => {
            num += food.count;
          });
          return num;
        },
        //总金额
        totalPrice() {
          let total = 0;
          this.selectFoods.forEach((food) => {
            total += food.min_price * food.count;
          });
          return total;
        },
        //计算按钮显示
        payStr() {
          if(this.totalCount > 0) {
            return "去结算";
          }else {
            return this.poiInfo.min_price_tip;
          }
        },
        listShow() {
          if(!this.totalCount) {
            //个数为0
            this.fold = true;
            return false;
          }
          let show = !this.fold;
          //BScroll相关
          if(show) {
            this.$nextTick(() => {
              if(!this.shopScroll) {
                this.shopScroll = new BScroll(this.$refs.listContent, {click: true});
              } else {
                this.shopScroll.refresh();
              }
            });
          }
          return show;
        }
      },
      methods: {
        toggleList() {
          if(!this.totalCount) {//个数为0
            return;
          }
          this.fold = !this.fold;
        },
        clearAll() {
          this.selectFoods.forEach((food) => {
            food.count = 0;
          });
        },
        hideMask() {
          this.fold = true;
        }
      },
      components: {
        Cartcontrol,
        BScroll
      }
    }
</script>

<style scoped>
  @import "../../common/styles/icon.css";
  .shopcart-wrapper {
    display: flex;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 51px;
    background: #514f4f;
    z-index: 99;
  }
  .shopcart-wrapper.highlight {
    background: #2d2b2a;
  }
  .content-left {
    flex: 1;
  }
  .logo-wrapper {
    position: relative;
    bottom: 14px;
    left: 10px;
    float: left;
    width: 50px;
    height: 50px;
    text-align: center;
    background: #666;
    border-radius: 50%;
  }
  .logo-wrapper.highlight {
    background: #ffd161;
  }
  .logo-wrapper span {
    font-size: 28px;
    color: #c4c4c4;
    /*可是使用line-height来垂直居中*/
    line-height: 50px;
  }
  .logo-wrapper span.highlight {
    color: #2d2b2a;
  }
  .f-num {
    position: absolute;
    top: 0;
    right: 0;
    width: 15px;
    height: 15px;
    line-height: 15px;
    border-radius: 50%;
    font-size: 9px;
    color: #fff;
    background: #ff0000;
  }
  .desc-wrapper {
    float: left;
    margin-left: 23px;
  }
  .total-price {
    line-height: 33px;
    font-size: 18px;
    color: #fff;
  }
  .tip {
    line-height: 51px;
    font-size: 12px;
    color: #bab9b9;
  }
  .tip.highlight {
    line-height: 12px;
  }
  .content-right {
    flex: 0 0 110px;
    line-height: 51px;
    text-align: center;
    font-size: 15px;
    color: #bab9b9;
  }
  .content-right.highlight {
    background: #ffd161;
    color: #2d2b2a;
  }

  .s-list {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: -1;
  }
  .s-list.show {
    transform: translateY(-100%);
  }
  .list-top {
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 11px;
    color: #646158;
    background: #f3e6c6;
  }
  .list-header {
    display: flex;
    justify-content: space-between;
    height: 30px;
    background: #f4f4f4;
  }
  .title {
    border-left: 4px solid #53c123;
    padding-left: 6px;
    line-height: 30px;
    font-size: 12px;
  }
  .clear {
    margin-right: 10px;
    line-height: 30px;
    font-size: 0;
  }
  .clear span {
    font-size: 12px;
    vertical-align: middle;
  }
  .clear img {
    height: 14px;
    margin-right: 9px;
    vertical-align: middle;
  }

  .list-content {
    max-height: 360px;
    overflow: hidden;
    background: #fff;
  }
  .food {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    height: 60px;
    padding: 12px 12px 10px 12px;
    border-bottom: 1px solid #f4f4f4;
  }
  .l-desc-wrapper {
    display: flex;
    justify-content: space-between;
    width: 240px;
  }
  .desc-left {
    width: 170px;
  }
  .l-f-name {
    font-size: 16px;
    margin-bottom: 8px;

    /*超出部分隐藏*/
    -webkit-line-clamp: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    height: 16px;
  }
  .l-f-unit {
    font-size: 12px;
    color: #b4b4b4;
  }
  .description {
    font-size: 12px;
    color: #b4b4b4;

    /*超出部分隐藏*/
    /*-webkit-line-clamp: 1;*/
    /*display: -webkit-box;*/
    /*-webkit-box-orient: vertical;*/
    overflow: hidden;
    height: 12px;
  }
  .desc-right {
    width: 70px;
    text-align: right;
  }
  .price {
    font-size: 12px;
    line-height: 37px;
  }
  .l-cartcontrol-wrapper {
    margin-top: 6px;
  }
  .shopcart-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 98;
    background: rgba(7,17,27,0.6);
  }

</style>
