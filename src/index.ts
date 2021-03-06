interface TreeType {
  id: number
  val: number
  left: TreeType | null
  right: TreeType | null
}

type NodeType = Omit<TreeType, 'id'>

function isUndefined(prop: any): prop is undefined {
  return typeof prop === 'undefined'
}

/**
 * valid elements is numbers like -1,0, 1,2.2,3.1415..., other values will covert to null
 */
function isNum(prop: any): boolean {
  // eslint-disable-next-line no-self-compare
  return typeof prop === 'number' && prop === prop
}

function createNode(val: number, id: number, left?: TreeType | null, right?: TreeType | null): TreeType {
  return {
    val,
    id,
    left: isUndefined(left) ? null : left,
    right: isUndefined(right) ? null : right,
  }
}

/**
 * build a binary tree from array that only has number or null elements
 * root start by rootIndex, if you set this, the root node is it
 * before you want change this, please read this article first to compatible with it:
 * https://support.leetcode.com/hc/en-us/articles/360011883654-What-does-1-null-2-3-mean-in-binary-tree-representation-
 */
export function numsToTree(arr: Array<number | null>, rootIndex = 0): NodeType | null {
  if (!arr?.length || typeof arr[rootIndex] !== 'number') {
    return null
  }

  const root = createNode(arr[rootIndex] as number, rootIndex)

  buildTreeByIndex(root, rootIndex, arr)
  removeIdFromTree(root, 'id')

  return root
}

/**
 * add every nums to the tree
 * first find the node's parent Node
 * then insert the Node
 */
function buildTreeByIndex(root: TreeType, rootIndex: number, arr: Array<number | null>): void {
  // cache previous level nodes as next leve parents nodes
  const parents: number[] = [rootIndex]
  // cache first child array index to avoid copy values
  let firstChildIndex = rootIndex + 1

  // when last leaves found, parent is empty
  while (parents.length > 0) {
    // slice children nodes base parents count
    const childrenCounter = 2 * parents.length
    // next parent count
    let parentCounter = 0

    // childIndex is last index of current children
    let childIndex = firstChildIndex

    // set left child and right child to every parent node
    for (const parent of parents) {
      if (childIndex >= arr.length) {
        break
      }

      if (childIndex < arr.length) {
        const leftLeaf = isNum(arr[childIndex]) ? createNode(arr[childIndex]!, childIndex) : null
        insertNodeToTree(root, parent, leftLeaf, true)
        childIndex += 1
      }
      if (childIndex < arr.length) {
        const rightLeaf = isNum(arr[childIndex]) ? createNode(arr[childIndex]!, childIndex) : null
        insertNodeToTree(root, parent, rightLeaf, false)
        childIndex += 1
      }
    }

    // set current children to next parent, childIndex will be next first child
    for (let i = firstChildIndex; i < childIndex; i++) {
      if (isNum(arr[i])) {
        parents[parentCounter] = i
        parentCounter += 1
      }
    }

    // remove redundant parent nodes
    parents.length = parentCounter
    // set next leve first child index
    firstChildIndex += childrenCounter
  }
}

/**
 * find the Node place and insert it
 * there are lots of place in insertNodeToTree function for optimization
 * because it repeated the search many times
 * this is where the current performance bottleneck is biggest
 * but for now I'm not going to optimize this function
 */
function insertNodeToTree(
  root: TreeType | null,
  parentIndex: number,
  node: TreeType | null,
  isLeftLeaf: Boolean
): void {
  if (!root || parentIndex < 0 || !node) {
    return
  }
  if (root.id === parentIndex) {
    if (isLeftLeaf && root.left === null) {
      root.left = node
    } else if (!isLeftLeaf && root.right === null) {
      root.right = node
    } else {
      throw new Error(`Insert Failed, there are no more place in Node -> val:${root.val} id:${root.id}`)
    }
    return
  }

  insertNodeToTree(root.left, parentIndex, node, isLeftLeaf)
  insertNodeToTree(root.right, parentIndex, node, isLeftLeaf)
}

/**
 * remove a property in the whole tree
 */
function removeIdFromTree(root: TreeType | null, property: keyof TreeType): void {
  if (!root) {
    return
  }

  delete root[property]
  removeIdFromTree(root.left, property)
  removeIdFromTree(root.right, property)
}
