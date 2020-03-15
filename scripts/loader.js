/* eslint-disable @typescript-eslint/no-var-requires */
const { join, resolve } = require('path')

const globby = require('globby')

function fileLoader(pattern, resolver, options) {
  const { cwd, root, initialValue = [] } = options || {}
  const files = globby.sync(pattern, {
    cwd: cwd || resolve(join(__dirname, '..'), root),
    followSymbolicLinks: false,
    absolute: true
  })

  return files.reduce((accumulator, filename, index) => {
    return resolver(accumulator, filename, index)
  }, initialValue || [])
}

function moduleResolver(modules, filename) {
  return modules.concat({ filename: filename, source: require(filename) })
}

function moduleLoader(options = {}, customizer = moduleResolver) {
  const { pattern = '**/*.js', ...opts } = options
  const resolver = (accumulator, filename) => {
    return customizer(require(filename), filename, accumulator)
  }
  return fileLoader(pattern, resolver, opts)
}

module.exports = {
  moduleLoader,
  fileLoader
}
