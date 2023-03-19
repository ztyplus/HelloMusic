<template>
  <div class="ctrl-box pt-3 w-100">

    <div class="ctrl-item pt-1 flex-sb">
      <div class="loop">
        <button @click="audio.play_type = 1" v-if="audio.play_type === 0"><Svg name="icon-xunhuanbofang" size="20px" /></button>
        <button @click="audio.play_type = 2" v-if="audio.play_type === 1"><Svg name="icon-suijibofang" size="20px" /></button>
        <button @click="audio.play_type = 0" v-if="audio.play_type === 2"><Svg name="icon-danquxunhuan" size="20px" /></button>
      </div>
      <div class="pb-1 flex-center">
        <button class="mx-1" @click="swMusic(-1)"><Svg name="icon-shangyiqu" color="#fff" size="25px" /></button>
        <button v-show="!audio.canPlay" style="cursor:not-allowed" class="mx-1"><Svg name="icon-stop-circle" color="#fff" size="40px" /></button>
        <button v-show="audio.canPlay && !audio.isPlaying"  @click="playMusic" class="mx-1"><Svg name="icon-start" color="#fff" size="40px" /></button>
        <button v-show="audio.isPlaying"  @click="audio.isPlaying = false" class="mx-1"><Svg name="icon-pause-circle" color="#fff" size="40px" /></button>
        <button class="mx-1" @click="swMusic(1)"><Svg name="icon-xiayiqu" color="#fff" size="25px" /></button>
      </div>
      <div class="voice pr">
        <button v-if="audio.volume > 0">
          <Svg name="icon-shengyin" size="20px" />
        </button>
        <button v-if="audio.volume === 0"><Svg name="icon-jingyin" size="20px" /></button>
        <vue-slider
            class="volume-bar transform"
            direction="btt"
            v-model="audio.volume"
            :duration="0.1"
            :interval="0.05"
            :min="0"
            :max="1"
            tooltip="none"
            :dotSize="8"
            :railStyle="{'width': '3px'}"
            :processStyle="{'background': theme.state.color}"
            :dotStyle="{'border-color': theme.state.color}"
          ></vue-slider>
      </div>
    </div>

    <div class="progress flex-center">
      <span>{{ toTime(audio.currentTime) }}</span>
      <vue-slider class="pg-bar"
      v-model="audio.currentTime"
      :min="0"
      :max="audio.duration ? audio.duration : 1"
      width="100%"
      @change="handleChange"
      :duration="0.2"
      tooltip="none"
      :railStyle="theme.state.railStyle"
      :processStyle="{'background': theme.state.color}"
      :dotStyle="{'border-color': theme.state.color}"
      ></vue-slider>
      <span>{{ toTime(audio.duration) }}</span>
    </div>

  </div>

  <div class="bottom">
      <div class="route-btn">
        <div>
          <button @click="router.push({ name: 'home' })"><Svg name="icon-bofangliebiao" size="20px"/></button>
          <button v-if='music.state.curSong.mv_id !== "" && music.state.curSong.mv_id !== "0"' @click="playMV"><Svg name="icon-icon_video" size="20px"/></button>
        </div>
        <div>
          <button @click="router.push({ name: 'comment' })"><Svg name="icon-pinglun" size="18px"/></button>
          <button @click="router.push({ name: 'hotcomment' })"><Svg name="icon-huo" size="20px"/></button>
        </div>
      </div>
    </div>

</template>

<script setup>

  import VueSlider from 'vue-slider-component'
  import Svg from "./Svg.vue"
  import { useStore as themeStore } from "../store/theme"
  import { useStore as audioStore } from "../store/audio"
  import { useStore as musicStore } from "../store/music"
  import changeSong from '../api/changeSong'
  import { useRouter } from "vue-router";


  const router = useRouter();
  const theme = themeStore()
  const audio = audioStore()
  const music = musicStore()


  const toTime = (sec) => { 
    sec = Math.floor(sec)
    let s = sec % 60 < 10 ? ('0' + sec % 60) : sec % 60
    let min = Math.floor(sec / 60) < 10 ? ('0' + Math.floor(sec / 60)) : Math.floor(sec / 60)
    return min + ':' + s
  }

  const handleChange = (value) => {
    if(audio.canPlay){
      audio.changeTime = value
      audio.isPlaying = true
    }
  }


  const playMusic = () => {
    audio.isPlaying = true;
  }

  const playMV = () => {
    audio.isPlaying = false;
    router.push({ name: 'mv', query: {id: music.state.curSong.mv_id, source: music.state.curSong.source}})
  }

  const swMusic = (e) => {
    const list_length = music.state.current_list.length;
    let index = music.state.song_index + e;
    if(index === list_length){
      index = 0;
    }else if(index === -1) {
      index = list_length - 1;
    }
    music.state.song_index = index;
    changeSong(music.state.current_list[index], audio, music.state,music.state.list_index,index);
  }

</script>

<style lang="less" scopd>
@import "../assets/css/slider.css";
.ctrl-box {
  margin: 0 auto;
  padding: 20px 0 0;
  max-width: 80%;
  .pg-bar {
    margin: 0 1rem;
    cursor: pointer;
  }
  span {
    color: #fff;
  }
}


.bottom {
  margin-top: 1rem;
  overflow: hidden;
  display: flex;
  border-top: 1px solid rgba(255, 255, 255, 0.25);
  flex-direction: column;
  justify-content: space-between;
}
.route-btn {
  flex-shrink: 0;
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
}
.ctrl-item {
  button {
  background: none;
  display: inline-block;
  border: none;
  border-radius: 5px;
  padding: 4px;
  cursor: pointer;
  &:hover {
    background: bgstyle;
  }
  &:hover svg{
    color: #fff!important;
  }
}
}


.vue-slider-dot-handle-focus {
  box-shadow: none !important;
}
@media(max-width: 768px) {
  .ctrl-box {
    margin: 20px auto;
    padding: 0;
    max-width: 100%;
}
}

button {
  background: none;
  cursor: pointer;
  border: none;
  z-index: 99;
  padding: 5px;
}
.volume-bar {
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  padding: 0!important;
  position: absolute;
  bottom: 32px;
  left: 50%;
  width: 3px!important;
  transform: translateX(-50%);
  height: 40px!important;
  display: inline-block;
}
.voice:hover .volume-bar{
  opacity: 1;
  visibility: visible;
}
.loop,.voice {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

</style>