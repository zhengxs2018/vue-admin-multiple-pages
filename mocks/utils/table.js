/* eslint-disable @typescript-eslint/no-var-requires */
const get = require('lodash/get')
const { mock, Random } = require('mockjs')

const { reduceTree, mapTree } = require('../../scripts/tree')

function unwrap(val, ...args) {
  return typeof val === 'function' ? val(...args) : val
}

function treeToRowData(collection, root) {
  /* eslint-disable prettier/prettier */
  return reduceTree(collection, (data, parent) => {
    return mock({ parentId: parent.id || null, id: '@id()', ...data })
  }, root || {})
  /* eslint-enable prettier/prettier */
}

function fillTreeData(collection, extra) {
  return mapTree(collection, (data, parent) => {
    return {
      id: Random.id(),
      parentId: get(parent, 'id', null),
      ...data,
      ...mock(unwrap(extra, data))
    }
  })
}

module.exports = {
  treeToRowData,
  fillTreeData
}
