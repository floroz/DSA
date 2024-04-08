export class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

/**
 * Converts a Binary Tree from an Array to a TreeNode using BFS
 */
export const convertArrayToTree = (arr) => {
  const dfs = (i, arr) => {
    const val = arr[i];

    if (val === null || val === undefined) return null;

    const newNode = new TreeNode(val);
    newNode.left = dfs(i * 2 + 1, arr);
    newNode.right = dfs(i * 2 + 2, arr);

    return newNode;
  };

  return dfs(0, arr);
};

/**
 * Converts a Binary Tree from a TreeNode to an Array
 */
export const convertTreeToArray = (root) => {
  const binary = [];

  if (!root) return binary;

  // BFS approach - layer by layer to create binary array
  const queue = [root];

  while (queue.length > 0) {
    const node = queue.shift(); // dequeue

    if (!node) {
      binary.push(null);
      continue;
    }

    binary.push(node.val);

    if (node.left || node.right) {
      queue.push(node.left);
      queue.push(node.right);
    }
  }

  return binary;
};
