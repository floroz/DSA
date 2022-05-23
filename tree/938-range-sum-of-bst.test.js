// https://leetcode.com/problems/range-sum-of-bst/
/**
 * Given the root node of a binary search tree and two integers low and high, return the sum of values of all nodes with a value in the inclusive range [low, high].
 */

import { convertArrayToTree } from "./utils/transformer";

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
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
var rangeSumBST = function (root, low, high) {
  const dfs = (node) => {
    if (!node || node.val === null) {
      return 0;
    } else if (node.val >= low && node.val <= high) {
      return node.val + dfs(node.left) + dfs(node.right);
    } else {
      return dfs(node.left) + dfs(node.right);
    }
  };

  return dfs(root);
};

test("should ", () => {
  expect(
    rangeSumBST(convertArrayToTree([10, 5, 15, 3, 7, null, 18]), 7, 15)
  ).toEqual(32);
});
