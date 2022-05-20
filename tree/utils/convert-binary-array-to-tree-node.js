class TreeNode {
  constructor({ val, left, right, height = 0 }) {
    this.val = val;
    this.left = left;
    this.right = right;
    this.height = height;
  }
}

export const convertArrayToTree = (arr) => {
  const createTreeNode = (i, arr, prevHeight = 0) => {
    const val = arr[i];

    if (!val) return null;

    const height = prevHeight + 1;

    const newNode = new TreeNode({
      val,
      left: createTreeNode(i * 2 + 1, arr, height),
      right: createTreeNode(i * 2 + 2, arr, height),
      height,
    });

    return newNode;
  };

  return createTreeNode(0, arr);
};
