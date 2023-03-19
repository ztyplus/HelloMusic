<template>
    <ul v-if="state.comment_list.length !== 0"  ref="scrollContainer" v-on:scroll="handleScroll">
      <li v-for="item in state.comment_list" :key="item.comment_id">
        <div class="head">
          <img :src="item.avatar_url" :alt="item.nickname">
          <div>
            <div class="name">{{ item.nickname }}</div>
            <span class="item">{{ natureTime(item.time) }} &nbsp;&nbsp;{{ item.location === "" ? "" : "来自" + item.location }}</span>
          </div>
        </div>
        <p v-html='item.content.replaceAll("\n","<br>")'></p>
      </li>
      <li class="loading-text flex-center" v-if="state.isLoading">
        <img src="../assets/images/load.svg">
        <span>加载更多评论...</span>
      </li>
    </ul>
    <div v-if="state.comment_list.length === 0 && !state.getFailedComment" class="loading wh-100 flex-center">
      <img src="../assets/images/load.svg" alt="评论加载中...">
    </div>

    <div v-if="state.getFailedComment" class="comment-error wh-100 flex-center">
      <span>评论获取失败</span>
    </div>
</template>

<script setup>
import getComment from "../api/getComment"
import { useStore } from "../store/music"
import Helper from "../utils/helper"
import { reactive, watch, ref, nextTick } from "vue"
import debounce from "../utils/debounce"


const props = defineProps({
  ctype: {
    type: Number,
    required: true,
    default: 0,
  }
})

const scrollContainer = ref(null)
const music = useStore()
const state = reactive({
  comment_list: [],
  offset: 0,
  isLoading: true,
  getFailedComment: false
})

const initComment = () => {
  getComment(music.state.curSong.id,music.state.curSong.source,props.ctype, state.offset).then( res => {
    if(res.code === 200) {
      state.isLoading = false
      state.getFailedComment = false
      state.comment_list.push(...res.data)
    }else{
      state.isLoading = false
      state.comment_list = []
      state.getFailedComment = true
    }
  })
}
const natureTime = (time) => {
  if(props.ctype === 0) {
    return Helper.time.nature(+time)
  }else{
    return Helper.time.to.date(+time)
  }
}
initComment();

watch(() => music.state.curSong,() => {
    state.comment_list = []
    initComment();
  }
)

const handleScroll = debounce(() => {
  if(props.ctype === 0 && scrollContainer.value) {
    const container = scrollContainer.value
    const scrollTop = container.scrollTop
    const scrollHeight = container.scrollHeight
    const offsetHeight = container.offsetHeight
    if (scrollTop + offsetHeight >= scrollHeight - 10) {
      state.isLoading = true;
      container.scrollTop = container.scrollHeight + 20000
      nextTick(() => {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: 'smooth'
        });
      })
      state.offset += 1;
      initComment();
    }
  }
},1000)


</script>

<style lang="less" scoped>
.comment-box {
  height: 100%;
}
.comment-error {
  font-size: 1.2rem;
    color: #fff;
}
.loading {
  img {
    width: 60px;
    height: 60px;
    margin-bottom: 50px;
  }
}

ul {
  padding-right: 5px;
  height: calc(100% - 30px);
  margin-top: 5px;
  list-style: none;
  overflow: auto;
  li {
    margin-bottom: 5px;
    padding: 5px;
    background-color: rgb(255 255 255 / 10%);
    color: rgb(255, 255, 255);
    border-radius: 5px;
    p {
      font-size: .9rem;
      line-height: 1.5rem;
    }
    .head {
      display: flex;
      margin-bottom: 5px;
      .name {
        font-size: 14px;
        color: #fff;
        font-weight: bold;
      }
      .item {
        font-size: 12px;
        color:rgb(255 255 255 / 60%);
      }
    }
    img {
      margin-right: 10px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}
.loading-text {
  font-size: 12px;
  background: none;
  img {
    width: 20px;
    height: 20px;
  }
}
</style>