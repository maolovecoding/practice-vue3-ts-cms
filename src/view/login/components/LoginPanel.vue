<template>
  <div class="login-panel">
    <h3 class="title">后台管理系统</h3>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane :name="LoginType.ACCOUNT">
        <!-- 使用了label插槽 -->
        <template #label>
          <span><i class="el-icon-user-solid"></i> 账号登录</span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane :name="LoginType.PHONE">
        <template v-slot:label>
          <span><i class="el-icon-mobile-phone"></i> 手机登录</span>
        </template>
        <login-phone />
      </el-tab-pane>
    </el-tabs>
    <!-- 记住密码 -->
    <div class="account-control">
      <el-checkbox v-model="iskeepPassword">记住密码</el-checkbox>
      <el-link type="info" class="el-link" :underline="false">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-button" @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import LoginAccount from "./LoginAccount.vue";
import LoginPhone from "./LoginPhone.vue";
import { LoginType } from "../hook/login-type";
export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone,
  },
  setup() {
    let iskeepPassword = ref(false);
    // 登录组件对象
    // TODO 拿到导出的vue组件的真正类型 InstanceType<typeof LoginAccount>
    const accountRef = ref<InstanceType<typeof LoginAccount>>();
    // 当前是账户密码 还是手机登录
    const currentTab = ref<string>(LoginType.ACCOUNT);
    // 立即登录 验证用户名 密码
    const handleLoginClick = () => {
      if (currentTab.value === LoginType.ACCOUNT) {
        accountRef.value?.loginAction(iskeepPassword.value);
      } else if (currentTab.value === LoginType.PHONE) {
        return;
      }
    };

    return {
      iskeepPassword,
      currentTab,
      handleLoginClick,
      accountRef,
      LoginType,
    };
  },
});
</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 150px;
  width: 320px;

  .title {
    text-align: center;
  }

  .account-control {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  .login-button {
    width: 100%;
    margin-top: 10px;
  }
  .el-link:hover {
    color: rgba(39, 163, 221, 0.486);
  }
}
</style>
