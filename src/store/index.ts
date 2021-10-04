/*
 * @Author: 毛毛
 * @Date: 2021-10-03 20:01:58
 * @Last Modified by: 毛毛
 * @Last Modified time: 2021-10-04 17:40:12
 */

import { createStore } from "vuex";
import { RootState } from "./type";
import loginStore from "./login/login";
const store = createStore<RootState>({
  state: () => {
    return {
      name: "mao",
      age: 1,
    };
  },
  actions: {},
  mutations: {},
  getters: {},
  modules: {
    loginStore,
  },
});
/**
 * 刷新页面重新向服务器请求一波数据
 *
 */
function setupStore() {
  store.dispatch("loginStore/loadLocalLogin");
}

export default store;
export { setupStore };
