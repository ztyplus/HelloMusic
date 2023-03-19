<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="'#' + props.name"></use>
  </svg>
</template>
<script setup>
const props = defineProps({
  name: {
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