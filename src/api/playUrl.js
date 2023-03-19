import { GET } from "../utils/http";

export default async function getUrl(id, type) {
  const playUrl = await GET("music/url", { id, server: type });
  return playUrl;
}
