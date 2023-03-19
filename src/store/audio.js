import { reactive, inject } from "vue";
import Helper from "../utils/helper";

const key = Symbol();
const audio = Helper.get.storage("playinfo", "audio");

export function provideStore(app) {
  const state = reactive({
    canPlay: false,
    isPlaying: false,
    duration: 0,
    lyric: null,
    currentTime: 0,
    changeTime: 0,
    volume: 0.5,
    storage: false,
    play_type: 0,
  });

  if (audio != "expire" && audio != false) {
    state.volume = audio.volume;
    state.duration = audio.duration;
    state.currentTime = audio.currentTime;
    state.changeTime = audio.currentTime;
    state.lyric = audio.lyric;
    state.storage = true;
    state.play_type = audio.play_type;
  }

  app.provide(key, {
    state,
  });
}

export function useStore(defaultValue = null) {
  return inject(key, defaultValue).state;
}
