import { GET } from "../utils/http";
import Helper from "../utils/helper";
import playlist from "../../public/music.json";

export default function initMusic(music) {
  const storageMusic = Helper.get.storage("musicList", "playlist");
  const curSong = Helper.get.storage("playinfo", "curSong");
  const musicIndex = Helper.get.storage("musicIndex");

  let default_song;

  const initData = () => {
    if (storageMusic != "expire" && storageMusic != false) {
      initList(Object.values(storageMusic));
      initSong();
    } else {
      getMusic();
    }
  };

  const initList = (play_list) => {
    let listIndex;
    let songIndex;
    if (musicIndex !== false) {
      listIndex = musicIndex.list;
      songIndex = musicIndex.song;
    } else {
      listIndex = Helper.get.random.num(0, play_list.length - 1);
      songIndex = 0;
    }
    music.state.song_index = songIndex;
    music.state.list_index = listIndex;
    music.state.current_list = play_list[listIndex].song_list;
    Helper.set.storage("musicIndex", { list: listIndex, song: songIndex });

    default_song = play_list[listIndex].song_list[songIndex];
  };

  const getMusic = () => {
    let promise_array = [];
    let musit_list = [];
    playlist["play_list"].forEach((el) => {
      promise_array.push(
        GET("music/playlist", { id: el.id, server: el.type }).then((res) => {
          if (res.code === 200) {
            musit_list.push(res.data);
          }
        })
      );
    });
    Promise.allSettled(promise_array).then(() => {
      Helper.set.storage("musicList", "playlist", musit_list);
      // Helper.set.storage("musicList", "playlist", { time: 7200 });
      initList(musit_list);
      initSong();
    });
  };

  const getSong = () => {
    GET("music/song", {
      id: default_song.id,
      server: default_song.source,
    }).then((res) => {
      if (res.code === 200) {
        music.state.curSong = res.data;
        getPlayUrl(music.state.curSong.id, music.state.curSong.source);
      }
    });
  };

  const getPlayUrl = (id, type) => {
    GET("music/url", { id, server: type }).then((res) => {
      if (res.code === 200) {
        music.state.play_info = res.data;
      }
    });
  };

  const initSong = (default_song) => {
    if (curSong != "expire" && curSong != false) {
      music.state.curSong = curSong;
      getPlayUrl(music.state.curSong.id, music.state.curSong.source);
    } else {
      getSong(default_song);
    }
  };

  return {
    initData,
  };
}
