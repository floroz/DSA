/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

import {
  convertArrayToTree,
  convertTreeToArray,
} from "./utils/transformer.test";

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function (root) {
  const dfs = (node) => {
    if (!node) return node;

    if (!node.left && !node.right) return node;

    let temp = node.left;
    node.left = dfs(node.right);
    node.right = dfs(temp);

    return node;
  };

  return dfs(root);
};

test("should work", () => {
  const res1 = invertTree(convertArrayToTree([4, 2, 7, 1, 3, 6, 9]));
  const binary1 = convertTreeToArray(res1);
  const expected1 = [4, 7, 2, 9, 6, 3, 1];
  expect(binary1).toStrictEqual(expected1);

  const res2 = invertTree(convertArrayToTree([2, 1, 3]));
  const binary2 = convertTreeToArray(res2);
  const expected2 = [2, 3, 1];
  expect(binary2).toStrictEqual(expected2);
});
