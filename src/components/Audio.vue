<template>
  <div>
    <audio 
    ref="audioRef"
    v-if="music.state.play_info !== null "
    :src="music.state.play_info.url"
    :volume="audio.volume"
    @canplay="setCanplay"
    @loadeddata="loadeddata"
    @timeupdate="timeUpdate"
    @ended="endPlay"
    @volumechange="debounce_setStorageMusic"
    @error="errEvent"
    >
    </audio>
  </div>
  <Message ref="message" />
</template>

<script setup>
import { watchEffect, ref } from "vue";
import { useStore as useAudio } from "../store/audio";
import { useStore as useMusic} from "../store/music";
import debounce from "../utils/debounce"
import Helper from "../utils/helper";
import changeSong from '../api/changeSong'
import Message from "../components/Message.vue"

const audio = useAudio();
const music = useMusic();
const audioRef = ref(null);
const message = ref(null);

const loadeddata = () => {
  if(audioRef.value && !audio.canPlay){
    audio.canPlay = true
    audio.duration = Math.floor(audioRef.value.duration)
  }
}

const timeUpdate = ()=> {
  audioRef.value && (audio.currentTime = Math.floor(audioRef.value.currentTime))
}

const debunce_changesong = debounce(()=>{
  message.value.addMessage('获取播放地址失败,自动切换下一曲！', 'error');
  changeSong(music.state.current_list[ music.state.song_index], audio, music.state, music.state.list_index,music.state.song_index);
},1000
)

const errEvent = ()=> {
  music.state.song_index += 1
  audio.canPlay = false
  const list_length = music.state.current_list.length
  if(music.state.song_index >= list_length) {
    music.state.song_index = 0;
  }
  debunce_changesong();
}

const setCanplay = ()=> {
  if(audio.isPlaying && music.state.play_info !== null) {
    audioRef.value.play();
    setStorageMusic();
  }
  audioRef.value && (audio.canPlay = true)
}

const endPlay = ()=> {
  audio.isPlaying = false
  const list_length = music.state.current_list.length
  const list_index = music.state.list_index
  if(audio.play_type === 0){
    let song_index = music.state.song_index + 1
    if(list_length === song_index) {
      song_index = 0;
    }
    changeSong(music.state.current_list[ song_index], audio, music.state, list_index,song_index)
  }else if(audio.play_type === 1){
    let song_index = Helper.get.random.num(0, list_length - 1);
    changeSong(music.state.current_list[ song_index], audio, music.state, list_index,song_index)
  }else{
    audio.changeTime = 0
    audio.isPlaying = true
  }

  setStorageMusic();
}
const setStorageMusic = ()=> {
  Helper.set.storage("playinfo", {
    curSong: music.state.curSong,
    audio: audio
  })
}

const debounce_setStorageMusic = debounce(()=>{
  setStorageMusic();
},2000)

watchEffect(()=>{
  if(audio.isPlaying && audio.canPlay) {
    audioRef.value && audioRef.value.play();
  }else{
    if(audioRef.value && audio.canPlay) {
      audioRef.value.pause();
    } 
  }
})

watchEffect(()=>{
  if(audio.canPlay){
    audioRef.value && (audioRef.value.currentTime = audio.changeTime);
  }
})

watchEffect(()=>{
  if(audio.currentTime % 10 === 0 || audio.changeTime){
    debounce_setStorageMusic()
  }
})


</script>