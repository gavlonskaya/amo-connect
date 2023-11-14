import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";

const app = createApp(App);

// Используйте axios для выполнения HTTP-запросов
app.config.globalProperties.$axios = axios;

app.mount("#app");
