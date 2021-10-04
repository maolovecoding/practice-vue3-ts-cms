<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// defineComponent + ts 可以限制类型 可以完成类型推导
export default defineComponent({
  name: "App",
});
</script>

<style lang="less">
.app {
  height: 100%;
}
</style>
