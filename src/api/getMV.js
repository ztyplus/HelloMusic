import { GET } from "../utils/http";

export default async function getMV(id, server) {
  const MV = await GET("music/mv", { id, server });
  return MV;
}
