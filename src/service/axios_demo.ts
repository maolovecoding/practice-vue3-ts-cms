/*
 * @Author: 毛毛
 * @Date: 2021-09-29 17:59:41
 * @Last Modified by: 毛毛
 * @Last Modified time: 2021-09-29 18:34:19
 */
// axios库的练习
// axios库导出的就是一个实例，也就是一个对象
import axios from "axios";
axios.get("http://123.207.32.32:8000/home/multidata").then((res) => {
  console.log(res.data);
});
// axios的配置选项 基地址
// axios.defaults.baseURL = "";
// 超时时间
// axios.defaults.timeout = 3000;
// 请求头 header属性

// axios.all()
// axios.all([promise,promise...]) 多个请求一起返回的时候使用

// 拦截器 可以用来拦截请求做事情 比如loading加载，
// 请求拦截
// fn1 请求发送成功时会执行的函数
// fn2 请求发送失败时执行的函数
// axios.interceptors.request.use(fn1(config),fn2)
axios.interceptors.request.use(
  (config) => {
    // config 就是axios的配置对象
    // 使用完毕后需要返回出去
    return config;
  },
  (err) => {
    console.log(err);
    return err;
  },
);
// 响应拦截
// axios.interceptors.response
