class TreeNode {
  constructor({ val, left, right }) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/**
 * Converts a Binary Tree from an Array to a TreeNode
 */
export const convertArrayToTree = (arr) => {
  const dfs = (i, arr) => {
    const val = arr[i];

    if (!val) return null;

    const newNode = new TreeNode({
      val,
      left: dfs(i * 2 + 1, arr),
      right: dfs(i * 2 + 2, arr),
    });

    return newNode;
  };

  return dfs(0, arr);
};

test("convertArrayToTree", () => {
  const root = {
    val: 1,
    left: {
      val: 2,
      left: null,
      right: null,
    },
    right: {
      val: 3,
      left: null,
      right: null,
    },
  };
  expect(JSON.stringify(convertArrayToTree([1, 2, 3]))).toEqual(
    JSON.stringify(root)
  );

  const root2 = {
    val: 1,
    left: null,
    right: {
      val: 3,
      left: null,
      right: null,
    },
  };
  expect(JSON.stringify(convertArrayToTree([1, null, 3]))).toEqual(
    JSON.stringify(root2)
  );
});

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

test("convertTreeToArray", () => {
  const root = {
    val: 1,
    left: {
      val: 2,
      left: null,
      right: null,
    },
    right: {
      val: 3,
      left: null,
      right: null,
    },
  };
  expect(convertTreeToArray(root)).toStrictEqual([1, 2, 3]);

  const root2 = {
    val: 1,
    left: null,
    right: {
      val: 3,
      left: null,
      right: null,
    },
  };
  expect(convertTreeToArray(root2)).toStrictEqual([1, null, 3]);
});
