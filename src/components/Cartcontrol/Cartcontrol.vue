<template>
  <div class="cartcontrol">
    <!--transition 这里写的是name不是class-->
    <transition name="move">
      <div class="cart-decrease" @click="decreaseCart" v-show="food.count>0">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-increase icon-add_circle" @click="increaseCart">
      <i class="bg"></i>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: "Cartcontrol",
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      decreaseCart() {
        this.food.count--;
      },
      increaseCart() {
        if (!this.food.count) {
          Vue.set(this.food,'count',1);
        } else {
          this.food.count++;
        }
      }
    }
  }
</script>

<style scoped>
  @import "../../common/styles/icon.css";
  .cartcontrol {
    display: flex;
    align-items: center;
  }
  .cart-decrease {
    width: 26px;
    height: 26px;
    font-size: 26px;
    color: #b4b4b4;
  }
  .cart-count {
    display: inline-flex;
    font-size: 12px;
    width: 26px;
    line-height: 26px;
    justify-content: center;
  }
  .cart-increase {
    position: relative;
    width: 26px;
    height: 26px;
    font-size: 26px;
    color: #ffd161;
  }
  .bg {
    display: inline-block;
    position: absolute;
    left: 3px;
    top: 3px;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    background: #000;
    z-index: -1;
  }
  .move-enter-active,
  .move-leave-active {
    transition: 0.5s all linear;
  }
  .move-enter,
  .move-leave-to {
    transform: translateX(20px) rotate(180deg);
  }

</style>
