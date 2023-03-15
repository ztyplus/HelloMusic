<template>
  <div class="body-bg">
    <div>{{ style }}</div>
    <button>
      <Svg icon="fengche" size="30px" />
    </button>
  </div>
</template>

<script setup>
import Svg from "../components/Svg.vue"
const props = defineProps({
  style: {
    type: Object
  }
})

</script>

<style scoped>
.body-bg {
  background-image: url("../assets/images/background/bg2.svg"); 
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
}
button {
  right: 20px;
  bottom: 20px;
  position: absolute;
  background: none;
  cursor: pointer;
  border: none;
  z-index: 99;
}
</style>