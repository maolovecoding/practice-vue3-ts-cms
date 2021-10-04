<template>
  <div class="login">
    <login-panel />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoginPanel from "./components/LoginPanel.vue";
export default defineComponent({
  components: {
    LoginPanel,
  },
});
</script>

<style scoped lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url("../../assets/image/login-bg.svg");
}
</style>
