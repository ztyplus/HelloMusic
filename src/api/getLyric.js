import { GET } from "../utils/http";

export default async function getLyric(id, type) {
  const lyricData = await GET("music/lyric", { id, server: type });
  return lyricData;
}
