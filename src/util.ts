import { TreeNode } from './typing'

export const notEmptyNode = (obj: unknown): obj is TreeNode =>
  !!obj && typeof obj === 'object' && obj.hasOwnProperty('val')
