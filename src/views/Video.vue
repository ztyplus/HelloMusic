<template>
  <video controls :src="state.url"></video>

</template>

<script setup>
import { useRoute } from "vue-router"
import { reactive } from "vue";
import getMV from "../api/getMV"

const route = useRoute();
const query = route.query
const state = reactive({
  url: null,
})

const initMV = (id, source) => {
  getMV(id, source).then( res => {
    if(res.code === 200) {
      state.url = res.data.url[res.data.url.length - 1]
    }
  })
}

initMV(query.id, query.source)

</script>

<style>
video {
  width: 100%;
  aspect-ratio: 16/9;
}
</style>