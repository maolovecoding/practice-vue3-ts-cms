<template>
  <el-dropdown>
    <span class="avator">
      <el-avatar :size="30" icon="el-icon-user-solid"></el-avatar>
      <span>{{ username }}</span>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item icon="el-icon-circle-close"
          >退出登录
        </el-dropdown-item>
        <el-dropdown-item disabled>用户信息</el-dropdown-item>
        <el-dropdown-item divided>系统管理</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "@/store";
export default defineComponent({
  setup() {
    const store = useStore();
    const username = computed(() => store.state.loginStore.userInfo.name);
    return { username };
  },
});
</script>

<style scoped lang="less">
.avator {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 400;
  cursor: pointer;
  .el-avatar:first-child {
    margin-right: 10px;
  }
}
</style>
