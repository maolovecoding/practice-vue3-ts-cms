// 类型
import type { App } from "vue";
import {
  ElButton,
  ElForm,
  ElTabs,
  ElTabPane,
  ElAlert,
  ElFormItem,
  ElRadio,
  ElInput,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElHeader,
  ElAside,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElSubMenu,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElAvatar,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElRow,
  ElCol,
  ElSelect,
  ElOption,
  ElDatePicker,
} from "element-plus";
import "element-plus/theme-chalk/base.css";

const components = [
  ElButton,
  ElForm,
  ElTabs,
  ElTabPane,
  ElAlert,
  ElFormItem,
  ElRadio,
  ElInput,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElHeader,
  ElAside,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElSubMenu,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElAvatar,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElRow,
  ElCol,
  ElSelect,
  ElOption,
  ElDatePicker,
];
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
