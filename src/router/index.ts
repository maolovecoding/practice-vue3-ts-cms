import { localCache } from "./../util/cache";
import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    // 默认跳转到首页，但是会检测是否登录成功 不超过去login页面
    redirect: "/main",
  },
  {
    path: "/login",
    component: () =>
      import(/* webpackChunkName:"chunk-login" */ "@/view/login/Login.vue"),
  },
  {
    path: "/main",
    component: () =>
      import(/* webpackChunkName:"chunk-home" */ "@/view/main/Main.vue"),
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});
// 前置导航守卫
router.beforeEach((to) => {
  if (to.path !== "/login") {
    const token = localCache.getCache("token");
    if (!token) return "/login";
    return true;
  }
});

export default router;
