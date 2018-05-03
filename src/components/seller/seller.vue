<template>
    <!--将seller固定为视口，如果不这样，seller的高度就不固定，就有出现默认滚动条的危险-->
    <div class="seller">
      <div class="seller-wrapper">
        <Split></Split>
        <div class="seller-info">
          <div class="address-wrapper">
            <div class="address-left">
              {{seller.address}}
            </div>
            <div class="address-right">
              <div class="content"></div>
            </div>
          </div>

          <div class="pics-wrapper" ref="picsWrapper">
            <ul content="pics-list" v-if="seller.poi_env" ref="picsList">
              <li class="pics-item" v-for="imgurl in seller.poi_env.thumbnails_url_list" ref="picsItem">
                <img :src="imgurl">
              </li>
            </ul>
          </div>

          <div class="safety-wrapper">
            查看食品安全档案
            <span class="icon-keyboard_arrow_right"></span>
          </div>
        </div>
        <Split></Split>
        <div class="tip-wrapper">
          <div class="delivery-wrapper">
            配送服务: {{seller.app_delivery_tip}}
          </div>
          <div class="shipping-wrapper">
            配送时间: {{seller.shipping_time}}
          </div>
        </div>
        <Split></Split>
        <div class="other-wrapper">
          <div class="server-wrapper">
            商家服务
            <div class="poi-server" v-for="item in seller.poi_service">
              <img :src="item.icon">
              {{item.content}}
            </div>
          </div>
          <div class="discounts-wrapper">
            <div class="discounts-item" v-for="item in seller.discounts2">
              <div class="d-icon">
                <img :src="item.icon_url">
              </div>
              <div class="d-content">
                {{item.info}}
              </div>
            </div>
          </div>
        </div>
        <Split class="bottom"></Split>
      </div>
    </div>
</template>

<script>
  import Split from "components/Split/Split"
  //导入BScroll
  import BScroll from "better-scroll"
  export default {
    name: "seller",
    data() {
      return {
        seller:{}
      }
    },
    created() {
      let that = this;
      //通过axios发起文件请求
      this.$axios.get('/api/seller')
        .then(function (response) {
          var dataSource = response.data;
          if(dataSource.code == 0) {
            that.seller = dataSource.data;


            //初始化滚动
            that.$nextTick(()=>{
              if(that.seller.poi_env.thumbnails_url_list) {
                let imgW = that.$refs.picsItem[0].clientWidth;
                let marginR = 11;
                let width = (imgW + marginR) * that.seller.poi_env.thumbnails_url_list.length;
                that.$refs.picsList.style.width = width + 'px';
                that.scroll = new BScroll(that.$refs.picsWrapper, {scrollX: true, click: true});
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
    components: {
        Split, BScroll
    }
  }
</script>

<style scoped>
  @import "../../common/styles/icon.css";
  .seller {
    position: absolute;
    left: 0;
    top: 221px;
    bottom: 0;
    width: 100%;
    overflow: hidden;
  }
  .seller-info {
    padding-left: 15px;
  }
  .address-wrapper {
    display: flex;
    padding: 16px 0;
    border-bottom: 1px solid #f4f4f4;
  }
  .address-left {
    flex: 1;
    padding-left: 26px;
    padding-right: 31px;
    font-size: 14px;
    line-height: 19px;
    background: url("address.png") no-repeat left center;
    background-size: 14px 16px;
  }
  .address-right {
    flex: 0 0 60px;
    background: url("line.png") no-repeat left center;
    background-size: 1px 15px;
  }
  .content {
    height: 100%;
    background: url("phone.png") no-repeat center center;
    background-size: 18px 18px;
  }
  .pics-wrapper {
    padding-top: 10px;
    padding-bottom: 10px;
    overflow: hidden;
    border-bottom: 1px solid #f4f4f4;
    white-space: nowrap;

  }
  .pics-item {
    display: inline-block;
    margin-right: 11px;
    width: 93px;
    height: 75px;
  }
  .pics-item img {
    width: 100%;
    height: 100%;
    border-radius: 2px;
  }
  .safety-wrapper {
    padding: 15px 14px 15px 25px;
    background: url("safety.png") no-repeat left center;
    background-size: 14px 16px;
    font-size: 14px;
  }
  .safety-wrapper span {
    float: right;
    font-size: 14px;
  }

  .tip-wrapper {
    padding-left: 15px;
  }
  .delivery-wrapper {
    background: url("delivery.png") no-repeat left center;
    background-size: 14px 16px;
    padding: 15px 0 15px 25px;
    font-size: 14px;
    border-bottom: 1px solid #f4f4f4;
  }
  .shipping-wrapper {
    padding: 15px 17px 15px 25px;
    background: url("time.png") no-repeat left center;
    background-size: 15px 15px;
    font-size: 14px;
    line-height: 18px;
  }

  .other-wrapper {
    padding-left: 15px;
  }
  .server-wrapper {
    padding: 15px 0 17px 25px;
    background: url("server.png") no-repeat left center;
    background-size: 15px 15px;
    font-size: 14px;
    border-bottom: 1px solid #f4f4f4;
  }
  .poi-server {
    display: inline-block;
    margin-left: 17px;
  }
  .poi-server img {
    width: 15px;
    height: 15px;
    margin-right: 6px;
    vertical-align: middle;
  }
  .discounts-wrapper {
    padding: 17px 24px 19px 0;
  }
  .discounts-item {
    display: flex;
  }
  .d-icon {
    flex: 0 0 25px;
  }
  .d-icon img {
    width: 15px;
    height: 15px;
  }
  .d-content {
    flex: 1;
    font-size: 14px;
    line-height: 18px;
  }
  .bottom {
    height: 28px;
  }

</style>
