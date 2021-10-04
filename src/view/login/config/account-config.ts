// 校验规则
const rules = {
  name: [
    {
      requlred: true,
      message: "用户名是必填选项",
      // 失去焦点验证   change 修改了就会验证
      trigger: "blur",
    },
    {
      pattern: /^[a-zA-Z0-9]{6,12}$/,
      message: "用户名的长度在6-12个字符之间",
      trigger: "blur",
    },
  ],
  password: [
    {
      requlred: true,
      message: "密码是必填选项",
      // 失去焦点验证   change 修改了就会验证
      trigger: "blur",
    },
    {
      pattern: /^[a-zA-Z0-9]{6,12}$/,
      message: "密码的长度在6-12个字符之间",
      trigger: "blur",
    },
  ],
};
export { rules };
