// main.js
import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from 'pinia'
import router from './routes'
// import scss/_custom.scss';
import "./assets/scss/_custom.scss";
import "./assets/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


createApp(App)
  .use(createPinia())
  .use(router)
  .mount("#app");
