import Lara from "@/presets/lara";
import { reactive, watch } from "vue";

export default {
  install: (app) => {
    const _appState = reactive({ preset: "lara" });

    watch(
      () => _appState.preset,
      (newValue) => {
        if (newValue === "lara")
          app.config.globalProperties.$primevue.config.pt = Lara;
      }
    );

    app.config.globalProperties.$appState = _appState;
  },
};
