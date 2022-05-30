// https://leetcode.com/problems/find-leaves-of-binary-tree/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var findLeaves = function (root) {
  const res = [];

  if (!root) return [];

  const dfs = (node) => {
    if (node == null) return -1;

    const leftHeight = dfs(node.left);

    const rightHeight = dfs(node.right);

    const currHeight = Math.max(leftHeight, rightHeight) + 1;

    if (!res[currHeight]) {
      res[currHeight] = [];
    }
    res[currHeight].push(node.val);

    return currHeight;
  };

  dfs(root);

  return res;
};
