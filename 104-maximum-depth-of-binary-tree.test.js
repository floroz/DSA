class TreeNode {
  constructor({ val, left, right, height = 0 }) {
    this.val = val;
    this.left = left;
    this.right = right;
    this.height = height;
  }
}

/**
 * @param {TreeNode} root
 * @return {number}
 *
 *
 * Time Complexity O(N) - we need to look at all the nodes in the tree to determine the max height
 * Space Complexity: To create a representation of the tree as TreeNodes is O(N) - we need to create a new node in memory for each element in the array (N).
 *
 * But Space Complexity can be changed to O(1) if decide to only traverse the array in DFS and not creating nodes.
 */
var maxDepth = function (arr) {
  if (arr.length < 1) return 0;

  let maxHeight = 0;

  /**
   * We to a DFS traversal of the tree using the special formula that allows us to navigate a Binary Tree expressed as a flat array.
   *
   * From any index, starting from 0, we can access its child on the left at INDEX * 2 + 1 and child on the right INDEX * 2 + 2.
   *
   * We use this formula to navigate in the DFS and construct a tree, while also adding its relative height and updating our global max height
   */
  const createTreeNode = (i, arr, prevHeight) => {
    const val = arr[i];

    if (!val) return null;

    const height = prevHeight + 1;
    maxHeight = Math.max(maxHeight, height);

    const newNode = new TreeNode({
      val,
      left: createTreeNode(i * 2 + 1, arr, height),
      right: createTreeNode(i * 2 + 2, arr, height),
      height,
    });

    return newNode;
  };

  createTreeNode(0, arr, 0);

  return maxHeight;
};

test("should work", () => {
  expect(maxDepth([3, 9, 20, null, null, 15, 7])).toBe(3);
  expect(maxDepth([1, null, 2])).toBe(2);
  expect(maxDepth([3, 9, 20, null, null, 15, 7])).toBe(3);
});

/**
 *
 * In a Breadth First Search solution the strategy is to count the amount of "layers" we can navigate until we reach the end
 */
const BFS_solution = (arr) => {
  if (arr.length < 1) return 0;

  const queue = [0];
  let level = 0;

  while (queue.length > 0) {
    const range = queue.length;
    // let's add to the queue all the children of the current nodes,
    for (let i = 0; i < range; i++) {
      const idx = queue.shift() * 2;

      if (arr[idx + 1]) queue.push(idx + 1); // enqueue left child index

      if (arr[idx + 2]) queue.push(idx + 2); // enqueue right child index
    }

    level++;
  }

  return level;
};

test("should work2", () => {
  expect(BFS_solution([3, 9, 20, null, null, 15, 7])).toBe(3);
  expect(BFS_solution([1, null, 2])).toBe(2);
  expect(BFS_solution([3, 9, 20, null, null, 15, 7])).toBe(3);
});
