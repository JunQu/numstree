type TreeType = {
  id: number
  val: number
  left?: TreeType | null
  right?: TreeType | null
}

type NodeType = Omit<TreeType, 'id'>

function isUndefined(prop: any): boolean {
  return typeof prop === 'undefined'
}

function isNum(prop: any): boolean {
  return typeof prop === 'number' && prop === prop
}

function createNode(val: number, id: number, left?: TreeType | null, right?: TreeType | null): TreeType {
  return {
    val,
    id,
    left: isUndefined(left) ? null : right,
    right: isUndefined(right) ? null : right,
  }
}

export function numsToTree(arr: (number | null)[], rootIndex = 0): NodeType | null {
  if (!arr.length || typeof arr[rootIndex] !== 'number') {
    return null
  }

  const root = createNode(arr[rootIndex], rootIndex)

  buildTreeByIndex(root, rootIndex, arr)
  removeIdFromTree(root, 'id')

  return root
}

function buildTreeByIndex(root: TreeType, rootIndex: number, arr: (number | null)[]): void {
  let parents: number[] = [rootIndex]
  let firstChildIndex = rootIndex + 1

  while (parents.length) {
    const childrenCounter = 2 * parents.length
    let parentCounter = 0

    let childIndex = firstChildIndex
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

    for (let i = firstChildIndex; i <= Math.min(childIndex, arr.length - 1); i++) {
      if (isNum(arr[i])) {
        parents[parentCounter] = i
        parentCounter += 1
      }
    }

    parents.length = parentCounter
    firstChildIndex += childrenCounter
  }
}

/**
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

function removeIdFromTree(root: TreeType | null, property: string): void {
  if (!root) {
    return
  }
  delete root[property]
  removeIdFromTree(root.left, property)
  removeIdFromTree(root.right, property)
}
