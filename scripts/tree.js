/* eslint-disable @typescript-eslint/no-var-requires */
const get = require('lodash/get')

function reduceTree(tree, callback, parent) {
  return tree.reduce((rows, node, index) => {
    const { children = [], ...data } = node
    const row = callback(data, parent, rows, index)
    if (!row) return rows

    if (children.length === 0) {
      return rows.concat(row)
    }

    return rows.concat(row, reduceTree(children, callback, row))
  }, [])
}

function mapTree(tree, callback, parent) {
  return tree.map(({ children = [], ...data }, index) => {
    const node = callback(data, parent, index)

    if (children.length > 0) {
      node.children = mapTree(children, callback, node)
    }

    return node
  })
}

function rowToTree(collection, rootId) {
  const nodes = {}

  collection.forEach(data => {
    const { id, parentId } = data

    nodes[id] = {
      children: [],
      ...data
    }
    nodes[parentId] = {
      children: [],
      ...nodes[parentId]
    }
    nodes[parentId].children.push(data)
  })

  if (typeof rootId === 'function') {
    return rootId(nodes)
  }

  return get(nodes, `${rootId}.children`, [])
}

module.exports = {
  reduceTree,
  mapTree,
  rowToTree
}
