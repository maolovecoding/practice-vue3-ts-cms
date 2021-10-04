import { Module } from "vuex";
import { RootState, LoginState } from "../type";
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId,
} from "../../service/login/login";
import { Account } from "../../service/login/type";
import { localCache } from "@/util/index";
import router from "@/router";

/*
  Module<S, R> s是当前所在的store的state属性的类型
  R 是根rootStore的state的属性类型
*/
const loginStore: Module<LoginState, RootState> = {
  // 开启命名空间
  namespaced: true,
  state: () => {
    return {
      token: "",
      userInfo: {},
      userMenus: [],
    };
  },
  /*
    todo  修改state 全都通过mutation实现
  */
  mutations: {
    /**
     * 保存 token
     *
     * @param {*} state
     * @param {string} token 服务器返回的token
     */
    changeToken(state, token: string) {
      state.token = token;
      // 保存到缓存中
      localCache.setCache("token", token);
    },
    /**
     * 记录用户信息
     *
     * @param {*} state
     * @param {*} userInfo
     */
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo;
      // 缓存用户信息
      localCache.setCache("userInfo", userInfo);
    },
    // 缓存用户菜单信息
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus;
      localCache.setCache("userMenus", userMenus);
    },
  },
  actions: {
    /**
     * 发起登录请求 账户密码
     *
     * @param {*} { commit }
     * @param {*} payload
     */
    async accountLoginAction({ commit }, payload: Account) {
      // 发起请求
      const res = await accountLoginRequest(payload);
      const { id, token } = res.data;
      // 更改token
      commit("changeToken", token);
      // 2. 请求用户的信息
      const { data: userInfo } = await requestUserInfoById(id);
      commit("changeUserInfo", userInfo);
      // 3. 请求用户的菜单
      const { data: userMenus } = await requestUserMenusByRoleId(
        userInfo.role.id,
      );
      commit("changeUserMenus", userMenus);
      // 4. 跳转首页
      router.push("/main");
    },
    /**
     * 刷新页面会执行的操作
     *
     * @param {*} { commit }
     */
    loadLocalLogin({ commit }) {
      const token = localCache.getCache("token");
      token && commit("changeToken", token);
      const userInfo = localCache.getCache("userInfo");
      userInfo && commit("changeUserInfo", userInfo);
      const userMenus = localCache.getCache("userMenus");
      userMenus && commit("changeUserMenus", userInfo);
    },
    /**
     *
     *
     * @param {*} { commit }
     * @param {*} payload 验证码相关信息
     */
    phoneLoginAction({ commit }, payload: any) {
      console.log("手机登录:", commit, payload);
    },
  },
};

export default loginStore;
