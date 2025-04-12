// main.js
import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from 'pinia'
import router from './routes'
import "bootstrap/dist/css/bootstrap.min.css";

createApp(App)
  .use(createPinia())
  .use(router)
  .mount("#app");
