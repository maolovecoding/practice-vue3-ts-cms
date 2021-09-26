import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: () =>
      import(/* webpackChunkName:"chunk-login" */ "@/view/login/Login.vue"),
  },
  {
    path: "/home",
    component: () =>
      import(/* webpackChunkName:"chunk-home" */ "@/view/main/Main.vue"),
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});
export default router;
