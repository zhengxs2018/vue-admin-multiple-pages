/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require('path')
const { existsSync, statSync } = require('fs')

const { get, size } = require('lodash')

const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const PuppeteerRender = require('@prerenderer/renderer-puppeteer')

const { assetsDir = 'static', outputDir = 'dist' } = require('../config/index')

const workspaceFolder = resolve(__dirname, '..')
const extensions = ['.ts', '.tsx', '.js', '.jsx', '.vue']

const isFile = path => {
  return existsSync(path) && statSync(path).isFile()
}

function getEntry(name) {
  const extname = extensions.find(extname => {
    return isFile(
      resolve(workspaceFolder, `./src/pages/${name}/main${extname}`)
    )
  })
  return `./src/pages/${name}/main${extname}`
}

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
function createPage(options) {
  const { name, base } = options
  const {
    route,
    entry = getEntry(name),
    filename = `${name}.html`,
    plugins = [],
    vendors = {},
    prerender = {},
    ...extraOptions
  } = options

  if (get(vendors, 'packages.length', 0) > 0) {
    plugins.push(
      new HtmlWebpackExternalsPlugin({
        hash: true,
        files: [filename],
        outputPath: `${assetsDir}/vendors`,
        externals: vendors.packages
      })
    )
  }

  if (prerender.enabled !== false && size(prerender.routes) > 0) {
    const outputPath = resolve(workspaceFolder, outputDir)
    const { routes, ...renderOptions } = prerender
    plugins.push(
      new PrerenderSPAPlugin({
        routes: routes,
        staticDir: resolve(outputPath, name),
        indexPath: resolve(outputPath, filename),
        renderer: new PuppeteerRender({
          renderAfterDocumentEvent: 'custom-render-ready',
          renderAfterTime: 5000,
          ...renderOptions
        })
      })
    )
  }

  return {
    name: name,
    filename: filename,
    route: route || new RegExp(base || `/(${name})`),
    options: { ...extraOptions, entry, filename },
    plugins: plugins
  }
}

module.exports = createPage
