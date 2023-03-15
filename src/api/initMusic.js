import { GET } from "../utils/http";
import Helper from "../utils/helper";
import playlist from "../../public/music.json";

export default function initMusic(state) {
  const sessionMusic = Helper.get.session("musicList", "playlist");
  const curMusic = Helper.get.storage("curMusic");

  const initData = () => {
    if (sessionMusic != "expire" && sessionMusic != false) {
      state.musit_list = Object.values(sessionMusic);
      initSong();
    } else {
      getMusic();
    }
  };

  const getMusic = () => {
    let promise_array = [];
    playlist["play_list"].forEach((el) => {
      promise_array.push(
        GET("music/playlist", { id: el.id, server: el.type }).then((res) => {
          if (res.code === 200) {
            state.musit_list.push(res.data);
          }
        })
      );
    });
    Promise.allSettled(promise_array).then(() => {
      Helper.set.session("musicList", "playlist", state.musit_list);
      // Helper.set.storage("musicList", "playlist", { time: 7200 });
      initSong();
    });
  };

  const getList = (id, type) => {
    GET("music/playlist", { id, server: type }).then((res) => {
      if (res.code === 200) {
        state.musit_list.push(res.data);
      }
    });
  };

  const getSong = () => {
    const listIndex = Helper.get.random.num(0, state.musit_list.length - 1);
    const songLength = state.musit_list[listIndex].song_list.length;
    const songIndex = Helper.get.random.num(0, songLength - 1);
    let defaultSong = state.musit_list[listIndex]["song_list"][songIndex];

    GET("music/song", { id: defaultSong.id, server: defaultSong.source }).then(
      (res) => {
        if (res.code === 200) {
          state.curSong = res.data;
          // Helper.set.storage("curMusic", res.data);
        }
      }
    );
  };

  const getPlayUrl = (id, type) => {
    GET("music/url", { id, server: type }).then((res) => {
      if (res.code === 200) {
        state.playInfo = res.data;
      }
    });
  };

  const initSong = () => {
    if (curMusic != "expire" && curMusic != false) {
      state.curSong = curMusic;
    } else {
      getSong();
    }
    // getPlayUrl(id, type);
  };

  const getRandom = (min, max) => {
    return Math.floor(Math.random() * max + min);
  };

  return {
    initData,
  };
}
