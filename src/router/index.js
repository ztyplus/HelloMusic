import { createRouter, createWebHashHistory } from "vue-router";
// import { createWebHistory,createWebHashHistory } from 'vue-router'

import routes from "./route";

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
