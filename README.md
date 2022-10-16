# numstree

Convert an array to binary tree make it look like leetcode's Tree Visualizer show.
See [LeetCode article](https://support.leetcode.com/hc/en-us/articles/360011883654-What-does-1-null-2-3-mean-in-binary-tree-representation-) for more information about transformation of array and binary tree.

A solution for [297. Serialize and Deserialize Binary Tree](https://leetcode.cn/problems/serialize-and-deserialize-binary-tree/), and type friendly,local convenient, ESM or CommonJS all support.

## Installation

```bash
npm i numstree
// or
pnpm i numstree
```

## Usage

```ts
// basic array
// ESM import
import { deserialize } from "numstree"

const arr = [1, 2, 3]
const tree = deserialize(arr)
console.log(tree)
/**
 print:
 {
    val: 1,
    left: { val: 2, left: null, right: null },
    right: { val: 3, left: null, right: null },
  }

 look like :
      1
     / \
    2   3
 */

```

```ts
// null signify a path terminator where no node exists below.
const arr = [1,null,2,3]
const tree = deserialize(arr)
console.log(tree)

/**
 print:
 {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: {
      val: 3,
      left: null,
      right: null
    },
    right: null
  }
}


 look like :
     1
      \
      2
     /
    3

 */


```

```ts
// use rootIndex to start in arry anywhere
const arr = [1, 2, 3, 4, 5, 6, 7]
const tree = deserialize(arr, 4)
console.log(tree)
/**
 print:
 {
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

 look like :
    5
   / \
  6   7

 */

```

```ts
// leaves will not show next element
const arr = [1, null,null, 2,3,5]
const tree = deserialize(arr)
console.log(tree)

/**

print:
 { val: 1, left: null, right: null }

look like:
     1
    / \
 null  null

*/



```

### serialize

serialize a tree to a array

```ts
const tree = {
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
serialize(tree)
// [1, 2, null, 3]
// note that will remove tail empty values
```

#### Node env usage
`.cjs` or `.js` with CommonJS module

```js
const { deserialize }  = require('numstree')

const arr = [1,2,3]
const tree = deserialize(arr)

```

see more case in [test file](./tests/index.test.ts)

## API

`deserialize<T = unknown>(arr: Array<T | null>, rootIndex?: number): TreeNode<T> | null`

convert a number array to binary tree

Parameters:

- `arr`: An array that elements are number or null, **NaN or not number element are regarded as null**
- `rootIndex`:the tree root node index in array,rootIndex is a number that should more than `-1`,default value is `0`

`serialize<T = unknown>(root: TreeNode<T> | null): (T | null)[]`
Parameters:

- `root`: a binary tree root node
- return: always return a array, even empty tree

## License

[MIT](./LICENSE) © Fei
