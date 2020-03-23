import { isNil, get } from 'lodash-es'

import { unwrap } from '@/system/utils/functional'

export interface TreeNode {
  id: string | number
  parentId: string | number | null
  children: TreeNode[]
  [key: string]: any
}

export function rowToTree<T extends TreeNode>(
  collection: T[] = [],
  callback: (node: T) => T | false = n => n,
  rootId?: string | ((node?: T) => string)
): T[] {
  rootId = rootId || '__ROOT__'

  const nodes: Record<string, T> = {}

  for (let i = 0, len = collection.length; i < len; i++) {
    const node = callback(collection[i])
    if (node === false) continue

    node.children = node.children || []
    nodes[node.id] = node

    const parentId = isNil(node.parentId)
      ? unwrap<string>(rootId, node)
      : node.parentId
    const parent = { children: [], ...nodes[parentId] }

    parent.children.push(node)
    nodes[parentId] = parent
  }

  return get(nodes, `${unwrap(rootId)}.children`, []) as T[]
}

export function eachTree<T extends TreeNode>(
  tree: T[],
  callback: (node: T, parents: T[]) => void,
  parents: T[] = []
): void {
  tree.forEach(node => {
    const children = node.children || []
    if (children.length > 0) {
      eachTree(children as T[], callback, parents.concat(node))
    } else {
      callback(node, parents)
    }
  })
}
