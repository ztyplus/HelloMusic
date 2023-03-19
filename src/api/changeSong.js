import { GET } from "../utils/http";
import Helper from "../utils/helper";

/**
 *
 * @param {Object} song 歌曲对象
 * @param {Object} audio 全局共享音频对象
 * @param {Object} music 全局共享音乐对象
 * @param {Number} list_index 歌单索引
 * @param {Number} song_index 当前歌单内的歌曲索引
 */
export default function (song, audio, music, list_index, song_index) {
  audio.isPlaying = false;
  audio.currentTime = 0;
  audio.changeTime = 0;
  audio.lyric = null;
  music.curSong = song;
  music.song_index = song_index;
  music.play_info = null;
  GET("music/url", { id: song.id, server: song.source }).then((res) => {
    if (res.code === 200) {
      music.play_info = res.data;
      audio.isPlaying = true;
    }
    Helper.set.storage("musicIndex", { list: list_index, song: song_index });
  });
}
