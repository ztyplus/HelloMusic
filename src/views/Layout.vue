<template>
    <button v-if="route.name !== 'playlist' && route.name !== 'mv'" @click="router.push({ name: 'playlist' })" class="btn menu"><Svg name="icon-houtaishangpinguanli" size="25px" /></button>
    <button v-if="route.name === 'playlist' || route.name === 'mv'" @click="router.push({ name: 'home' })" class="btn menu"><Svg name="icon-home" size="25px" /></button>
    <button @click="clearStorage" class="btn fresh"><Svg name="icon-shuaxin" size="25px" /></button>

    <RouteView  />
    <RouteView name="container" />
    <RouteView name="bottom" />

</template>

<script setup>
import RouteView from "./RouteView.vue"
import Svg from "../components/Svg.vue"
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const clearStorage = () => {
  localStorage.clear();
  location.reload()
}

</script>

<style lang="less" scoped>

.btn {
  background: none;
  display: inline-block;
  border: none;
  border-radius: 5px;
  padding: 4px;
  cursor: pointer;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  &:hover svg{
    color: #fff!important;
  }
}

.btn {
  position: absolute;
}
.fresh {
  top: 12px;
  right: 12px;
}
.menu {
  top: 12px;
  left: 12px;
}

.song-name {
  font-size: 1.3rem;
}

</style>

