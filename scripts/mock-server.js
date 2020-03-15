/* eslint-disable @typescript-eslint/no-var-requires */
const braces = require('braces')
const { forOwn } = require('lodash')
const { mock } = require('mockjs')

const { Router } = require('express')

const { moduleLoader } = require('./loader')

class Server {
  constructor(options = {}) {
    this.router = new Router()
    this.options = options
    this.init(options)
  }

  init(options = {}) {
    const { root = 'mocks' } = options

    moduleLoader({ root }, rules => {
      if (Array.isArray(rules)) {
        rules.map(rule => this.parse(rule))
      } else {
        this.parse(rules)
      }
    })
  }

  parse(config) {
    forOwn(config, (middleware, route) => {
      const [method, path] = route.trim().split(/\s+/)
      const methods = braces(method, { expand: true }).map(m => m.toLowerCase())
      this.register(methods, path, middleware)
    })
  }

  register(methods, path, middleware) {
    const router = this.router
    methods.forEach(method => {
      if (typeof middleware === 'function') {
        router[method.toLowerCase()](path, middleware)
      } else {
        router[method.toLowerCase()](path, (req, res) => {
          res.json(mock(middleware))
        })
      }
    })
  }

  attach(app, prefix) {
    app.use(prefix || this.options.prefix || '/', this.router)
  }

  static create(options) {
    return new Server(options)
  }
}

module.exports = Server
