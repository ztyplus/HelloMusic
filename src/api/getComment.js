import { GET } from "../utils/http";

/**
 * 获取评论
 * @param {Number} id 歌曲id
 * @param {String} server 厂商标识
 * @param {Number} ctype 评论类型[0: 普通评论,1: 热评]
 * @param {Number} offset 页面偏移量
 */
export default async function getComment(
  id,
  server,
  ctype,
  offset = 0,
  limit = 25
) {
  return await GET("music/comments", { id, server, ctype, offset, limit });
}
