import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { useMainStore } from "@/stores/main.js";
import { useStyleStore } from "@/stores/style.js";
import { useCompanyStore } from "@/stores/company.js";
import { darkModeKey, styleKey } from "@/config.js";
import { mixin } from "@/mixins.js";

import VueTheMask from "vue-the-mask";
import Notifications from "@kyvg/vue3-notification";

import "./css/main.css";
import { useAuthStore } from "./stores/auth";

/* Init Pinia */
const pinia = createPinia();

/* Create Vue app */
createApp(App)
  .mixin(mixin)
  .use(router)
  .use(pinia)
  .use(VueTheMask)
  .use(Notifications)
  .mount("#app");

/* Init Pinia stores */
const mainStore = useMainStore(pinia);
const styleStore = useStyleStore(pinia);
const companyStore = useCompanyStore(pinia);

/* Fetch sample data */
mainStore.fetch("clients");
mainStore.fetch("history");

if (localStorage.getItem("token")) {
  (async () => {
    const auth = useAuthStore(pinia);
    try {
      auth.setIsAuth(true);
      await auth.checkToken();
    } catch (error) {
      auth.setIsAuth(false);
    }
  })();
}

/* App style */
styleStore.setStyle(localStorage[styleKey] ?? "basic");

/* Dark mode */
if (
  (!localStorage[darkModeKey] &&
    window.matchMedia("(prefers-color-scheme: dark)").matches) ||
  localStorage[darkModeKey] === "1"
) {
  styleStore.setDarkMode(true);
}

/* Default title tag */
const defaultDocumentTitle = "Admin One Vue 3 Tailwind";

/* Set document title from route meta */
router.afterEach((to) => {
  document.title = to.meta?.title
    ? `${to.meta.title} — ${defaultDocumentTitle}`
    : defaultDocumentTitle;
});
