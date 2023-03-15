<template>
  <div v-if="state" v-loading="state.curSong.name === null" class="container">
    <Svg icon="houtaishangpinguanli" size="25px" />
    <div class="card-top text-center">
      <SongDisc :imgUrl="state.curSong.pic_url" :isLoading="state.isLoading" />
      <div class="flex-center pt-1 ">
        <h3 class="white-color song-name">{{ state.curSong.name }}</h3>
        <span class="white-color">&nbsp;</span>
        <p class="singer"><span v-for="(item,index) in state.curSong.artist" :key="index">{{ item }}&nbsp;&nbsp;</span> </p>
      </div>
    </div>
    <div class="flex-center">
      <Control />
    </div>
    <div class="main-bg transform" :style="{'background-image': 'url('+(state.curSong.pic_url ? state.curSong.pic_url : '')+')'}" :class="state.isLoading ? 'hide' : 'show'">
      <img @load="stopLoading" :src="state.curSong.pic_url">
    </div>
  </div>
  <BackStyle />
</template>

<script setup>
import initMusic from "./api/initMusic"
import BackStyle from "./components/BackStyle.vue"
import SongDisc from "./components/SongDisc.vue"
import Control from "./components/Control.vue"
import Svg from "./components/Svg.vue"
import { reactive } from "vue";
  const state = reactive({
    musit_list:[],
    curSong: {
      name: null,
      artist: [],
      pic_url: null
    },
    playInfo: null,
    isLoading: true,
    backTtyle: null
  })

    const stopLoading = () => {
      state.isLoading = false
    }

    initMusic(state).initData();
    
</script>

<style lang="less">
@import "./assets/css/style.less";
body {
  background-attachment: fixed;
  background-size: cover;
  height: 100vh;
}
#app {
  .flex-center();
  .wh-100();
}
.icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
.loadbox {
  .wh-100();
  position: absolute;
  top: 0;
  left: 0;
  background: rgb(255 255 255 / 70%);
  z-index: 90;
}

.main-bg {
  .mainbg();
  img {
    display: none;
  }
}
.card-top {
  padding-top: 15px;
}

.container {
  .br();
  .blur-bg();
  position: relative;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  width: 95%;
  max-width: 1000px;
  height: 700px;
  max-height: 90%;
  overflow: hidden;
  padding: 1rem;
  z-index: 10;
}

.singer {
  font-size: 14px;
  color: #eee;
  span {
    vertical-align: -2px;
  }
}
</style>

