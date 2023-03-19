<template>
  <div class="body-bg" :style="{'background-image': theme.state.background}"></div>
  <div class="overlay"></div>
</template>

<script setup>
import { useStore } from "../store/theme"

let theme = useStore()
</script>

<style lang="less" scoped>
.body-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
  position: fixed;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}
.overlay {
  position: fixed;
  top: 0px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.4) 15%, rgba(255, 255, 255, 0) 100%);
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 9;
}

</style>