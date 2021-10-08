/*
 * @Author: 毛毛
 * @Date: 2021-10-03 20:13:59
 * @Last Modified by: 毛毛
 * @Last Modified time: 2021-10-07 15:01:10
 */

import { LoginState } from "./login/type";

// 根state的类型
interface RootState {
  name: string;
  age: number;
}
/**
 * 根store里面的module的类型
 */
interface RootWithModule {
  loginStore: LoginState;
}

export { RootWithModule, RootState };
// 联合类型 让导出的类型同时具备根store的类型 和 我们注册的模块类型
export type StoreType = RootState & RootWithModule;
