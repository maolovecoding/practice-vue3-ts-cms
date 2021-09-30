import { createApp } from "vue";

// import { ElButton } from "element-plus";
import { registerElement } from "./global";

import App from "./App.vue";
// 路由
import router from "./router";
// 状态管理 数据
import store from "./store";

const app = createApp(App);
// registerElement(app);
// 注册组件ElementPlus
app.use(registerElement);

app.use(router);
app.use(store);
app.mount("#app");
