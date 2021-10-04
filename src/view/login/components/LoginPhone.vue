<template>
  <el-form>
    <el-form-item label="手机号:">
      <el-input
        type="text"
        placeholder="请输入账号"
        autocomplete="off"
        v-model="phone.number"
      ></el-input>
    </el-form-item>
    <el-form-item label="验证码:">
      <el-input
        placeholder="请输入密码"
        type="password"
        autocomplete="off"
        v-model="phone.code"
      ></el-input>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  setup() {
    const phone = reactive({
      number: "",
      code: "",
    });
    return { phone };
  },
});
</script>

<style scoped></style>
