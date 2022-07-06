import { it, describe, expect } from 'vitest'
import { numsToTree } from './index'

describe('tests for numsToTree', () => {
  it('Full tree', () => {
    const arr1 = [1, 2, 3]
    const arr2 = [1, 2, 3, 4, 5, 6, 7] // 2**n - 1

    const tree1 = {
      val: 1,
      left: { val: 2, left: null, right: null },
      right: { val: 3, left: null, right: null },
    }
    const tree2 = {
      val: 1,
      left: {
        val: 2,
        left: {
          val: 4,
          left: null,
          right: null,
        },
        right: {
          val: 5,
          left: null,
          right: null,
        },
      },
      right: {
        val: 3,
        left: {
          val: 6,
          left: null,
          right: null,
        },
        right: {
          val: 7,
          left: null,
          right: null,
        },
      },
    }

    expect(numsToTree(arr1)).toEqual(tree1)
    expect(numsToTree(arr2)).toEqual(tree2)
  })

  it('only left nodes', () => {
    const arr1 = [1, 2, null, 3]

    const tree1 = {
      val: 1,
      right: null,
      left: {
        val: 2,
        right: null,
        left: {
          val: 3,
          left: null,
          right: null,
        },
      },
    }

    expect(numsToTree(arr1)).toEqual(tree1)
  })

  it('only right nodes', () => {
    const arr1 = [1, null, 2, null, 3]

    const tree1 = {
      val: 1,
      left: null,
      right: {
        val: 2,
        left: null,
        right: {
          val: 3,
          left: null,
          right: null,
        },
      },
    }

    expect(numsToTree(arr1)).toEqual(tree1)
  })

  it('trees of different shapes', () => {
    const arr1 = [1, 2, null, 3, null, null, 4, 5, 6, null]

    const tree1 = {
      val: 1,
      left: {
        val: 2,
        left: {
          val: 3,
          left: null,
          right: {
            val: 4,
            left: { val: 5, left: null, right: null },
            right: { val: 6, left: null, right: null },
          },
        },
        right: null,
      },
      right: null,
    }

    expect(numsToTree(arr1)).toEqual(tree1)
  })
})

// from https://support.leetcode.com/hc/en-us/articles/360011883654-What-does-1-null-2-3-mean-in-binary-tree-representation-
describe('some test for leetcode', () => {
  it('simple tree', () => {
    const arr1:number[] = []
    const arr2 = [1, 2, 3]
    const arr3 = [1, null, 2, 3]

    const tree1 = null
    const tree2 = { val: 1, left: { val: 2, left: null, right: null }, right: { val: 3, left: null, right: null } }
    const tree3 = { val: 1, left: null, right: { val: 2, left: { val: 3, left: null, right: null }, right: null } }

    expect(numsToTree(arr1)).toEqual(tree1)
    expect(numsToTree(arr2)).toEqual(tree2)
    expect(numsToTree(arr3)).toEqual(tree3)
  })

  it('more nodes tree', () => {
    const arr1 = [1, 3, null, null, 2]
    const arr2 = [3, 1, 4, null, null, 2]
    const arr3 = [5, 4, 7, 3, null, 2, null, -1, null, 9]

    const tree1 = {
      val: 1,
      right: null,
      left: {
        val: 3,
        left: null,
        right: {
          val: 2,
          left: null,
          right: null,
        },
      },
    }
    const tree2 = {
      val: 3,
      left: {
        val: 1,
        left: null,
        right: null,
      },
      right: {
        val: 4,
        right: null,
        left: {
          val: 2,
          right: null,
          left: null,
        },
      },
    }
    const tree3 = {
      val: 5,
      right: {
        val: 7,
        right: null,
        left: {
          val: 2,
          right: null,
          left: {
            val: 9,
            right: null,
            left: null,
          },
        },
      },
      left: {
        val: 4,
        right: null,
        left: {
          val: 3,
          right: null,
          left: {
            val: -1,
            left: null,
            right: null,
          },
        },
      },
    }

    expect(numsToTree(arr1)).toEqual(tree1)
    expect(numsToTree(arr2)).toEqual(tree2)
    expect(numsToTree(arr3)).toEqual(tree3)
  })
})

describe('conditions for empty ', () => {
  it('tree will be null', () => {
    const arr1:number[] = []
    const arr2 = [null]
    const arr3 = ['a']
    const arr4 = [[]]
    const arr5 = null as any as number[]
    const arr6 = [-1, 2, 3, null, 5, 7, 8]

    expect(numsToTree(arr1)).toBeNull()
    expect(numsToTree(arr2)).toBeNull()
    expect(numsToTree(arr3 as [])).toBeNull()
    expect(numsToTree(arr4 as [])).toBeNull()
    expect(numsToTree(arr5)).toBeNull()
    expect(numsToTree(arr6, 3)).toBeNull()
  })

  it('tree will show part of elements', () => {
    const arr1 = [1, null, null, 2]
    const arr2 = [1, 2, null, 3, null, null, null, null, 4, 5, 6, null]

    const tree1 = { val: 1, left: null, right: null }
    const tree2 = {
      val: 1,
      right: null,
      left: {
        val: 2,
        right: null,
        left: {
          val: 3,
          left: null,
          right: null,
        },
      },
    }

    expect(numsToTree(arr1)).toEqual(tree1)
    expect(numsToTree(arr2)).toEqual(tree2)
  })
})

describe('rootIndex to start root node other index in array', () => {
  const arr = [1, 2, 3, 4, 5, 6, 7]
  it('use index', () => {
    const rootIndex = 4
    const tree = {
      val: 5,
      left: {
        val: 6,
        left: null,
        right: null,
      },
      right: {
        val: 7,
        left: null,
        right: null,
      },
    }

    expect(numsToTree(arr, rootIndex)).toEqual(tree)
  })

  it('index less than 0', () => {
    expect(numsToTree(arr, -1)).toBeNull()
  })
})
