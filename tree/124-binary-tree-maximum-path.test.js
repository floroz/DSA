// https://leetcode.com/problems/binary-tree-maximum-path-sum/
// A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass through the root.

import { convertArrayToTree } from "./utils/transformer";

// The path sum of a path is the sum of the node's values in the path.

// Given the root of a binary tree, return the maximum path sum of any non-empty path.

// Time Complexity O(N) // we look at each node only once
// Space Complexity O(N) // a call on the stack for each node we visit

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
 * @return {number}
 */
var maxPathSum = function (root) {
  if (!root) return 0;

  // this is to make sure we can handle negative numbers
  let max = -Infinity;

  // return max path without splitting
  const findMax = (node) => {
    if (!node) return 0;

    // we find the max for each of the two split
    const left = findMax(node.left);
    const right = findMax(node.right);

    // compute all possible combinations
    const leftSum = left + node.val;
    const rightSum = right + node.val;
    const all = left + right + node.val;

    // update max path for current node
    max = Math.max(max, leftSum, rightSum, all, node.val);

    // return the highest split path to the parent (everything)
    // except the 'sum' as we cannot split twice
    return Math.max(leftSum, rightSum, node.val);
  };

  findMax(root);

  return max;
};

test("maxPathSum", () => {
  expect(maxPathSum(convertArrayToTree([1, 2, 3]))).toBe(6);
  expect(maxPathSum(convertArrayToTree([0]))).toBe(0);
  expect(maxPathSum(convertArrayToTree([-3]))).toBe(-3);
  expect(maxPathSum(convertArrayToTree([-2, 1]))).toBe(1);
  expect(maxPathSum(convertArrayToTree([2, -1, -2]))).toBe(2);
  expect(maxPathSum(convertArrayToTree([-10, 9, 20, null, null, 15, 7]))).toBe(
    42
  );
});
