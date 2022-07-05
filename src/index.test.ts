import { it, describe, expect } from "vitest";
import { numsToTree } from "./index";

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
          right: null
        },
        right: {
          val: 5,
          left: null,
          right: null
        },
      },
      right: {
        val: 3,
        left: {
          val: 6,
          left: null,
          right: null
        },
        right: {
          val: 7,
          left: null,
          right: null
        },
      },
    }
    expect(numsToTree(arr)).toEqual(tree)
  })
})
