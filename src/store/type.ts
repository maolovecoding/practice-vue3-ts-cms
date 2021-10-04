/*
 * @Author: 毛毛
 * @Date: 2021-10-03 20:13:59
 * @Last Modified by: 毛毛
 * @Last Modified time: 2021-10-04 15:46:31
 */
// 根state的类型
interface RootState {
  name: string;
  age: number;
}
interface LoginState {
  token: string;
  userInfo: any;
  userMenus: any;
}
export { LoginState, RootState };
