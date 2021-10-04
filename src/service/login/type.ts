/**
 * 账户登录的类型
 *
 * @interface Account
 */
interface Account {
  name: string;
  password: string;
}
/**
 * 返回值的实际数据类型
 *
 * @interface LoginResultDataType
 */
interface LoginResultDataType {
  id: number;
  name: string;
  token: string;
}
/**
 * 登录接口的返回值类型
 *
 * @interface ResultType
 * @template T [any]
 */
interface ResultType<T = any> {
  /**
   * 状态码
   *
   * @type {number}
   * @memberof ResultType
   */
  code: number;
  /**
   * 服务器返回的真实数据
   *
   * @type {T}
   * @memberof ResultType
   */
  data: T;
}
export { Account, ResultType, LoginResultDataType };
