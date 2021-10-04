import maoRequest from "../index";
import { Account, ResultType, LoginResultDataType } from "./type";
/**
 * 登录的API地址
 *
 * @enum {number}
 */
enum LoginAPI {
  AccountLogin = "/login",
  LoginUserInfo = "/users/", // /users/:id
  UserMenus = "/role/", // /role/:id/menu
}
/**
 *
 * 用户登录 获取token 验证
 * @export
 * @param {Account} account 用户的账号 密码
 * @return {Promise<ResultType<LoginResultDataType>>}
 */
function accountLoginRequest(account: Account) {
  return maoRequest.post<ResultType<LoginResultDataType>>({
    url: LoginAPI.AccountLogin,
    data: account,
  });
}
/**
 * 根据id 请求当前用户信息
 *
 * @param {number} id
 * @return {*}
 */
function requestUserInfoById(id: number) {
  return maoRequest.get<ResultType>({
    url: LoginAPI.LoginUserInfo + id,
  });
}
/**
 * 获取用户权限菜单
 *
 * @param {number} id
 * @return {*}
 */
function requestUserMenusByRoleId(id: number) {
  return maoRequest.get<ResultType>({
    url: `${LoginAPI.UserMenus}${id}/menu`,
  });
}
export { accountLoginRequest, requestUserInfoById, requestUserMenusByRoleId };
