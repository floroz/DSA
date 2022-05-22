// https://leetcode.com/problems/binary-tree-level-order-traversal/

import { convertArrayToTree } from "./utils/transformer";

// Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).

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
var levelOrder = function (root) {
  if (!root) return [];

  const queue = [root];
  const res = [];

  while (queue.length) {
    const len = queue.length;
    const level = [];

    for (let i = 0; i < len; i++) {
      const node = queue.shift();

      level.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    res.push(level);
  }

  return res;
};

test("should work", () => {
  expect(
    levelOrder(convertArrayToTree([3, 9, 20, null, null, 15, 7]))
  ).toStrictEqual([[3], [9, 20], [15, 7]]);
  expect(levelOrder(convertArrayToTree([]))).toStrictEqual([]);
});
