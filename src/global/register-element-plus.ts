// 类型
import type { App } from "vue";
import { ElButton, ElForm } from "element-plus";
import "element-plus/theme-chalk/base.css";

const components = [ElButton, ElForm];
/**
 * 注册Element-Plus组件等操作
 * @param app
 */
export default function (app: App): void {
  for (const component of components) {
    // 注册全局组件
    app.component(component.name, component);
  }
}