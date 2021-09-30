const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

module.exports = {
  // 打包后的文件夹
  outputDir: "./build",
  configureWebpack: {
    resolve: {
      alias: {
        // 默认已经配置过 @ = src的路径了
        components: "@/components",
      },
    },
    module: {
      // 解决命令行警告
      unknownContextCritical: false,
    },
    plugins: [
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
  // TODO 配置的三种方式 1
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       // 默认已经配置过 @ = src的路径了
  //       components: "@/components",
  //     },
  //   },
  // },
  // TODO 配置的三种方式 2
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     "@": path.resolve(__dirname, "src"),
  //     "components": "@/components"
  //   },
  // }
  // TODO 配置的三种方式 3
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set("@", path.resolve(__dirname, "src"))
  //     .set("components", "@/components");
  // },
};
