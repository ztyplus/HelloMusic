import { provideStore as musicStore } from "./music";
import { provideStore as themeStore } from "./theme";
import { provideStore as audioStore } from "./audio";

export default function provideStore(app) {
  themeStore(app);
  musicStore(app);
  audioStore(app);
}
