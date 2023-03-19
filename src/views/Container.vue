<template>
    <div class="text-center pt-2">
      <div class="flex-center pb-2">
        <h3 class="white-color song-name">{{ music.state.curSong.name }}</h3>
        <span class="white-color">&nbsp;</span>
        <p class="singer">
          <span v-for="(item,index) in music.state.curSong.artist" :key="index">
            <cite v-if="index === 0">[</cite>
            <cite>&nbsp;{{ item }}&nbsp;</cite>
            <cite v-if="index === music.state.curSong.artist.length - 1">]</cite>
          </span>
        </p>
      </div>
      <SongDisc :imgUrl="music.state.curSong.pic_url" :isLoading="music.state.isLoading" />
    </div>
    <div><Control /></div>

</template>

<script setup>
import SongDisc from "../components/SongDisc.vue"
import Control from "../components/Control.vue"
import { useStore } from "../store/music"

let music = useStore()
</script>

<style lang="less" scoped>
.routview {
  height: 100%;
}

.singer {
  font-size: 14px;
  color: rgb(238 238 238 / 60%);
  span {
    vertical-align: -2px;
  }
}
</style>