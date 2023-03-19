import { reactive, inject } from "vue";
import Helper from "../utils/helper";

import bg1 from "../assets/images/background/bg1.svg";
import bg2 from "../assets/images/background/bg2.svg";
import bg3 from "../assets/images/background/bg3.svg";
import bg4 from "../assets/images/background/bg4.svg";
import bg5 from "../assets/images/background/bg5.svg";
import bg6 from "../assets/images/background/bg6.svg";
import bg7 from "../assets/images/background/bg7.svg";
import bg8 from "../assets/images/background/bg8.svg";
import bg9 from "../assets/images/background/bg9.svg";
import bg10 from "../assets/images/background/bg10.svg";

const key = Symbol();
let state = reactive({
  background: null,
  color: null,
});

const bgImages = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9, bg10];
const colors = [
  "#8500ff",
  "#fbf701",
  "#aaf000",
  "#44ff89",
  "#ffeb00",
  "#ffe300",
  "#4075ff",
  "#ff4646",
  "#682cf0",
  "#00ff27",
];

let themeIndex = Helper.get.storage("theme", "index");
state.background = `url(${bgImages[themeIndex.value]})`;
state.color = colors[themeIndex.value];

if (!themeIndex) {
  themeIndex = Helper.get.random.num(0, 9);
  state.color = colors[themeIndex];
  state.background = `url(${bgImages[themeIndex]})`;
  Helper.set.storage("theme", "index", themeIndex);
}

export function provideStore(app) {
  app.provide(key, {
    state,
  });
}

export function useStore(defaultValue = null) {
  return inject(key, defaultValue);
}

export function changeTheme() {
  themeIndex = Helper.get.random.num(0, 9);
  Helper.set.storage("theme", "index", themeIndex);
  state.background = `url(${bgImages[themeIndex]})`;
  state.color = colors[themeIndex];
}
