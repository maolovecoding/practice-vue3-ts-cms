/*
 * @Author: 毛毛
 * @Date: 2021-09-29 21:39:45
 * @Last Modified by: 毛毛
 * @Last Modified time: 2021-09-30 08:33:16
 */

import type { AxiosRequestConfig, AxiosResponse } from "axios";
/**
 * 定义接口，里面可以传入参数，也就是axios的拦截器函数
 *
 * @interface MaoRequestInterceptor
 */
interface MaoRequestInterceptor<T = AxiosResponse> {
  /**
   * 请求拦截器
   *
   * @memberof MaoRequestInterceptor
   */
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  /**
   * 请求发送错误的拦截器
   *
   * @memberof MaoRequestInterceptor
   */
  requestInterceptorCatch?: (error: any) => any;
  /**
   * 响应拦截
   *
   * @memberof MaoRequestInterceptor
   */
  // responseInterceptor?: (res: AxiosResponse) => AxiosResponse;
  responseInterceptor?: (res: T) => T;
  /**
   * 响应发送错误时拦截器
   *
   * @memberof MaoRequestInterceptor
   */
  responseInterceptorCatch?: (error: any) => any;
}
/**
 * 对 AxiosRequestConfig 的请求配置接口做出拓展
 * 可以传递拦截器，供请求对象使用
 *
 * @interface MaoRequestConfig
 * @extends {AxiosRequestConfig}
 */
interface MaoRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  /**
   * 请求拦截器
   *
   * @type {MaoRequestInterceptor}
   * @memberof MaoRequestConfig
   */
  interceptors?: MaoRequestInterceptor<T>;
  /**
   * 是否弹出加载动画框
   *
   * @type {boolean}
   * @memberof MaoRequestConfig
   */
  showLoading?: boolean;
}

export { MaoRequestConfig, MaoRequestInterceptor };
