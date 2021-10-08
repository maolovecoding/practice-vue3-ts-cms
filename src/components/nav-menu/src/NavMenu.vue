<template>
  <div class="sile-menu">
    <div class="logo">
      <!-- 引用图片 这里使用简写 在模板中是需要使用 ~开头的 -->
      <img class="img" src="~@/assets/image/logo.svg" alt="logo" />
      <span v-show="!collapse" class="title">Vue3+TS=CMS</span>
    </div>
    <el-menu
      default-active="2"
      class="el-menu-vertical"
      background-color="#0f2233"
      text-color="#b7bdc3"
      active-text-color="#6a82fb"
      unique-opened
      :collapse="collapse"
    >
      <template v-for="menu in userMenus" :key="menu.id">
        <!-- 菜单可展开 拥有二级菜单 -->
        <template v-if="menu.type === 1">
          <el-sub-menu :index="menu.id + ''">
            <!-- 标题 -->
            <template v-slot:title>
              <i :class="menu.icon" v-if="menu.icon"></i>
              <span>{{ menu.name }}</span>
            </template>
            <template v-for="subMenu in menu.children" :key="subMenu.id">
              <el-menu-item :index="subMenu.id + ''">
                <i :class="subMenu.icon" v-if="subMenu.icon"></i>
                <span>{{ subMenu.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 一级菜单，直接展示 没有二级菜单了 -->
        <template v-else-if="menu.type === 2">
          <el-menu-item :index="menu.id + ''">
            <i v-if="menu.icon" :class="menu.icon"></i>
            <span>{{ menu.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
// 自己封装的useStore
import { useStore } from "@/store";
export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const store = useStore();
    // 菜单
    const userMenus = computed(() => store.state.loginStore.userMenus);
    return { userMenus };
  },
});
</script>

<style scoped lang="less">
@import "../../../style/_var.less";
// 混合
.selectActiveColor {
  color: white !important;
}

.sile-menu {
  height: 100%;
  // width: 100%;

  // logo 布局
  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }
  .el-menu {
    border-right: none;
  }

  .el-menu-vertical {
    // 没有设置100%, 右边会突出（因为子布局比父亲大）
    width: 100%;
    border-right: none;

    // 目录
    .el-submenu {
      // 二级菜单 ( 默认背景 )
      .el-menu-item {
        padding-left: 50px !important;
        background-color: @side-lighten-bg-color !important;
      }
    }

    // hover 高亮
    .el-menu-item:hover {
      .selectActiveColor(); // 菜单
    }

    .el-menu-item:hover i::before {
      .selectActiveColor(); // 菜单 icon
    }

    .el-submenu__title:hover span {
      .selectActiveColor(); // 目录
    }

    .el-submenu__title:hover i::before {
      .selectActiveColor(); // 目录 icon
    }

    // 二级菜单选中
    .el-menu-item.is-active {
      color: white !important;
      background-color: @side-sel-bg-color !important;
    }
  }
}
</style>
