import { RouteRecord } from "vue-router";
/**
 * 将用户权限数组映射为路由菜单
 *
 * @export
 * @param {any[]} userMenus
 * @return {*}  {RouteRecord[]}
 */
export function mapMenusToRoutes(userMenus: any[]): RouteRecord[] {
  const routes: RouteRecord[] = [];
  // 1. 先去加载默认所有的routes
  const allRoutes: RouteRecord[] = [];
  // TODO require.context() 该对象是webpack提供的，这个方法是加载一个文件夹
  // true表示递归查找文件，递归查找该文件夹下所有的ts文件
  const routesFiles = require.context("@/router/main", true, /.ts$/);
  // 获取所有的文件路径 routesFiles.keys() 返回值是路径组成的数组
  routesFiles.keys().forEach((path) => {
    // 导入
    const route = require("@/router/main" + path.split(".")[1]);
    allRoutes.push(route.default);
  });
  // 2. 根据菜单获取需要添加的routes
  _getRoute(userMenus, allRoutes, routes);
  return routes;
}
/**
 * 根据导出的所有路由对象和用户的userMenus进行对应，获取需要注册的路由
 *
 * @param {any[]} menus
 * @param {RouteRecord[]} allRoutes
 * @param {RouteRecord[]} routes
 */
function _getRoute(
  menus: any[],
  allRoutes: RouteRecord[],
  routes: RouteRecord[],
): void {
  for (const menu of menus) {
    if (menu.type === 2) {
      // 拿到指定的路由了
      const route = allRoutes.find((route) => route.path === menu.url);
      route && routes.push(route);
    } else {
      _getRoute(menu.children, allRoutes, routes);
    }
  }
}
