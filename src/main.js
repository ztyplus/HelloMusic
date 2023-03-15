import { createApp } from "vue";
import App from "./App.vue";
import vLoading from "./directives/loading";

createApp(App).directive("loading", vLoading).mount("#app");
