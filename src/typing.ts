export interface TreeNode<T = unknown> {
  val: T
  left: TreeNode<T> | null
  right: TreeNode<T> | null
}
