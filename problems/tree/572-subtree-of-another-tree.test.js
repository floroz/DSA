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
var isSubtree = function (root, sub) {
  if (!root) return !sub;

  return (
    // we first check if the tree match from the root node
    isEqual(root, sub) ||
    // if it doesn't we start dfs on both branches
    isSubtree(root.left, sub) ||
    isSubtree(root.right, sub)
  );
};

function isEqual(root1, root2) {
  if (!root1 || !root2) return !root1 && !root2;
  if (root1.val !== root2.val) return false;
  return isEqual(root1.left, root2.left) && isEqual(root1.right, root2.right);
}

describe("all", () => {
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
    const input1 = convertArrayToTree([
      3,
      4,
      5,
      1,
      2,
      null,
      null,
      null,
      null,
      0,
    ]);
    const input2 = convertArrayToTree([4, 1, 2]);
    expect(isSubtree(input1, input2)).toBe(false);
  });
});
