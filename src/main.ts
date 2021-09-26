import { createApp } from "vue";
import App from "./App.vue";
// 路由
import router from "./router";
// 状态管理 数据
import store from "./store";

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
