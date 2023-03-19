<template>
  <div class="text-center lyric wh-100">
    <ul v-if="lyricData.length > 0" class="transform" :style="{'transform': `translateY(-${(lrcIndex - 2) * 30}px)`}">
      <li class="transform h-1x" v-for="( item,index ) in lyricData" :key="index" :class="{'on': lrcIndex === index}">
        {{ item.words }}
      </li>
    </ul>
    <div v-if="!hasLrc" class="flex-center nolrc wh-100">当前歌曲暂无歌词</div>
  </div>
  
</template>

<script setup>
import getLyric from "../api/getLyric";
import { useStore as themeStore } from "../store/theme"
import { useStore as musicStore } from "../store/music"
import { useStore as audioStore } from "../store/audio"
import { ref, watchEffect } from "vue"

let hasLrc = ref(true)
let lyricData = ref([])
let lrcIndex = ref(0)
let theme = themeStore()
let music = musicStore()
let audio = audioStore()

const initLyric = ()=>{
  if(audio.lyric === null) {
    getLyric(music.state.curSong.id, music.state.curSong.source).then(res=>{
      if(res.code === 200) {
        let lyric = res.data.lyric.split("\n").filter(s=>s).map(s => {
          const parts = s.split(']')
          const timeParts = parts[0].replace('[', '').split(":");
          return {
            time: +timeParts[0] * 60 + +timeParts[1],
            words: parts[1]
          }
        }).filter(item => {
          if(item.time >= 0 && item.words !== '') return item
        })
        if(lyric.length === 0) {
          hasLrc.value = false
        }
        audio.lyric = lyric
        lyricData.value = lyric
      }
    })
  }else{
    if(audio.lyric.length === 0) {
      hasLrc.value = false
    }
    lyricData.value = audio.lyric
  }
}

initLyric();

watchEffect(()=>{
  lrcIndex.value = lyricData.value.findIndex(lrc => lrc.time > audio.currentTime + 0.6) - 1;
})

watchEffect(()=>{
  if(music.state.curSong){
    initLyric();
  }
})

</script>

<style lang="less">

.lyric {
  color: rgb(255 255 255 / 80%);
  overflow: hidden;
  font-size: .875rem;
  li {
    height: 30px;
    line-height: 30px;
    font-size: .9rem;
  }
  .on {
    color: v-bind("theme.state.color");
    // transform: scale(1.1);
    font-size: 1rem;
    font-weight: 600;
  }
}
.nolrc {
  color: hsla(0, 0%, 100%, 0.5);
  font-size: 1.5rem;
}

</style>