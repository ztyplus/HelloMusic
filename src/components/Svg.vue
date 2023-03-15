<template>
  <!-- <svg class="icon" aria-hidden="true" :style="{'color': 'rgb(255 246 246 / 68%)','font-size': '25px'}">
    <use :xlink:href="'#icon-houtaishangpinguanli'"></use>
  </svg> -->
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="'#icon-' + props.icon"></use>
  </svg>
</template>
<script setup>
const props = defineProps({
  icon: {
    type: String,
    require: true
  },
  color: {
    type: String,
    default: 'rgb(255 246 246 / 70%)'
  },
  size: {
    type: String,
    default: '16px'
  }
})
</script>

<style scoped>
svg {
  color: v-bind('props.color');
  font-size: v-bind('props.size');
}
</style>