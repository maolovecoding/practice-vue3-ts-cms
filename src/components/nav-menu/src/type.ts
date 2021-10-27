/**
 * 权限菜单的类型
 *
 * @interface MenuType
 */
interface MenuType {
  children: MenuType[];
  id: number;
  name: string;
  parentId: number;
  sort: number;
  type: number;
  url: string;
}

export type { MenuType };
