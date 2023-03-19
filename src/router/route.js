import songList from "../views/SongList.vue";
import Comment from "../views/Comment.vue";
import HotComment from "../views/HotComment.vue";
import PlayList from "../views/PlayList.vue";
import Container from "../views/Container.vue";
import Video from "../views/Video.vue";

export default [
  {
    name: "home",
    path: "/",
    components: {
      bottom: songList,
      container: Container,
    },
    meta: { keepAlive: true },
  },
  {
    name: "comment",
    path: "/comment",
    components: {
      bottom: Comment,
      container: Container,
    },
    meta: { keepAlive: true },
  },
  {
    name: "hotcomment",
    path: "/hotcomment",
    components: {
      bottom: HotComment,
      container: Container,
    },
    meta: { keepAlive: true },
  },
  {
    name: "playlist",
    path: "/playlist",
    component: PlayList,
    meta: { keepAlive: true },
  },
  {
    name: "mv",
    path: "/mv",
    component: Video,
    meta: { keepAlive: false },
  },
];
