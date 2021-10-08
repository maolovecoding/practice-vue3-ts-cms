<template>
  <div class="nav-header">
    <!-- 图标 -->
    <i
      class="fold-menu"
      :class="isFold ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
      @click="handleFoldClick"
    ></i>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "NavHeader",
  emits: ["foldChange"],
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
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
}
</style>
