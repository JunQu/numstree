import { it, describe, expect } from 'vitest'
import { numsToTree } from './index'

describe('tests for numsToTree', () => {
  it('Full tree', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7] // 2**n - 1
    const tree = {
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
    expect(numsToTree(arr)).toEqual(tree)
  })
})

// from https://support.leetcode.com/hc/en-us/articles/360011883654-What-does-1-null-2-3-mean-in-binary-tree-representation-
describe('some test for leetcode', () => {
  it('simple tree', () => {
    const arr1 = []
    const arr2 = [1, 2, 3]
    const arr3 = [1, null, 2, 3]
    const arr4 = [5, 4, 7, 3, null, 2, null, -1, null, 9]

    const tree1 = null
    const tree2 = { val: 1, left: { val: 2, left: null, right: null }, right: { val: 3, left: null, right: null } }
    const tree3 = { val: 1, left: null, right: { val: 2, left: { val: 3, left: null, right: null }, right: null } }
    const tree4 = {
      val: 5,
      right: {
        val: 7,
        right:null,
        left: {
          val:2,
          right: null,
          left: {
            val: 9,
            right:null,
            left:null
          }
        }
      },
      left: {
        val: 4,
        right: null,
        left: {
          val:3,
          right: null,
          left : {
            val: -1,
            left: null,
            right: null
          }
        }
      }
    }

    expect(numsToTree(arr1)).toEqual(tree1)
    expect(numsToTree(arr2)).toEqual(tree2)
    expect(numsToTree(arr3)).toEqual(tree3)
    expect(numsToTree(arr4)).toEqual(tree4)
  })
})
