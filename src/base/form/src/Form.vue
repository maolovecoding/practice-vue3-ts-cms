<template>
  <div class="mao-form">
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              :style="fromItemStyle"
              :label="item.label"
              :rules="item.rules"
            >
              <!-- 文本框 密码框 -->
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                />
              </template>
              <!-- 下拉选择框 -->
              <template v-else-if="item.type === 'select'">
                <el-select class="select" :placeholder="item.placeholder">
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    :label="option.label"
                  ></el-option>
                </el-select>
              </template>
              <!-- 日期 -->
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  style="width: 100%"
                  v-bind="item.datePickerType"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { FormType } from "../type";
export default defineComponent({
  props: {
    // 表单项的信息
    formItems: {
      // 指定表单类型的数组
      type: Array as PropType<FormType[]>,
      // vue官方要求，默认值是引用类型的时候，使用箭头函数
      // 箭头函数返回默认值的时候，可以使用上下文的this
      default: () => [],
    },
    // label宽度
    labelWidth: {
      type: String,
      default: "80px",
    },
    // 所有的表单(项)样式
    fromItemStyle: {
      type: Object,
      default: () => ({
        padding: "5px 20px",
      }),
    },
    // 栅格布局响应式
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6,
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24,
      }),
    },
  },
  name: "Form",
  setup() {
    return {};
  },
});
</script>

<style scoped lang="less">
.select {
  width: 100%;
}
</style>
