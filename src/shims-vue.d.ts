/* eslint-disable */
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  // 组件类型对应的实例 .vue文件导出的对象
  export default component;
}

declare let $store: any;
