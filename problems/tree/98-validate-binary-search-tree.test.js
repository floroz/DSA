// https://leetcode.com/problems/validate-binary-search-tree/

import { convertArrayToTree } from "./utils/transformer";

// Given the root of a binary tree, determine if it is a valid binary search tree (BST).

// A valid BST is defined as follows:

// The left subtree of a node contains only nodes with keys less than the node's key.
// The right subtree of a node contains only nodes with keys greater than the node's key.
// Both the left and right subtrees must also be binary search trees.

/**
 * Time Complexity O(N)
 * Space Complexity O(1)
 *
 * The strategy here is to create upper and lower boundaries -Infinity and +Infinity
 *
 * Let's look at the following BST [5, 4, 6, null, null, 3, 7]
 *
 * Once we reach the right branch, we'll have 6 who has 3 as left and 7 and right.
 * Even though 3 is less than 6, 3 is also less than the root 4, so we need to keep track
 * of the range of boundaries in which values are allowed to be inserted.
 *
 * We do so by passing a min and max set to infinity -+ and we recursively update those values on the left and on the right side to create a series of boolean evaluations
 */
var isValidBST = function (root, min = -Infinity, max = Infinity) {
  if (root === null) return true;

  // min here will be a series of check
  if (root.val <= min || root.val >= max) return false;

  return (
    isValidBST(root.right, root.val, max) &&
    isValidBST(root.left, min, root.val)
  );
};

describe("all", () => {
  test("1- isValidBST", () => {
    expect(isValidBST(convertArrayToTree([2, 1, 3]))).toEqual(true);
  });
  test("2- isValidBST", () => {
    expect(isValidBST(convertArrayToTree([5, 1, 4, null, null, 3, 6]))).toEqual(
      false
    );
  });
  test("3- isValidBST", () => {
    expect(isValidBST(convertArrayToTree([2, 2, 2]))).toEqual(false);
  });
  test("4- isValidBST", () => {
    expect(isValidBST(convertArrayToTree([1, 1]))).toEqual(false);
  });
  test("5- isValidBST", () => {
    expect(isValidBST(convertArrayToTree([0, null, -1]))).toEqual(false);
  });
  test("6- isValidBST", () => {
    expect(isValidBST(convertArrayToTree([5, 4, 6, null, null, 3, 7]))).toEqual(
      false
    );
  });
});
