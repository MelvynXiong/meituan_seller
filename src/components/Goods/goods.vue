<template>
    <div class="goods">
      <!--分类-->
      <div class="menu-wrapper" ref="menuScroll">
        <ul>
          <!--专场-->
          <li class="menu-item" :class="{'current':currentIndex===0}" @click="selectMenu(0)">
            <p class="text">
              <img :src="container.tag_icon" v-if="container.tag_icon" class="icon">
              {{container.tag_name}}
            </p>
          </li>
          <li class="menu-item" v-for="(item,index) in goods" :class="{'current':currentIndex===index+1}" @click="selectMenu(index+1)">
            <p class="text">
              <img :src="item.icon" v-if="item.icon" class="icon">
              {{item.name}}
            </p>
            <i class="m-num" v-show="calculateCount(item.spus)">{{calculateCount(item.spus)}}</i>
          </li>
        </ul>
      </div>
      <!--菜品列表-->
      <div class="food-wrapper" ref="foodScroll">
        <ul>
          <!--专场-->
          <li class="container-list food-list-hook">
            <div v-for="item in container.operation_source_list">
              <img :src="item.pic_url">
            </div>
          </li>
          <!--具体分类-->
          <li v-for="item in goods" class="food-list food-list-hook">
            <h3>{{item.name}}</h3>
            <!--具体商品列表-->
            <ul>
              <li v-for="food in item.spus" class="food-item" @click="showDetail(food)">
                <div class="f-icon" :style="head_bg(food.picture)"></div>

                <div class="content">
                  <h3 class="f-name">{{food.name}}</h3>
                  <p class="f-desc" v-if="food.description">{{food.description}}</p>
                  <div class="extra">
                    <span class="sale">{{food.month_saled_content}}</span>
                    <span class="praise">{{food.praise_content}}</span>
                  </div>
                  <img class="product" :src="food.product_label_picture">
                  <p class="f-price">
                    <span class="f-text">￥{{food.min_price}}</span>
                    <span class="f-unit">/{{food.unit}}</span>
                  </p>
                </div>

                <div class="cartcontrol-wrapper">
                  <Cartcontrol :food="food"></Cartcontrol>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!--购物车-->
      <Shopcart :poiInfo="poiInfo" :selectFoods="selectFoods"></Shopcart>
      <!--菜品详情-->
      <Food :food="selectedFood" ref="foodView"></Food>
    </div>
</template>

<script>
    //导入BScroll
    import BScroll from "better-scroll"
    //导入Shopcart
    import Shopcart from "components/Shopcart/Shopcart"
    //导入Cartcontrol
    import Cartcontrol from "components/Cartcontrol/Cartcontrol"
    //导入Food组件
    import Food from "components/food/Food"
    export default {
      name: "goods",
      data() {
        return {
          container:{},
          goods: [],
          poiInfo: {},
          listHeight:[],
          scrollY: 0,
          menuScroll: {},
          foodScroll: {},
          selectedFood: {}
        }
      },
      created() {
        //发起异步请求，获取数据
        //通过axios发起文件请求
        var that = this;
        this.$axios.get('/api/goods')
          .then(function (response) {
            //获取到数据后的操作
            //console.log(response);
            var dataSource = response.data;
            if(dataSource.code == 0) {
              that.container = dataSource.data.container_operation_source;
              that.goods = dataSource.data.food_spu_tags;
              that.poiInfo = dataSource.data.poi_info;
              //调用滚动的初始化方法
              //that.initScroll();
              //开始时，DOM元素没有渲染，高度存在问题
              //在获取到数据后，并且dom已经被渲染，表示列表高度是没问题的

              //nextTick
              that.$nextTick( ()=> {
                //dom已经更新
                that.initScroll();
                //计算分类区间高度
                that.calculateHeight();
              });
              //console.log(that.container);
              //console.log(that.goods);
            }
          })
          .catch(function (error) {
            //错误处理
            console.log(error);
          });
      },
      methods: {
        head_bg(imgName) {
          return "background-image: url("+ imgName +")"
        },
        //滚动的初始化
        initScroll() {
          //ref属性用来绑定某个DOM元素或某个组件，然后在this.$refs里面
          this.menuScroll = new BScroll(this.$refs.menuScroll,{click:true});
          this.foodScroll = new BScroll(this.$refs.foodScroll, {probeType: 3, click: true});

          //添加滚动监听事件
          this.foodScroll.on('scroll', (pos) => {
            //console.log(pos.y);
            this.scrollY = Math.abs(Math.round(pos.y));

          });
        },
        calculateHeight() {
          //通过$refs获取到对应的元素
          let foodlist = this.$refs.foodScroll.getElementsByClassName('food-list-hook');
          //添加到数组区间
          //第一个区间（专场）
          //第二个区间（热销）， 第一个区间高度+1 - 第二个区间高度加第一个区间高度
          let height = 0;
          this.listHeight.push(height);
          for(let i=0; i<foodlist.length;i++) {
            let item = foodlist[i];

            //累加
            height += item.clientHeight;
            this.listHeight.push(height);
          }
        },
        selectMenu(index){
          //console.log(index);
          let foodlist = this.$refs.foodScroll.getElementsByClassName('food-list-hook');
          //根据下标，滚动到相应元素的位置
          let el = foodlist[index];
          this.foodScroll.scrollToElement(el,250);
        },
        calculateCount(spus) {
          let count = 0;
          spus.forEach((food)=>{
            if(food.count>0) {
              count += food.count;
            }
          });
          return count;
        },
        showDetail(food) {
          //传值
          this.selectedFood = food;
          //显示详情页
          this.$refs.foodView.showView();
        }
      },
      computed: {
        currentIndex() {
          //根据右侧滚动位置确定对应的索引下标
          for(let i=0; i<this.listHeight.length; i++){
            //获取商品区间的范围
            let height1 = this.listHeight[i];
            let height2 = this.listHeight[i+1];
            //是否在上述区间中
            if(this.scrollY >= height1 && this.scrollY<height2){
              //console.log(i);
              return i;
            }
          }
          return 0;
        },
        selectFoods() {
          let foods = [];
          this.goods.forEach((good)=>{
            good.spus.forEach((food)=>{
              if(food.count>0) {
                foods.push(food);
              }
            })
          });
          return foods;
        },
      },
      components: {
        BScroll,
        Shopcart,
        Cartcontrol,
        Food
      }
      // computed: {//计算属性
      //   //不能传递参数
      //   head_bg() {
      //     return
      //   }
      // }
    }
</script>

<style scoped>
  @import "demo.css";
  @import url("../../../static/CSS/reset.css");
</style>
