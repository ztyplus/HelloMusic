<template>
  <div class="image-loader-container">
    <img v-if="!everythingDone && placeholder !== null" class="placeholder" :src="placeholder" alt="" />
    <img
      @load="handleLoad"
      :src="src"
      alt=""
      :style="{ opacity: originOpacity, transition: `${duration}ms` }"
    />
  </div>
</template>

<script setup>
import lazyImg from "../assets/images/lazyimg.svg"
import { ref, computed } from "vue"

const props = defineProps({
  src: {
    required: true,
  },
  placeholder: {
    type: String,
    default: lazyImg,
  },
  duration: {
    type: Number,
    default: 500,
  },
})

const emit = defineEmits(['load'])

const originLoaded = ref(false);
const everythingDone = ref(false)

const originOpacity = computed(() => {
  return originLoaded.value ? 1 : 0;
})

const handleLoad = () => {
  originLoaded.value = true;
  setTimeout(() => {
    everythingDone.value = true;
    emit("load");
  }, props.duration);
}
</script>

<style scoped lang="less">
@import "../assets/style.less";
.image-loader-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  img {
    .self-fill();
    object-fit: cover;
  }

  .placeholder {
    // filter: blur(2vw);
    object-fit: cover;
  }
}
</style>
