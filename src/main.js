// main.js
import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from 'pinia'
import router from './routes'
import "./assets/style.css";
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-alpine.css';

// import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


createApp(App)
  .use(createPinia())
  .use(router)
  .mount("#app");
