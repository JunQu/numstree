import { TreeNode } from './typing.js'

function createNode<T = unknown>(val: null | undefined | T): TreeNode<T> | null {
  if (typeof val === 'undefined' || val === null) {
    return null
  }

  return {
    val,
    left: null,
    right: null,
  }
}

export function deserialize<ValType = unknown>(arr: Array<ValType | null>, rootIndex = 0): TreeNode<ValType> | null {
  if (
    !Array.isArray(arr) ||
    arr.length === 0 ||
    rootIndex < 0 ||
    arr[rootIndex] === null ||
    arr[rootIndex] === undefined
  ) {
    return null
  }

  let index = rootIndex
  const arrLen = arr.length
  const children = ['left', 'right'] as const
  const queue: TreeNode<ValType>[] = []
  const root = createNode(arr[index])!
  // traversal arr tree use BFS method to build tree structure
  queue.push(root)
  while (queue.length && index < arrLen) {
    let len = queue.length
    while (len) {
      const parentNode = queue.shift()!
      for (const child of children) {
        index += 1
        const childNode = index > arrLen - 1 ? null : createNode(arr[index])
        parentNode[child] = childNode
        // add this tree node for next children nodes
        if (childNode) {
          queue.push(childNode)
        }
      }
      len -= 1
    }
  }

  return root
}
