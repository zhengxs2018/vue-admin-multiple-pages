# vuejs 后台类多页模板

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

基于 [vue-cli 3.x][vue-cli] 脚手架修改，支持 [vuejs 2.x][vuejs] 和 [view design][view design] 开发的的后台管理页面。

## 功能特色

* 多页配置支持剔除公共第三方包，并且在构建后重新插入到页面中
* 支持页面预渲染配置，如渲染 404, 500 等路由成独立页面
* 支持 mock server 配置

## 目录结构

```bash
Project files/
├── .vscode/
├── config/                             ---- 静态资源
│   ├── index.js                        ---- 多页配置与第三方包剔除
│   ├── proxy.js                        ---- 代理配置，说明详见 https://github.com/chimurai/http-proxy-middleware
│   └── theme-config.js                 ---- 全局主题配置，用于配置 sass 或者 less 中使用到的全局变量
├── mocks/                              ---- 模拟接口配置，配置说明详见 mock 数据编写
├── docs/
├── public/
├── scripts/                            ---- 工程辅助脚本
│   ├── create-page.js                  ---- 创建独立页面配置
│   ├── loader.js                       ---- 文件加载器
│   ├── mock-server.js                  ---- 代理配置
│   └── theme-variables.js              ---- 主题变量转换
├── src/
│   ├── assets/                         ---- 公共资源
│   │   ├── images                      ---- 公共图片
│   │   └── styles                      ---- 全局样式
│   ├── includes/                       ---- 布局碎片，比如布局头部，侧边栏
│   ├── layouts/                        ---- 布局结构文件
│   ├── store/                          ---- 全局 vuex 模块
│   ├── pages/                          ---- 多页面入口，注意新增的页面必须在
│   │   ├── index/                      ---- 首页
│   │   │   ├── models/                 ---- vuex 模块，会自动加载
│   │   │   ├── routes/                 ---- 注意按模块拆分路由，会自动加载
│   │   │   ├── views/                  ---- 路由视图文件
│   │   │   ├── main.js                 ---- 单应用入口文件，每一个页面都需要存在
│   │   │   ├── router.js               ---- 如果应用不需要路由可以去除
│   │   │   └── store.js                ---- 不需要 vuex 辅助的可以去除
│   │   └── login/
│   ├── service/                        ---- 公共接口服务
│   └── system/                         ---- 公共函数
├── tests/
├── package.json
├── project.config.js                   ---- 项目配置，主要用于配置多页
└── README.md
```

## 启动项目

你需要安装 [node.js][node.js] 的版本为 `nodejs >= 8.0`。

克隆此仓库后运行:

```shell
# 安装依赖，推荐使用 yarn 或 cnpm 安装
$ npm install

# 启动开发模式
# 使用 nodemon 监听工程文件变化
# 当 scripts，config，mocks，vue.config.js 修改会自动重启
$ npm run dev

# 启动本地服务
$ npm run serve

# 分析包内容
$ npm run build --analyze && npm run analyze
```

在 `package.json` 文件的 `scripts` 部分还有一些其他脚本可用.

## 文档

- [新增页面](./docs/create-page.md)
- [编写 mock 数据](./docs/mock.md)

## 升级日志

[ChangeLog](./docs/CHANGELOG.md).

[node.js]: https://nodejs.org/
[vue-cli]: https://cli.vuejs.org/
[vuejs]: https://cn.vuejs.org/
[view design]: https://iviewui.com/
