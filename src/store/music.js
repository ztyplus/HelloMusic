import { reactive, inject } from "vue";

const key = Symbol();

export function provideStore(app) {
  const state = reactive({
    curSong: {
      name: null,
      pic_url: null,
      artist: [],
    },
    isLoading: true,
    current_list: [],
    play_info: null,
    song_index: null,
    list_index: null,
  });

  app.provide(key, {
    state,
  });
}

export function useStore(defaultValue = null) {
  return inject(key, defaultValue);
}
