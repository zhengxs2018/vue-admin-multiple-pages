/* eslint-disable @typescript-eslint/no-var-requires */
const { forOwn } = require('lodash')

function toSassVariables(themeConfig) {
  const variables = []
  forOwn(themeConfig, (key, value) => {
    variables.push(`$${key}: ${value};`)
  })
  return variables.join('')
}

module.exports = {
  toSassVariables
}
