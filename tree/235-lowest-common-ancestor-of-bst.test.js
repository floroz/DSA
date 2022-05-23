// https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/

import { convertArrayToTree } from "./utils/transformer";

// Given a binary search tree (BST), find the lowest common ancestor (LCA) of two given nodes in the BST.

// According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”

/**
 * O(H) where H is the height of the tree, which translates to O(log N)
 */
var lowestCommonAncestor = function (root, p, q) {
  const dfs = (node) => {
    if (!node) return null;

    if (p.val > node.val && q.val > node.val) {
      // we need to go right
      return dfs(node.right);
    } else if (p.val < node.val && q.val < node.val) {
      // we need to go left
      return dfs(node.left);
    } else {
      // this is where the split of the tree occurs,
      // which means there won't be another lower common ancestor between the two
      return node;
    }
  };

  return dfs(root);
};

test("lowestCommonAncestor", () => {
  const root = convertArrayToTree([6, 2, 8, 0, 4, 7, 9, null, null, 3, 5]);

  const node = root.left;
  const p = root.left;
  const q = root.left.right;

  expect(lowestCommonAncestor(root, p, q)).toStrictEqual(node);
});
