import { TreeNode } from './typing.js'
import { notEmptyNode } from './util.js'

export function serialize<T = unknown>(root: TreeNode<T> | null): (T | null)[] {
  // collect all values
  const arr: Array<T | null> = []
  // root is empty
  if (!root || !notEmptyNode(root)) {
    return arr
  }

  // use BFS to traversal the root elements
  const queue: (TreeNode<T> | null)[] = []
  queue.push(root)

  while (queue.length > 0) {
    const node = queue.shift()
    const val = notEmptyNode(node) ? node.val : null
    arr.push(val)
    if (notEmptyNode(node)) {
      queue.push(node.left)
      queue.push(node.right)
    }
  }
  // remove leave's empty value
  while (arr.length > 0 && arr[arr.length - 1] === null) {
    arr.pop()
  }

  return arr
}
