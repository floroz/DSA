import { convertArrayToTree } from "./utils/transformer";
// https://leetcode.com/problems/subtree-of-another-tree/

// Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and node values of subRoot and false otherwise.

// A subtree of a binary tree tree is a tree that consists of a node in tree and all of this node's descendants. The tree tree could also be considered as a subtree of itself.

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
 * @param {TreeNode} subRoot
 * @return {boolean}
 */
var isSubtree = function (root, subRoot) {
  if (!subRoot) return true;
  if (!root && subRoot) return false;

  const isSameTree = (node1, node2) => {
    // valid only if both nodes are null (they're the same)
    if (!node1 || !node2) return !node1 && !node2;

    // values don't match
    if (node1.val !== node2.val) return false;

    // values match, let's compare the branches on both sides
    return (
      isSameTree(node1.left, node2.left) && isSameTree(node1.right, node2.right)
    );
  };

  if (isSameTree(root, subRoot)) {
    return true;
  }

  return isSameTree(root.left, subRoot) || isSameTree(root.right, subRoot);
};

test("1- isSubtree", () => {
  const input1 = convertArrayToTree([3, 4, 5, 1, 2]);
  const input2 = convertArrayToTree([4, 1, 2]);
  expect(isSubtree(input1, input2)).toBe(true);
});

test("2 - isSubtree", () => {
  const input1 = convertArrayToTree([1, 1]);
  const input2 = convertArrayToTree([1]);
  expect(isSubtree(input1, input2)).toBe(true);
});

test("3- isSubtree", () => {
  const input1 = convertArrayToTree([3, 4, 5, 1, 2, null, null, null, null, 0]);
  const input2 = convertArrayToTree([4, 1, 2]);
  expect(isSubtree(input1, input2)).toBe(false);
});
