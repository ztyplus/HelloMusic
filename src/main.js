import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import vLoading from "./directives/loading";
import provideStore from "./store";
import "./assets/css/style.css";

const app = createApp(App).use(router).directive("loading", vLoading);

provideStore(app); // 提供所有共享数据

app.mount("#app");
