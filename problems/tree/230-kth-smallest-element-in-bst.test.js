// https://leetcode.com/problems/kth-smallest-element-in-a-bst/

// Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.
/**
 * We apply a strategy of INORDER DFS TRAVERSAL | LEFT - NODE - RIGHT to obtain a sorted
 * array in ascending order
 */
var kthSmallest = function (root, k) {
  const sorted = [];

  const inorder = (node) => {
    if (!node) return;

    inorder(node.left);

    sorted.push(node.val);

    inorder(node.right);
  };

  inorder(root);

  return sorted[k - 1];
};
