import { createApp } from "vue";

import "normalize.css";
import "./assets/css/index.less";

// import { ElButton } from "element-plus";
import { registerElement } from "./global";

import App from "./App.vue";
// 路由
import router from "./router";
// 状态管理 数据
import store, { setupStore } from "./store";

const app = createApp(App);
// registerElement(app);
// 注册组件ElementPlus
app.use(registerElement);

app.use(router);
app.use(store);
setupStore();
app.mount("#app");
