import { numsToTree } from '../../src'
import {Tree} from "./Tree";

export const App = () => {
  const arr = [1, null, 2, 3, 4, 5]
  const tree = numsToTree(arr)
  console.log(tree)

  return (
    <div className="container">
      App
      <div>
        <Tree />
      </div>
    </div>
  )
}
