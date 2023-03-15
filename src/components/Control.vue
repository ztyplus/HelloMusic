<template>
  <div v-if="state" class=" flex-center ctrl-box w-100">
    <span>00.00</span>
    <!-- <input class="pg-bar w-100" type="range"> -->
    <vue-slider class="pg-bar"
    v-model="state.progress"
    width="100%"
    :min="0"
    :max="state.duration"
    :duration="0.2"
    tooltip="always"
    :railStyle="state.railStyle"
    :processStyle="state.processStyle"
    :dotStyle="state.dotStyle"
    ></vue-slider>
    <span>{{state.progress}}</span>
  </div>
</template>

<script setup>
import VueSlider from 'vue-slider-component'
import { reactive } from "vue";
  const state = reactive({
    progress: 12,
    duration: 100,
    processStyle: {
      background: "red",
    },
    dotStyle: {
      "border-color": "red",
    }
  })

</script>

<style lang="less">
@import "../assets/css/slider.css";
.ctrl-box {
  padding: 40px 0 0;
  max-width: 80%;
  .pg-bar {
    margin: 0 1rem;
    cursor: pointer;
  }
  span {
    color: #fff;
  }
}



</style>