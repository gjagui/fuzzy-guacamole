import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";

import axios from "axios";
axios.defaults.baseURL =
  import.meta.env.VITE_BASE_URL || "http://localhost:8080/";

import "bootstrap/dist/css/bootstrap.min.css";

createApp(App).use(router).mount("#app");

import "bootstrap/dist/js/bootstrap.js";
