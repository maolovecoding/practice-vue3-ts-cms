/*
 * @Author: 毛毛
 * @Date: 2021-09-29 20:20:40
 * @Last Modified by: 毛毛
 * @Last Modified time: 2021-09-30 00:00:49
 */
import MaoRequest from "./request";
import { BASE_URL, TIME_OUT } from "./request/config";

export default new MaoRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // 拦截器
  interceptors: {
    requestInterceptor: (config) => {
      const token = "";
      // 携带token
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    requestInterceptorCatch: (error) => {
      return error;
    },
    responseInterceptor: (res) => {
      return res;
    },
    responseInterceptorCatch: (error) => {
      return error;
    },
  },
});
