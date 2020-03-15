# 新增页面

## 新增配置

在 `config/index.js` 文件中的 `pages` 新增一个配置对象

```javascript
module.exports = {
  pages: [
    {
      name: 'index', // 页面名称，必须唯一
      title: '首页', //  页面标题
      // 如果使用 webpack 剔除了 vue，vue-router 等模块
      // 可以在这里配置之后重新插入到页面中
      vendors: {
        enabled: process.env.NODE_ENV === 'production',
        packages: [
          { module: 'axios', entry: 'dist/axios.min.js' },
          { module: 'vue', entry: 'dist/vue.runtime.min.js' }
          { module: 'vuex', entry: 'dist/vuex.min.js' },
          { module: 'vue-router', entry: 'dist/vue-router.min.js' }
        ]
      }
    }
  ]
}
```

## 新增页面

在 `src/pages/{和配置的 name 对应}.ts` 文件，这个就是当前页的入口文件

