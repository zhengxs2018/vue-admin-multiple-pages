/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

const { get } = require('lodash')

const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const PrerenderSPAPlugin = require('prerender-spa-plugin')

const { assetsDir = 'static', outputDir = 'dist' } = require('../config/index')

/**
 * 创建页面配置
 *
 * @param {Object} options
 * @param {String} options.name       chunkId, 必须，注意 index 为特殊值
 * @param {RegExp} options.route      路由，可选
 * @param {String} options.base       起始地址，路由页需要，可选
 * @param {String} options.title      页面标题，可选
 * @param {String} options.filename   输入文件名称，可选
 * @param {String} options.template   模板名称，可选
 * @param {String} options.entry      入口文件，可选
 * @param {Object} options.vendors    插入已被剔除的第三方插件，可选 See https://www.npmjs.com/package/html-webpack-externals-plugin
 * @param {Object}   options.vendors.enabled       当前页是否启用预渲染
 * @param {Object[]} options.vendors.packages      需要插入的第三方模块
 * @param {Object} options.prerender
 * @param {Object}   options.prerender.enabled     当前页是否启用预渲染
 * @param {String[]} options.prerender.routes      需要预渲染的路由页
 *
 * @example
 *
 *  createPage({
 *    name: 'login',
 *    title: '登陆页',
 *    vendors: {
 *      enabled: process.env.NODE_ENV === 'production',
 *      externals: [
 *        { module: 'axios', entry: 'dist/axios.min.js' },
 *        { module: 'vue', entry: 'dist/vue.runtime.min.js' }
 *      ]
 *    }
 *  })
 */
module.exports = function createPage(options) {
  const { name, base } = options
  const {
    route,
    entry = `./src/pages/${name}/main.ts`,
    filename = `${name}.html`,
    plugins = [],
    vendors = {},
    prerender = {},
    ...extraOptions
  } = options

  if (get(vendors, 'externals.length', 0) > 0) {
    plugins.push(
      new HtmlWebpackExternalsPlugin({
        hash: true,
        files: [filename],
        outputPath: `${assetsDir}/vendors`,
        externals: vendors.packages
      })
    )
  }

  if (prerender.enabled !== false && get(options, 'routes.length', 0) > 0) {
    plugins.push(
      new PrerenderSPAPlugin({
        indexPath: path.join(__dirname, '..', outputDir, filename),
        routes: prerender.routes,
        renderAfterDocumentEvent: prerender.onDocumentReadyEvent || 'on-mounted'
      })
    )
  }

  return {
    name: name,
    filename: filename,
    route: route || new RegExp(base || `/(${name})`),
    options: { entry, filename, ...extraOptions },
    plugins: plugins
  }
}
