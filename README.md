# vue3-ts-cms

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

# 项目搭建规范

## 一. 代码规范

### 1.1. 集成 editorconfig 配置

EditorConfig 有助于为不同 IDE 编辑器上处理同一项目的多个开发人员维护一致的编码风格。

```yaml
# http://editorconfig.org

root = true

[*] # 表示所有文件适用
charset = utf-8 # 设置文件字符集为 utf-8
indent_style = space # 缩进风格（tab | space）
indent_size = 2 # 缩进大小
end_of_line = lf # 控制换行类型(lf | cr | crlf)
trim_trailing_whitespace = true # 去除行首的任意空白字符
insert_final_newline = true # 始终在文件末尾插入一个新行

[*.md] # 表示仅 md 文件适用以下规则
max_line_length = off
trim_trailing_whitespace = false
```

VSCode 需要安装一个插件：EditorConfig for VS Code

![image-20210722215138665](https://tva1.sinaimg.cn/large/008i3skNgy1gsq2gh989yj30pj05ggmb.jpg)

### 1.2. 使用 prettier 工具

Prettier 是一款强大的代码格式化工具，支持 JavaScript、TypeScript、CSS、SCSS、Less、JSX、Angular、Vue、GraphQL、JSON、Markdown 等语言，基本上前端能用到的文件格式它都可以搞定，是当下最流行的代码格式化工具。

1.安装 prettier

```shell
npm install prettier -D
```

2.配置.prettierrc 文件：

- useTabs：使用 tab 缩进还是空格缩进，选择 false；
- tabWidth：tab 是空格的情况下，是几个空格，选择 2 个；
- printWidth：当行字符的长度，推荐 80，也有人喜欢 100 或者 120；
- singleQuote：使用单引号还是双引号，选择 true，使用单引号；
- trailingComma：在多行输入的尾逗号是否添加，设置为 `none`；
- semi：语句末尾是否要加分号，默认值 true，选择 false 表示不加；

```json
{
  "useTabs": false,
  "tabWidth": 2,
  "printWidth": 80,
  "singleQuote": true,
  "trailingComma": "none",
  "semi": false
}
```

3.创建.prettierignore 忽略文件

```
/dist/*
.local
.output.js
/node_modules/**

**/*.svg
**/*.sh

/public/*
```

4.VSCode 需要安装 prettier 的插件

![image-20210722214543454](https://tva1.sinaimg.cn/large/008i3skNgy1gsq2acx21rj30ow057mxp.jpg)

5.测试 prettier 是否生效

- 测试一：在代码中保存代码；
- 测试二：配置一次性修改的命令；

在 package.json 中配置一个 scripts：

```json
    "prettier": "prettier --write ."
```

### 1.3. 使用 ESLint 检测

1.在前面创建项目的时候，我们就选择了 ESLint，所以 Vue 会默认帮助我们配置需要的 ESLint 环境。

2.VSCode 需要安装 ESLint 插件：

![image-20210722215933360](https://tva1.sinaimg.cn/large/008i3skNgy1gsq2oq26odj30pw05faaq.jpg)

3.解决 eslint 和 prettier 冲突的问题：

安装插件：（vue 在创建项目时，如果选择 prettier，那么这两个插件会自动安装）

```shell
npm i eslint-plugin-prettier eslint-config-prettier -D
```

添加 prettier 插件：

```json
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
    'plugin:prettier/recommended'
  ],
```

### 1.4. git Husky 和 eslint

虽然我们已经要求项目使用 eslint 了，但是不能保证组员提交代码之前都将 eslint 中的问题解决掉了：

- 也就是我们希望保证代码仓库中的代码都是符合 eslint 规范的；

- 那么我们需要在组员执行 `git commit ` 命令的时候对其进行校验，如果不符合 eslint 规范，那么自动通过规范进行修复；

那么如何做到这一点呢？可以通过 Husky 工具：

- husky 是一个 git hook 工具，可以帮助我们触发 git 提交的各个阶段：pre-commit、commit-msg、pre-push

如何使用 husky 呢？

这里我们可以使用自动配置命令：

```shell
npx husky-init && npm install
```

这里会做三件事：

1.安装 husky 相关的依赖：

![image-20210723112648927](https://tva1.sinaimg.cn/large/008i3skNgy1gsqq0o5jxmj30bb04qwen.jpg)

2.在项目目录下创建 `.husky` 文件夹：

```
npx huksy install
```

![image-20210723112719634](https://tva1.sinaimg.cn/large/008i3skNgy1gsqq16zo75j307703mt8m.jpg)

3.在 package.json 中添加一个脚本：

![image-20210723112817691](https://tva1.sinaimg.cn/large/008i3skNgy1gsqq26phpxj30dj06fgm3.jpg)

接下来，我们需要去完成一个操作：在进行 commit 时，执行 lint 脚本：

![image-20210723112932943](https://tva1.sinaimg.cn/large/008i3skNgy1gsqq3hn229j30nf04z74q.jpg)

这个时候我们执行 git commit 的时候会自动对代码进行 lint 校验。

### 1.5. git commit 规范

#### 1.5.1. 代码提交风格

通常我们的 git commit 会按照统一的风格来提交，这样可以快速定位每次提交的内容，方便之后对版本进行控制。

![](https://tva1.sinaimg.cn/large/008i3skNgy1gsqw17gaqjj30to0cj3zp.jpg)

但是如果每次手动来编写这些是比较麻烦的事情，我们可以使用一个工具：Commitizen

- Commitizen 是一个帮助我们编写规范 commit message 的工具；

  1.安装 Commitizen

```shell
npm install commitizen -D
```

2.安装 cz-conventional-changelog，并且初始化 cz-conventional-changelog：

```shell
npx commitizen init cz-conventional-changelog --save-dev --save-exact
```

这个命令会帮助我们安装 cz-conventional-changelog：

![image-20210723145249096](https://tva1.sinaimg.cn/large/008i3skNgy1gsqvz2odi4j30ek00zmx2.jpg)

并且在 package.json 中进行配置：

![](https://tva1.sinaimg.cn/large/008i3skNgy1gsqvzftay5j30iu04k74d.jpg)

这个时候我们提交代码需要使用 `npx cz`：

- 第一步是选择 type，本次更新的类型

| Type     | 作用                                                                                   |
| -------- | -------------------------------------------------------------------------------------- |
| feat     | 新增特性 (feature)                                                                     |
| fix      | 修复 Bug(bug fix)                                                                      |
| docs     | 修改文档 (documentation)                                                               |
| style    | 代码格式修改(white-space, formatting, missing semi colons, etc)                        |
| refactor | 代码重构(refactor)                                                                     |
| perf     | 改善性能(A code change that improves performance)                                      |
| test     | 测试(when adding missing tests)                                                        |
| build    | 变更项目构建或外部依赖（例如 scopes: webpack、gulp、npm 等）                           |
| ci       | 更改持续集成软件的配置文件和 package 中的 scripts 命令，例如 scopes: Travis, Circle 等 |
| chore    | 变更构建流程或辅助工具(比如更改测试环境)                                               |
| revert   | 代码回退                                                                               |

- 第二步选择本次修改的范围（作用域）

![image-20210723150147510](https://tva1.sinaimg.cn/large/008i3skNgy1gsqw8ca15oj30r600wmx4.jpg)

- 第三步选择提交的信息

![image-20210723150204780](https://tva1.sinaimg.cn/large/008i3skNgy1gsqw8mq3zlj60ni01hmx402.jpg)

- 第四步提交详细的描述信息

![image-20210723150223287](https://tva1.sinaimg.cn/large/008i3skNgy1gsqw8y05bjj30kt01fjrb.jpg)

- 第五步是否是一次重大的更改

![image-20210723150322122](https://tva1.sinaimg.cn/large/008i3skNgy1gsqw9z5vbij30bm00q744.jpg)

- 第六步是否影响某个 open issue

![image-20210723150407822](https://tva1.sinaimg.cn/large/008i3skNgy1gsqwar8xp1j30fq00ya9x.jpg)

我们也可以在 scripts 中构建一个命令来执行 cz：

![image-20210723150526211](https://tva1.sinaimg.cn/large/008i3skNgy1gsqwc4gtkxj30e207174t.jpg)

#### 1.5.2. 代码提交验证

如果我们按照 cz 来规范了提交风格，但是依然有同事通过 `git commit` 按照不规范的格式提交应该怎么办呢？

- 我们可以通过 commitlint 来限制提交；

  1.安装 @commitlint/config-conventional 和 @commitlint/cli

```shell
npm i @commitlint/config-conventional @commitlint/cli -D
```

2.在根目录创建 commitlint.config.js 文件，配置 commitlint

```js
module.exports = { extends: ["@commitlint/config-conventional"] };
```

3.使用 husky 生成 commit-msg 文件，验证提交信息：

```shell
npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
```

## 二. 第三方库集成

### 2.1. vue.config.js 配置

vue.config.js 有三种配置方式：

- 方式一：直接通过 CLI 提供给我们的选项来配置：
  - 比如 publicPath：配置应用程序部署的子目录（默认是 `/`，相当于部署在 `https://www.my-app.com/`）；
  - 比如 outputDir：修改输出的文件夹；
- 方式二：通过 configureWebpack 修改 webpack 的配置：
  - 可以是一个对象，直接会被合并；
  - 可以是一个函数，会接收一个 config，可以通过 config 来修改配置；
- 方式三：通过 chainWebpack 修改 webpack 的配置：
  - 是一个函数，会接收一个基于 [webpack-chain](https://github.com/mozilla-neutrino/webpack-chain) 的 config 对象，可以对配置进行修改；

```js
const path = require('path')module.exports = {  outputDir: './build',  // configureWebpack: {  //   resolve: {  //     alias: {  //       views: '@/views'  //     }  //   }  // }  // configureWebpack: (config) => {  //   config.resolve.alias = {  //     '@': path.resolve(__dirname, 'src'),  //     views: '@/views'  //   }  // },  chainWebpack: (config) => {    config.resolve.alias.set('@', path.resolve(__dirname, 'src')).set('views', '@/views')  }}
```

### 2.2. vue-router 集成

安装 vue-router 的最新版本：

```shell
npm install vue-router@next
```

创建 router 对象：

```ts
import { createRouter, createWebHashHistory } from 'vue-router'import { RouteRecordRaw } from 'vue-router'const routes: RouteRecordRaw[] = [  {    path: '/',    redirect: '/main'  },  {    path: '/main',    component: () => import('../views/main/main.vue')  },  {    path: '/login',    component: () => import('../views/login/login.vue')  }]const router = createRouter({  routes,  history: createWebHashHistory()})export default router
```

安装 router：

```ts
import router from './router'createApp(App).use(router).mount('#app')
```

在 App.vue 中配置跳转：

```html
<template>
  <div id="app">
    <router-link to="/login">登录</router-link>
    <router-link to="/main">首页</router-link> <router-view></router-view></div
></template>
```

### 2.3. vuex 集成

安装 vuex：

```shell
npm install vuex@next
```

创建 store 对象：

```ts
import { createStore } from 'vuex'const store = createStore({  state() {    return {      name: 'coderwhy'    }  }})export default store
```

安装 store：

```ts
createApp(App).use(router).use(store).mount("#app");
```

在 App.vue 中使用：

```html
<h2>{{ $store.state.name }}</h2>
```

### 2.4. element-plus 集成

Element Plus，一套为开发者、设计师和产品经理准备的基于 Vue 3.0 的桌面端组件库：

- 相信很多同学在 Vue2 中都使用过 element-ui，而 element-plus 正是 element-ui 针对于 vue3 开发的一个 UI 组件库；
- 它的使用方式和很多其他的组件库是一样的，所以学会 element-plus，其他类似于 ant-design-vue、NaiveUI、VantUI 都是差不多的；

安装 element-plus

```shell
npm install element-plus
```

#### 2.4.1. 全局引入

一种引入 element-plus 的方式是全局引入，代表的含义是所有的组件和插件都会被自动注册：

```js
import ElementPlus from 'element-plus'import 'element-plus/lib/theme-chalk/index.css'import router from './router'import store from './store'createApp(App).use(router).use(store).use(ElementPlus).mount('#app')
```

#### 2.4.2. 局部引入

也就是在开发中用到某个组件对某个组件进行引入：

```vue
<template>
  <div id="app">
    <router-link to="/login">登录</router-link>
    <router-link to="/main">首页</router-link> <router-view></router-view>
    <h2>{{ $store.state.name }}</h2>
    <el-button>默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="success">成功按钮</el-button>
    <el-button type="info">信息按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
    <el-button type="danger">危险按钮</el-button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'import { ElButton } from 'element-plus'export default defineComponent({  name: 'App',  components: {    ElButton  }})
</script>
<style lang="less"></style>
```

但是我们会发现是没有对应的样式的，引入样式有两种方式：

- 全局引用样式（像之前做的那样）；
- 局部引用样式（通过 babel 的插件）；

  1.安装 babel 的插件：

```shell
npm install babel-plugin-import -D
```

2.配置 babel.config.js

```js
module.exports = {
  plugins: [
    [
      "import",
      {
        libraryName: "element-plus",
        customStyleName: (name) => {
          return `element-plus/lib/theme-chalk/${name}.css`;
        },
      },
    ],
  ],
  presets: ["@vue/cli-plugin-babel/preset"],
};
```

但是这里依然有个弊端：

- 这些组件我们在多个页面或者组件中使用的时候，都需要导入并且在 components 中进行注册；
- 所以我们可以将它们在全局注册一次；

```ts
import {  ElButton,  ElTable,  ElAlert,  ElAside,  ElAutocomplete,  ElAvatar,  ElBacktop,  ElBadge,} from 'element-plus'const app = createApp(App)const components = [  ElButton,  ElTable,  ElAlert,  ElAside,  ElAutocomplete,  ElAvatar,  ElBacktop,  ElBadge]for (const cpn of components) {  app.component(cpn.name, cpn)}
```

### 2.5. axios 集成

安装 axios：

```shell
npm install axios
```

封装 axios：

```ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'import { Result } from './types'import { useUserStore } from '/@/store/modules/user'class HYRequest {  private instance: AxiosInstance  private readonly options: AxiosRequestConfig  constructor(options: AxiosRequestConfig) {    this.options = options    this.instance = axios.create(options)    this.instance.interceptors.request.use(      (config) => {        const token = useUserStore().getToken        if (token) {          config.headers.Authorization = `Bearer ${token}`        }        return config      },      (err) => {        return err      }    )    this.instance.interceptors.response.use(      (res) => {        // 拦截响应的数据        if (res.data.code === 0) {          return res.data.data        }        return res.data      },      (err) => {        return err      }    )  }  request<T = any>(config: AxiosRequestConfig): Promise<T> {    return new Promise((resolve, reject) => {      this.instance        .request<any, AxiosResponse<Result<T>>>(config)        .then((res) => {          resolve((res as unknown) as Promise<T>)        })        .catch((err) => {          reject(err)        })    })  }  get<T = any>(config: AxiosRequestConfig): Promise<T> {    return this.request({ ...config, method: 'GET' })  }  post<T = any>(config: AxiosRequestConfig): Promise<T> {    return this.request({ ...config, method: 'POST' })  }  patch<T = any>(config: AxiosRequestConfig): Promise<T> {    return this.request({ ...config, method: 'PATCH' })  }  delete<T = any>(config: AxiosRequestConfig): Promise<T> {    return this.request({ ...config, method: 'DELETE' })  }}export default HYRequest
```

### 2.6. VSCode 配置

```json
{
  "workbench.iconTheme": "vscode-great-icons",
  "editor.fontSize": 17,
  "eslint.migration.2_x": "off",
  "[javascript]": { "editor.defaultFormatter": "dbaeumer.vscode-eslint" },
  "files.autoSave": "afterDelay",
  "editor.tabSize": 2,
  "terminal.integrated.fontSize": 16,
  "editor.renderWhitespace": "all",
  "editor.quickSuggestions": { "strings": true },
  "debug.console.fontSize": 15,
  "window.zoomLevel": 1,
  "emmet.includeLanguages": { "javascript": "javascriptreact" },
  "explorer.confirmDragAndDrop": false,
  "workbench.tree.indent": 16,
  "javascript.updateImportsOnFileMove.enabled": "always",
  "editor.wordWrap": "on",
  "path-intellisense.mappings": { "@": "${workspaceRoot}/src" },
  "hediet.vscode-drawio.local-storage": "eyIuZHJhd2lvLWNvbmZpZyI6IntcImxhbmd1YWdlXCI6XCJcIixcImN1c3RvbUZvbnRzXCI6W10sXCJsaWJyYXJpZXNcIjpcImdlbmVyYWw7YmFzaWM7YXJyb3dzMjtmbG93Y2hhcnQ7ZXI7c2l0ZW1hcDt1bWw7YnBtbjt3ZWJpY29uc1wiLFwiY3VzdG9tTGlicmFyaWVzXCI6W1wiTC5zY3JhdGNocGFkXCJdLFwicGx1Z2luc1wiOltdLFwicmVjZW50Q29sb3JzXCI6W1wiRkYwMDAwXCIsXCIwMENDNjZcIixcIm5vbmVcIixcIkNDRTVGRlwiLFwiNTI1MjUyXCIsXCJGRjMzMzNcIixcIjMzMzMzM1wiLFwiMzMwMDAwXCIsXCIwMENDQ0NcIixcIkZGNjZCM1wiLFwiRkZGRkZGMDBcIl0sXCJmb3JtYXRXaWR0aFwiOjI0MCxcImNyZWF0ZVRhcmdldFwiOmZhbHNlLFwicGFnZUZvcm1hdFwiOntcInhcIjowLFwieVwiOjAsXCJ3aWR0aFwiOjExNjksXCJoZWlnaHRcIjoxNjU0fSxcInNlYXJjaFwiOnRydWUsXCJzaG93U3RhcnRTY3JlZW5cIjp0cnVlLFwiZ3JpZENvbG9yXCI6XCIjZDBkMGQwXCIsXCJkYXJrR3JpZENvbG9yXCI6XCIjNmU2ZTZlXCIsXCJhdXRvc2F2ZVwiOnRydWUsXCJyZXNpemVJbWFnZXNcIjpudWxsLFwib3BlbkNvdW50ZXJcIjowLFwidmVyc2lvblwiOjE4LFwidW5pdFwiOjEsXCJpc1J1bGVyT25cIjpmYWxzZSxcInVpXCI6XCJcIn0ifQ==",
  "hediet.vscode-drawio.theme": "Kennedy",
  "editor.fontFamily": "Source Code Pro, 'Courier New', monospace",
  "editor.smoothScrolling": true,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "workbench.colorTheme": "Atom One Dark",
  "vetur.completion.autoImport": false,
  "security.workspace.trust.untrustedFiles": "open",
  "eslint.lintTask.enable": true,
  "eslint.alwaysShowStatus": true,
  "editor.codeActionsOnSave": { "source.fixAll.eslint": true }
}
```

## 三. 接口文档

https://documenter.getpostman.com/view/12387168/TzsfmQvw

baseURL 的值：

```
http://152.136.185.210:5000
```

设置全局 token 的方法：

```js
const res = pm.response.json();
pm.globals.set("token", res.data.token);
```

### esline 可选配置

```js
// http://eslint.org/docs/user-guide/configuring

module.exports = {
  // 将 ESLint 限制到一个特定的项目，在配置文件里设置 "root": true。ESLint 一旦发现配置文件中有 "root": true，它就会停止在父级目录中寻找。
  root: true,
  // 检测ES6代码
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module",
  },
  //
  env: {
    browser: true,
  },
  // 消除no-undef影响
  globals: {
    _: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: "standard",
  // required to lint *.vue files
  plugins: ["vue", "html"],
  // add your custom rules here
  //   0或’off’：关闭规则。
  // 1或’warn’：打开规则，并且作为一个警告（并不会导致检查不通过）。
  // 2或’error’：打开规则，并且作为一个错误 (退出码为1，检查不通过)。

  // 参数说明：
  // 参数1 ： 错误等级
  // 参数2 ： 处理方式
  rules: {
    "prefer-promise-reject-errors": 0,
    "space-unary-ops": 0,
    "no-unused-expressions": 0,
    "no-useless-return": 0,
    "standard/no-callback-literal": 0,
    "import/first": 0,
    "import/export": 0,
    "no-mixed-operators": 0,
    "no-use-before-define": 0,
    // 允许使用分号
    semi: [0, "never"],
    // 允许使用==
    eqeqeq: 0,
    // 缩进使用不做限制
    indent: 0,
    // 允许使用tab
    "no-tabs": 0,
    // 函数圆括号之前没有空格
    "space-before-function-paren": [2, "never"],
    // 不要求块内空格填充格式
    "padded-blocks": 0,
    // 不限制变量一起声明
    "one-var": 0,
    // debugger使用
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
    // 开发模式允许使用console
    "no-console": 0,
    // 条件语句中复制操作符需要用圆括号括起来
    "no-cond-assign": [2, "except-parens"],
    // 允许使用条件表达式使用常量
    "no-constant-condition": 0,
    // 单行可忽略大括号，多行不可忽略
    curly: [2, "multi-line"],
    // 不允许使用var变量
    "no-var": 2,
    // 不允许出现多个空格
    "no-multi-spaces": ["error", { ignoreEOLComments: true }],
    camelcase: 0,
    // 对象字面量的键值空格风格
    "key-spacing": 2,
    // if语句包含一个return语句， else就多余
    "no-else-return": 2,
    // 建议将经常出现的数字提取为变量
    "no-magic-numbers": [0, { ignoreArrayIndexes: true }],
    // 不允许重复声明变量
    "no-redeclare": [2, { builtinGlobals: true }],
    // 立即执行函数风格
    "wrap-iife": [2, "inside"],
    // 不允许圆括号中出现空格
    "space-in-parens": [2, "never"],
    // 确保运算符周围有空格
    "space-infix-ops": 2,
    // 强制点号与属性同一行
    "dot-location": [2, "property"],
    // 强制单行代码使用空格
    "block-spacing": [2, "always"],
    // 约束for-in使用hasOwnProperty判断
    "guard-for-in": 0,
    // 采用one true brace style大括号风格
    "brace-style": [2, "1tbs", { allowSingleLine: true }],
    // 统一逗号周围空格风格
    "comma-spacing": [2, { before: false, after: true }],
    // 禁止出现多个空行
    "no-multiple-empty-lines": [2, { max: 1, maxEOF: 2 }],
    // 允许箭头函数不使用圆括号
    "arrow-parens": 0,
    // 规范generator函数的使用
    "generator-star-spacing": [2, { before: false, after: true }],
    // 要求在块级
    "lines-around-comment": [
      2,
      {
        beforeBlockComment: true,
        afterBlockComment: false,
        beforeLineComment: true,
        afterLineComment: false,
      },
    ],
  },
};
```

# cms 项目

## 配置环境/prod/dev/test

配置开发环境，测试环境，生产环境等的切换。

通常有三种方式：

1. 第一种方式就是将所有的可能都列举出来，然后使用的时候进行注释。

2. 第二种方式：我们可以使用 process.env.NODE_ENV 这个变量。生产环境下，这个变量的值就是 production，开发环境就是 development。测试环境就是 test。我们在启动项目的时候，可以传这个参数。**npm run serve 就是开发环境，打包的话 build 就是生产环境了。**

3. 通过不同的配置文件进行指定。使用.env.production 来指定生产环境的相关配置。其他的环境也类似的使用。但是这个里面的变量只能使用特定的：比如 NODE*ENV，BASE_URL 等。如果想要个性化的配置变量：需要使用 VUE_APP*开头。后面的就任意了。**这是 cli 提供的功能。**取值的时候在前面加上 process.env.变量来获取。

   ```js

   ```

## axios 封装

对 axios 的拦截器的封装分为三部分：

1. 全局拦截器，对所有的请求全都生效。每一个封装的请求实例都会运用这些拦截器。
2. 实例拦截器。对我们每个封装的请求实例，都有自己的拦截器。
3. 请求拦截器。对某个请求单独生效的拦截器。

```ts
/*
 * @Author: 毛毛
 * @Date: 2021-09-29 21:39:45
 * @Last Modified by: 毛毛
 * @Last Modified time: 2021-10-03 14:49:23
 */

import type { AxiosRequestConfig, AxiosResponse } from "axios";
/**
 * 定义接口，里面可以传入参数，也就是axios的拦截器函数
 *
 * @interface MaoRequestInterceptor
 */
interface MaoRequestInterceptor {
  /**
   * 请求拦截器
   *
   * @memberof MaoRequestInterceptor
   */
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  /**
   * 请求发送错误的拦截器
   *
   * @memberof MaoRequestInterceptor
   */
  requestInterceptorCatch?: (error: any) => any;
  /**
   * 响应拦截
   *
   * @memberof MaoRequestInterceptor
   */
  responseInterceptor?: (config: AxiosResponse) => AxiosResponse;
  /**
   * 响应发送错误时拦截器
   *
   * @memberof MaoRequestInterceptor
   */
  responseInterceptorCatch?: (error: any) => any;
}
/**
 * 对 AxiosRequestConfig 的请求配置接口做出拓展
 * 可以传递拦截器，供请求对象使用
 *
 * @interface MaoRequestConfig
 * @extends {AxiosRequestConfig}
 */
interface MaoRequestConfig extends AxiosRequestConfig {
  /**
   * 请求拦截器
   *
   * @type {MaoRequestInterceptor}
   * @memberof MaoRequestConfig
   */
  interceptors?: MaoRequestInterceptor;
}

export { MaoRequestConfig, MaoRequestInterceptor };
```

```ts
/*
 * @Author: 毛毛
 * @Date: 2021-09-29 20:21:07
 * @Last Modified by: 毛毛
 * @Last Modified time: 2021-09-29 22:21:35
 */
import axios, { AxiosResponse } from "axios";
import type { AxiosInstance } from "axios";
import type { MaoRequestConfig, MaoRequestInterceptor } from "./type";
/**
 * 请求类 封装发起网络请求的类，
 * 解除项目和第三方请求库的耦合
 */
export default class MaoRequest {
  /**
   * axios实例对象，为了有多个请求地址的情况做铺垫
   *
   * @type {AxiosInstance}
   * @memberof MaoRequest
   */
  private instance: AxiosInstance;
  /**
   * 拦截器
   *
   * @private
   * @type {MaoRequestInterceptor}
   * @memberof MaoRequest
   */
  private interceptors?: MaoRequestInterceptor;
  /**
   * Creates an instance of MaoRequest.
   * @param {MaoRequestConfig} config 请求相关配置
   * @memberof MaoRequest
   */
  constructor(config: MaoRequestConfig) {
    this.instance = axios.create(config);
    this.interceptors = config.interceptors;
    // TODO  注意：请求拦截器是先添加的后执行，后添加的先执行 有点像 f(g(x)) 符合函数的味道。响应拦截器就是按照顺序了。
    // 注册拦截器
    this.registerInterceptor();
    this.registerGlobalInterceptor();
  }
  /**
   * 发起请求，获取异步数据
   *
   * @param {MaoRequestConfig} config 请求相关参数
   * @return {*}  {Promise<AxiosResponse>}
   * @memberof MaoRequest
   */
  async request(config: MaoRequestConfig): Promise<AxiosResponse> {
    // 请求参数config中也配置了拦截器，则为这次请求单独执行一次拦截器
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config);
    }
    const res = await this.instance.request(config);
    // 执行属于请求自己的响应拦截器
    if (config.interceptors?.responseInterceptor) {
      config = config.interceptors.responseInterceptor(res);
    }
    return res;
  }

  /**
   *
   * 注册 实例 拦截器的方法
   * @private
   * @memberof MaoRequest
   */
  private registerInterceptor(): void {
    // 注册拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch,
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch,
    );
  }
  /**
   * 注册全局的拦截器 对每个实例都生效
   *
   * @private
   * @memberof MaoRequest
   */
  private registerGlobalInterceptor(): void {
    this.instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return error;
      },
    );
    this.instance.interceptors.response.use(
      (config) => {
        return config;
      },
      (error) => {
        return error;
      },
    );
  }
}
```

### ts 的获取类型语法

```ts
ref<InstanceType<typeof LoginAccount>>
```

使用这个语法，可以获取导出的 vue 组件的类型。也可以获取其他对象的类型。

vue 单文件 sfc 组件，导出的是一**个对象**（组件的描述）。这个对象并不是实例化过的那种对象，导出的其实是类似于 class 类一样的对某种结构进行了封装。比如我们的 Login.vue 文件，我们在使用的时候 **`<login/>`**这才是这个 vue 组件的实例。根据导出的对象创建出一个真正的组件实例。

vue 单文件组件导出的是一个描述对象。并不是我们使用泛型时可以传递的类型。
InstanceType<typeof Login> 可以帮助我们去某个类型里面取到我们拥有构造函数的实例。也就是我们需要的类型。
