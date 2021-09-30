/*
 * @Author: 毛毛
 * @Date: 2021-09-29 20:21:07
 * @Last Modified by: 毛毛
 * @Last Modified time: 2021-09-30 08:40:40
 */
import { ElLoading, ILoadingInstance } from "element-plus";
import axios from "axios";
import type { AxiosInstance } from "axios";
import type { MaoRequestConfig, MaoRequestInterceptor } from "./type";
// 默认显示加载动画
const DEFAULT_LOADING = true;
/**
 * 请求类 封装发起网络请求的类，
 * 解除项目和第三方请求库的耦合
 */
export default class MaoRequest {
  /**
   * axios实例对象，为了有多个请求地址的情况做铺垫
   *
   * @type {AxiosInstance}
   * @memberof MaoRequest
   */
  private instance: AxiosInstance;
  /**
   * 拦截器
   *
   * @private
   * @type {MaoRequestInterceptor}
   * @memberof MaoRequest
   */
  private interceptors?: MaoRequestInterceptor;
  /**
   * 加载动画框
   *
   * @private
   * @type {ILoadingInstance}
   * @memberof MaoRequest
   */
  private loading?: ILoadingInstance;
  /**
   * 是否显示加载动画框
   * 默认显示加载动画框
   * @private
   * @type {boolean}
   * @memberof MaoRequest
   */
  private showLoading: boolean;
  /**
   * Creates an instance of MaoRequest.
   * @param {MaoRequestConfig} config 请求相关配置
   * @memberof MaoRequest
   */
  constructor(config: MaoRequestConfig) {
    this.instance = axios.create(config);
    this.interceptors = config.interceptors;
    // 动画框是否显示
    this.showLoading = config.showLoading ?? DEFAULT_LOADING;
    // TODO  注意：请求拦截器是先添加的后执行，后添加的先执行 有点像 f(g(x)) 符合函数的味道。响应拦截器就是按照顺序了。
    // 注册拦截器
    this.registerInterceptor();
    this.registerGlobalInterceptor();
  }
  /**
   * 发起请求，获取异步数据
   *
   * @param {MaoRequestConfig} config 请求相关参数
   * @return {*}  {Promise<AxiosResponse>}
   * @memberof MaoRequest
   */
  request<T>(config: MaoRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 请求参数config中也配置了拦截器，则为这次请求单独执行一次拦截器
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }
      // 单个请求的动画加载控制
      if (config.showLoading === false) {
        this.showLoading = config.showLoading;
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 执行属于请求自己的响应拦截器
          if (config.interceptors?.responseInterceptor) {
            config = config.interceptors.responseInterceptor(res);
          }
          // 还原默认值，下次请求还是默认有动画框
          this.showLoading = DEFAULT_LOADING;
          // 已经是被处理过的实际数据了
          resolve(res);
        })
        .catch((err) => {
          // 还原默认值，下次请求还是默认有动画框
          this.showLoading = DEFAULT_LOADING;
          reject(err);
        });
    });
  }

  get<T>(config: MaoRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "GET" });
  }

  post<T>(config: MaoRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "POST" });
  }

  patch<T>(config: MaoRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH" });
  }

  delete<T>(config: MaoRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" });
  }

  /**
   *
   * 注册 实例 拦截器的方法
   * @private
   * @memberof MaoRequest
   */
  private registerInterceptor(): void {
    // 注册拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch,
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch,
    );
  }
  /**
   * 注册全局的拦截器 对每个实例都生效
   *
   * @private
   * @memberof MaoRequest
   */
  private registerGlobalInterceptor(): void {
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          // 发起请求时：弹出loading框 加载动画
          this.loading = ElLoading.service({
            lock: true,
            text: "正在请求数据加载~~",
            background: "rgba(0,0,0,.7)",
          });
        }
        return config;
      },
      (error) => {
        // this.loading?.close();
        return error;
      },
    );
    this.instance.interceptors.response.use(
      (res) => {
        // 响应成功 移除loading
        this.loading?.close();
        return res.data;
      },
      (err) => {
        if (err.response.status === 404) {
          console.log("404错误！");
        }
        this.loading?.close();
        return err;
      },
    );
  }
}
