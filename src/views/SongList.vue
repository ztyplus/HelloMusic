<template>
  
  <ul ref="songListRef" class="h-100" v-if="music.state.current_list" >
    <li class="flex-sb" v-for="(song,index) in music.state.current_list" :key="song.id" :class="{'on': music.state.curSong.id === song.id}" @click="playSong(index)">
      <div class="flex mr-1">
        <img :src="song.pic_url" :alt="song.name">
        <span class="ml-1 name">{{ song.name }}</span>
      </div>
      <div class="artist">
        <span v-for="(author,index) in song.artist" :key="index">{{ author }}</span>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { ref, watchEffect } from "vue"
import { useStore as themeStore} from "../store/theme"
import { useStore as musicStore } from "../store/music";
import { useStore as audioStore } from "../store/audio";
import changeSong from "../api/changeSong"

const music = musicStore();
const audio = audioStore();
const theme = themeStore();

const songListRef = ref(null)

const playSong = (index)=>{
  music.state.song_index = index
  changeSong(music.state.current_list[index], audio, music.state,music.state.list_index,index)
}

watchEffect(()=>{
  if(songListRef.value){
    const ul = songListRef.value;
    const li = ul.querySelectorAll('li')[music.state.song_index];
    const liOffsetTop = li.offsetTop;
    const clientHeight = ul.clientHeight;
    const scrollDistance = liOffsetTop - clientHeight / 2 - ul.offsetTop + 40;
    ul.scrollTo({
      top: scrollDistance,
      behavior: 'smooth'
    });
  }
})


</script>

<style lang="less" scoped>
ul {
  padding-right: 5px;
  height: calc(100% - 40px);
  margin-top: 5px;
  list-style: none;
  overflow: auto;
  li {
    margin-bottom: 5px;
    padding: 5px;
    background-color: rgb(255 255 255 / 10%);
    color: rgb(255, 255, 255);
    border-radius: 5px;
    cursor: pointer;
    overflow: hidden;
    &:hover .on .name{
      color: v-bind("theme.state.color")!important;
    }
    &:hover {
      font-weight: bold;
      color: #fff;
    }

    .artist {
      overflow-x: auto;
    font-size: 0.875rem;
    color: rgba(238, 238, 238, 0.7);
    display: flex;
      span {
        display: inline-block;
        line-height: 30px;
        height: 30px;
        white-space: nowrap;
        margin: 0 2px;
      }
    }
    img {
      width: 30px;
      height: 30px;
      border-radius: 5px;
    }
    .name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }

  .on .name{
    font-weight: bold;
    color: v-bind("theme.state.color")!important;
  }
}

</style>