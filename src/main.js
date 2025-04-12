// main.js
import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from 'pinia'
import router from './routes'
// import scss/_custom.scss';
import "./assets/scss/_custom.scss";

// Import Bootstrap's Sass files
import "bootstrap/scss/bootstrap.scss";
import "bootstrap/dist/css/bootstrap.min.css";


createApp(App)
  .use(createPinia())
  .use(router)
  .mount("#app");
