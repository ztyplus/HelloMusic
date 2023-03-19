<template>
  <div class="list-box wh-100">
    <div class="wrapper">
      <div v-for="(item,index) in state.playList" :key="item.id" class="card pr" @click="changeList(index)">
        <div class="card-bg" :style="{'background-image': `url(${item.cover_url})`}"></div>
        <div class="overlay"></div>
        <div class="cover">
          <img :src="item.cover_url" :alt="item.name">
        </div>
        <div class="album-info">
          <div>
            <h3 class="h-2x">{{ item.name }}</h3>
          <span class="author">「{{ item.creator.nickname }}」</span>
          </div>
          <p class="desc h-3x">
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Helper from '../utils/helper';
import { reactive } from 'vue';
import  { useStore as musicStore } from "../store/music"
import  { useStore as audioStore } from "../store/audio"
import { GET } from "../utils/http"

const music = musicStore()
const audio = audioStore()
const state = reactive({
  playList: [],
})
const storageList = Helper.get.storage("musicList","playlist")

state.playList.push(...Object.values(storageList))

const changeList = (index) => {
  music.state.song_index = 0;
  music.state.list_index = index;
  music.state.current_list = state.playList[index].song_list;
  Helper.set.storage("musicIndex", { list: index, song: 0 });
  const song = state.playList[index].song_list[0]
  music.state.curSong = song
  getSong(song.id, song.source)
}

const getSong = (id, server) => {
    GET("music/song", {
      id, server,
    }).then((res) => {
      if (res.code === 200) {
        audio.lyric = null
        music.state.curSong = res.data;
        GET("music/url", { id, server }).then((res) => {
          if (res.code === 200) {
            music.state.play_info = res.data;
          }
        });
      }
    });
  };

</script>

<style lang="less" scoped>
.list-box {
  padding: 35px 0 0;
  // z-index: 9;
  .wrapper {
    height: 100%;
    text-align: center;
    overflow-y: auto;
    display: grid;
    grid-template-columns: 50% 50%;
    .card {
      margin: 5px;
      display: flex;
      align-items: center;
      text-align: center;
      padding: 10px 20px;
      color: #fff;
      border-radius: 8px;
      height: 150px;
      overflow: hidden;
      cursor: pointer;
      .card-bg {
        z-index: -1;
        position: absolute;
        inset: 0;
        background-size: 30000%;
        background-position: center;
        background-repeat: no-repeat;
        filter: brightness(1.2);
      }
      .overlay {
        position: absolute;
        top: 0px;
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.2) 15%, rgba(255, 255, 255, 0) 100%);
        left: 0px;
        width: 100%;
        height: 100%;
        z-index: -1;
      }
      img {
        width: 100px;
        height: 100px;
        border-radius: 5px;
        box-shadow: 0px 0px 10px 5px rgb(200 198 198 / 20%), 0px 0px 0px 1px rgb(255 255 255 / 30%);
      }
      .album-info {
        padding: 10px;
        width: 100%;
        height: 100%;
        display: flex;
        flex-shrink: 1;
        text-shadow: rgba(0, 0, 0, 0.2) 0px 0px 5px;
        text-align: left;
        flex-direction: column;
        justify-content: space-evenly;
        h3 {
          font-size: 1.1rem;
          font-weight: bold;
          color: #f67777;
          mix-blend-mode: difference;
        }
        .author {
          color: #fff;
          font-size: .875rem;
          font-weight: bold;
        }
        .desc {
          width: 100%;
          border-top: 1px solid rgba(255, 255, 255, 0.45);
          padding-top: 5px;
          margin-top: 5px;
          font-size: 12px;
        }
      }
    }
  }
}

@media(max-width: 768px) {
  .wrapper {
    grid-template-columns: 100%!important;
    .card {
      padding: 5px 10px!important;
      // height: 120px!important;
      img {
        display: none;
        width: 70px!important;
        height: 70px!important;
      }
    }
  }
}
</style>