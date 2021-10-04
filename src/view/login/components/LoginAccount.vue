<template>
  <el-form :model="account" :rules="rules" ref="loginFormRef">
    <el-form-item label="账号:" label-width="60px" prop="name">
      <el-input
        type="text"
        placeholder="请输入账号"
        autocomplete="off"
        v-model="account.name"
      ></el-input>
    </el-form-item>
    <el-form-item label="密码:" label-width="60px" prop="password">
      <el-input
        placeholder="请输入密码"
        type="password"
        autocomplete="off"
        v-model="account.password"
        show-password
      ></el-input>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { ElForm } from "element-plus";
import { defineComponent, reactive, ref } from "vue";
import { useStore } from "vuex";
import { localCache } from "@/util";

// 校验规则
import { rules } from "../config/account-config";
export default defineComponent({
  name: "LoginAccount",
  setup() {
    // 获取store
    const store = useStore();
    const account = reactive({
      name: localCache.getCache("name") ?? "",
      password: localCache.getCache("password") ?? "",
    });
    const loginFormRef = ref<InstanceType<typeof ElForm>>();
    // 登录验证
    const loginAction = (isKeepPassword: boolean) => {
      // 数据校验
      loginFormRef.value?.validate((valid) => {
        if (!valid) return;
        // 验证通过执行登录逻辑
        // 1. 是否记录密码 isKeepPassword === true
        if (isKeepPassword) {
          // 本地缓存
          localCache.setCache("name", account.name);
          localCache.setCache("password", account.password);
        } else {
          // 清空密码和账户
          localCache.removeCache("name");
          localCache.removeCache("password");
        }
        // 登录验证 actions
        store.dispatch("loginStore/accountLoginAction", account);
      });
    };
    return { account, rules, loginAction, loginFormRef };
  },
});
</script>

<style scoped></style>
