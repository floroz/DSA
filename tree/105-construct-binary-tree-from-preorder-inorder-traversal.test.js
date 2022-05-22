/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

import { convertTreeToArray, TreeNode } from "./utils/transformer";

/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
  if (!preorder || !inorder || !inorder.length) return null;

  const val = preorder.shift();

  const idx = inorder.findIndex((n) => n === val);

  const left = inorder.slice(0, idx);
  const right = inorder.slice(idx + 1);
  const node = new TreeNode(val);
  node.left = buildTree(preorder, left);
  node.right = buildTree(preorder, right);
  return node;
};

// // first call
// preorder = [3, 9, 20, 15, 7];
// inorder = [9, 3, 15, 20, 7];

// root = 3;
// binary = [3]; // add to binary
// left = [9]
// right = [15, 20, 7]

// // second call left
// preorder = [9, 20, 15, 7];
// inorder = [];

// root = 9; // add to binary
// binary = [3, 9];

// left = [] // no left? push null
// right = [] // no right? push null
// binary = [3,9,null, null]

// // second call right
// preorder = [20, 15, 7];
// inorder = [15, 20, 7];

// root = 9;
// left = []
// right = [15, 20, 7]

// binary = [3, 9];

// // third call
// preorder = [->20, 15, 7];
// inorder = [9, 3, 15, 20, 7];

// root = 20;

// binary = [3, 9];

test("should first", () => {
  expect(
    convertTreeToArray(buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]))
  ).toStrictEqual([3, 9, 20, null, null, 15, 7]);
});
