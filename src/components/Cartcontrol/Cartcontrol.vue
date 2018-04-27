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
  @import "Cartcontrol.css";
</style>
