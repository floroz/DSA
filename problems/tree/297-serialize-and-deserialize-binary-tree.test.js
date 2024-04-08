// https://leetcode.com/problems/serialize-and-deserialize-binary-tree/

import { TreeNode } from "./utils/transformer";

// Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.

// Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */

/**
 * Solution 1: serialize to binary string
 */

var serialize = function (root) {
  let queue = [];
  let serialize = [];

  if (root == null) return [];

  queue.push(root);

  while (queue.length > 0) {
    let node = queue.shift();

    serialize.push(node ? node.val : null);

    if (node != null) {
      queue.push(node.left);
      queue.push(node.right);
    }
  }
  return serialize;
};

var deserialize = function (data) {
  if (data[0] == null) return null;

  let node = new TreeNode(data.shift());

  let queue = [node];

  while (queue.length > 0) {
    let node = queue.shift();

    left = data.shift();

    right = data.shift();

    node.left = left == null ? null : new TreeNode(left);

    node.right = right == null ? null : new TreeNode(right);

    if (node.left != null) queue.push(node.left);

    if (node.right != null) queue.push(node.right);
  }
  return node;
};
