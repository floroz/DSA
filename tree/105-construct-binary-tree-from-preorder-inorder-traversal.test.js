// https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/submissions/

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
 * 
 * The two key observations are:

Preorder traversal follows Root -> Left -> Right, therefore, given the preorder array preorder, we have easy access to the root which is preorder[0].

Inorder traversal follows Left -> Root -> Right, therefore if we know the position of Root, we can recursively split the entire array into two subtrees.

Now the idea should be clear enough. We will design a recursion function: it will set the first element of preorder as the root, and then construct the entire tree. To find the left and right subtrees, it will look for the root in inorder, so that everything on the left should be the left subtree, and everything on the right should be the right subtree. Both subtrees can be constructed by making another recursion call.

It is worth noting that, while we recursively construct the subtrees, we should choose the next element in preorder to initialize as the new roots. This is because the current one has already been initialized to a parent node for the subtrees.
 */
var buildTree = function (preorder, inorder) {
  if (!preorder || !inorder || !inorder.length) return null;

  const node = new TreeNode(preorder[0]);

  const midpoint = inorder.indexOf(preorder[0]);

  const leftPreorder = preorder.slice(1, midpoint + 1);
  const rightPreorder = preorder.slice(midpoint + 1);

  const leftInorder = inorder.slice(0, midpoint);
  const rightInorder = inorder.slice(midpoint + 1);

  node.left = buildTree(leftPreorder, leftInorder);
  node.right = buildTree(rightPreorder, rightInorder);

  return node;
};

test("should first", () => {
  expect(
    convertTreeToArray(buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]))
  ).toStrictEqual([3, 9, 20, null, null, 15, 7]);
});
