<template>
  <div class="user">
    <!-- 搜索框 -->
    <div class="search">
      <mao-form class="mao-form" :formItems="formItems" />
    </div>
    <!-- 实际内容 -->
    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { MaoForm, FormType } from "@/base/form";
export default defineComponent({
  name: "User",
  components: { MaoForm },
  setup() {
    const formItems: FormType[] = [
      {
        label: "用户名",
        placeholder: "请输入用户名",
        type: "input",
      },
      {
        label: "密码",
        placeholder: "请输入密码",
        type: "password",
      },
      {
        label: "喜欢的运动",
        placeholder: "请选择喜欢的运动",
        type: "select",
        options: [
          { label: "篮球", value: "basketball" },
          { label: "足球", value: "footable" },
        ],
      },
      {
        label: "创建时间",
        placeholder: "请选择创建时间",
        type: "datepicker",
        datePickerType: {
          startPlaceholder: "开始时间",
          endPlaceholder: "结束时间",
          type: "daterange",
        },
      },
    ];
    return { formItems };
  },
});
</script>

<style scoped lang="less"></style>
