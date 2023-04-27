<template>
  <div v-loading="music.state.curSong.name === null" class="container">
    <Layout v-if="music.state.curSong.name !== null" />
    <div
      class="main-bg transform"
      :style="{
        'background-image':
          'url(' +
          (music.state.curSong.pic_url ? music.state.curSong.pic_url : '') +
          ')',
      }"
      :class="music.state.isLoading ? 'hide' : 'show'"
    >
      <img @load="stopLoading" :src="music.state.curSong.pic_url" />
    </div>
  </div>
  <Audio />
  <BackStyle />
  <button class="bgstyle" @click="changeTheme"></button>
</template>

<script setup>
import Audio from "./components/Audio.vue";
import BackStyle from "./components/BackStyle.vue";
import Layout from "./views/Layout.vue";
import { useStore } from "./store/music";
import initMusic from "./api/initMusic";
import { changeTheme } from "./store/theme";

let music = useStore();
initMusic(music).initData();

const stopLoading = () => {
  music.state.isLoading = false;
};
</script>

<style lang="less">
body {
  background-attachment: fixed;
  background-size: cover;
  height: 100vh;
}
#app {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.bgstyle {
  z-index: 10;
  right: 20px;
  bottom: 20px;
  position: absolute;
  background: none;
  cursor: pointer;
  border: none;
  z-index: 99;
  height: 50px;
  width: 50px;
  background-image: url("./assets/images/windmill.svg");
}

.container {
  border-radius: 10px;
  backdrop-filter: blur(8px) saturate(150%);
  -webkit-backdrop-filter: blur(8px) saturate(150%);
  background-color: rgba(255, 255, 255, 0.25);
  position: relative;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  width: 95%;
  max-width: 1000px;
  height: 700px;
  max-height: 90%;
  overflow: hidden;
  padding: 1rem;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.main-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  inset: 0px;
  filter: blur(5px);
  opacity: 0.2 !important;
  img {
    display: none;
  }
}
.loadbox {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 90;
}
</style>
