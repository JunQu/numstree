class SignTree {
  val: number
  left: SignTree | null
  right: SignTree | null
  id?: number
  constructor(val?: number, id?: number, left?: SignTree | null, right?: SignTree | null) {
    // super(val, left, right)
    this.id = typeof id === 'number' ? id : Math.random()
    this.val = typeof val === 'number' ? val : 0
    this.left = typeof left === 'object' ? left : null
    this.right = typeof right === 'object' ? right : null
  }
}

export function numsToTree(arr: (number | null)[]): SignTree | null {
  if (!arr.length || typeof arr[0] !== 'number') {
    return null
  }

  const root = new SignTree(arr[0], 0)
  let parents: number[] = [0]
  let firstIndex = 1

  while (parents.length) {
    const parentCounter = parents.length
    const childrenCounter = 2 * parentCounter
    let parentLen = 0

    let childIndex = firstIndex
    for (const parent of parents) {
      if (childIndex >= arr.length) {
        break
      }

      if (childIndex < arr.length) {
        const leftLeaf = typeof arr[childIndex] === 'number' ? new SignTree(arr[childIndex]!, childIndex) : null
        insertNodeToTree(root, parent, leftLeaf, true)
        childIndex += 1
      }
      if (childIndex < arr.length) {
        const leftLeaf = typeof arr[childIndex] === 'number' ? new SignTree(arr[childIndex]!, childIndex) : null
        insertNodeToTree(root, parent, leftLeaf, false)
        childIndex += 1
      }
    }

    for (let i = firstIndex; i <= Math.min(childIndex, arr.length - 1); i++) {
      if (typeof arr[i] === 'number') {
        parents[parentLen] = i
        parentLen += 1
      }
    }

    parents.length = parentLen
    firstIndex += childrenCounter
  }

  removeIdFromTree(root, 'id')

  return root
}

/**
 * there are lots of place in insertNodeToTree function for optimization
 * because it repeated the search many times
 * this is where the current performance bottleneck is biggest
 * but for now I'm not going to optimize this function
 */
const insertNodeToTree = (
  root: SignTree | null,
  parentIndex: number,
  node: SignTree | null,
  isLeftLeaf: Boolean
): void => {
  if (!root || parentIndex < 0 || !node) {
    return
  }
  if (root.id === parentIndex) {
    if (isLeftLeaf && root.left === null) {
      root.left = node
    } else if (!isLeftLeaf && root.right === null) {
      root.right = node
    } else {
      throw new Error(`Insert Error, there are no place in Node: ${root.id}`)
    }
    return
  }

  insertNodeToTree(root.left, parentIndex, node, isLeftLeaf)
  insertNodeToTree(root.right, parentIndex, node, isLeftLeaf)
}

const removeIdFromTree = (root: SignTree | null, property: string): void => {
  if (!root) {
    return
  }
  delete root[property]
  removeIdFromTree(root.left, property)
  removeIdFromTree(root.right, property)
}
