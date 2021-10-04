/*
 * @Author: 毛毛
 * @Date: 2021-10-03 15:04:22
 * @Last Modified by: 毛毛
 * @Last Modified time: 2021-10-03 19:51:46
 */
// 缓存处理
/** */
class LocalCache {
  constructor() {}
  /**
   *
   * 保存缓存数据  缓存的数据必须转为json字符串才能保存
   * @param {string} key 键
   * @param {*} value 值
   * @param {boolean} [isLocalStorage=true] 采用本地存储还是会话存储  // TODO 甚至也可以拓展到本地数据库存储
   * @return {*}  {void}
   * @memberof LocalCache
   */
  setCache(key: string, value: any, isLocalStorage = true): void {
    if (isLocalStorage) {
      window.localStorage.setItem(key, JSON.stringify(value));
      return;
    }
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }
  /**
   *
   * 获取缓存
   * @param {string} key
   * @param {boolean} [isLocalStorage=true] 本地存储中获取 或者会话存储中获取
   * @return {*}  {string}
   * @memberof LocalCache
   */
  getCache(key: string, isLocalStorage = true): string | void {
    if (isLocalStorage) {
      const value = window.localStorage.getItem(key);
      if (value) return JSON.parse(value);
    }
    const value = window.sessionStorage.getItem(key);
    if (value) return JSON.parse(value);
  }
  /**
   * 删除指定缓存
   *
   * @param {string} key
   * @param {boolean} [isLocalStorage=true]
   * @memberof LocalCache
   */
  removeCache(key: string, isLocalStorage = true) {
    if (isLocalStorage) {
      window.localStorage.removeItem(key);
    }
    window.sessionStorage.removeItem(key);
  }
  /**
   * 清空所有缓存
   *
   * @param {string} key
   * @param {boolean} [isLocalStorage=true]
   * @memberof LocalCache
   */
  clearCache(key: string, isLocalStorage = true) {
    if (isLocalStorage) {
      window.localStorage.clear();
    }
    window.sessionStorage.clear();
  }
}

export default LocalCache;
export const localCache = new LocalCache();
