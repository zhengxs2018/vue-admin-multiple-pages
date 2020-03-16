/* eslint-disable @typescript-eslint/no-var-requires */
const { keyBy, mapValues, flatten, size } = require('lodash')

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const config = require('./config/index')
const proxyTable = require('./config/proxy')
const themeConfig = require('./config/theme-config')

const MockServer = require('./scripts/mock-server')
const createPage = require('./scripts/create-page')
const { toSassVariables } = require('./scripts/theme-variables')

const isProd = process.env.NODE_ENV === 'production'
const isAnalyze =
  process.env.npm_config_analyze === 'true' ||
  process.argv.indexOf('--analyze') > -1

const vendors = config.vendors
const pages = config.pages.map(createPage)

const configureWebpack = {
  devtool: 'source-map'
}

if (isProd) {
  const plugins = flatten(pages.map(c => c.plugins))

  configureWebpack.externals = [vendors]
  configureWebpack.plugins = plugins

  if (isAnalyze) {
    configureWebpack.plugins.push(new BundleAnalyzerPlugin())
  }
}

module.exports = {
  // outputDir 和 assetsDir 在 config/index 中配置，create-page 方法强依赖属性
  outputDir: config.outputDir,
  assetsDir: config.assetsDir,
  pages: mapValues(keyBy(pages, 'name'), 'options'),
  lintOnSave: false,
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: toSassVariables(themeConfig)
      },
      less: {
        globalVars: themeConfig
      }
    }
  },
  configureWebpack,
  chainWebpack(config) {
    config.module.noParse(new RegExp(`^(${Object.keys(vendors).join('|')})$`))
  },
  devServer: {
    before(app) {
      MockServer.create({ prefix: '/api' }).attach(app)
    },
    proxy: size(proxyTable) > 0 ? proxyTable : undefined,
    historyApiFallback: {
      rewrites: pages.reduce((rewrites, { name, route, filename }) => {
        if (name === 'index') return rewrites
        return rewrites.concat({ from: route, to: '/' + filename })
      }, [])
    }
  }
}
