# numstree

Convert an array to binary tree make it look like leetcode's Tree Visualizer show.
See [LeetCode article](https://support.leetcode.com/hc/en-us/articles/360011883654-What-does-1-null-2-3-mean-in-binary-tree-representation-) for more information about transformation of array and binary tree.

It is tiny, no dependencies and work well that make ac binary tree problem a little easier to work with.Use Typescript and compatible with structure of leetcode Tree Visualizer display.
## Installation

```bash
npm i numstree
```

## Usage

```ts
// basic array
// ESM import
import { numsToTree } from "numstree"

const arr = [1, 2, 3]
const tree = numsToTree(arr)
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
const tree = numsToTree(arr)
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
const tree = numsToTree(arr, 4)
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
const tree = numsToTree(arr)
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

#### Node env usage
`.cjs` or `.js` with CommonJS module

```js
const { numsToTree }  = require('numstree')

const arr = [1,2,3]
const tree = numsToTree(arr)

```

see more case in [test file](./tests/index.test.ts)

## API

`numsToTree(arr: (number| null)[], rootIndex?:number)`

convert a number array to binary tree

Parameters:

- `arr`: An array that elements are number or null, **NaN or not number element are regarded as null**
- `rootIndex`:the tree root node index in array,rootIndex is a number that should more than `-1`,default value is `0`

## License

[MIT](./LICENSE) ?? Fei
