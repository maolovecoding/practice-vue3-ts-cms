<template>
  <div class="nav-header">
    <!-- 图标 -->
    <i
      class="fold-menu"
      :class="isFold ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
      @click="handleFoldClick"
    ></i>
    <div class="content">
      <div>面包屑</div>
      <div>
        <!-- 用户信息 -->
        <user-info />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import UserInfo from "./components/UserInfo.vue";
export default defineComponent({
  name: "NavHeader",
  emits: ["foldChange"],
  components: {
    UserInfo,
  },
  setup(props, { emit }) {
    // 是否折叠
    const isFold = ref(false);
    const handleFoldClick = () => {
      isFold.value = !isFold.value;
      // 将事件通知给父组件
      emit("foldChange", isFold.value);
    };

    return { isFold, handleFoldClick };
  },
});
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
