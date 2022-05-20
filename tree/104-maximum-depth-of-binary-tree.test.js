import { convertArrayToTree } from "./utils/convert-binary-array-to-tree-node";

/**
 * Time Complexity O(N) - we need to look at all the nodes in the tree to determine the max height
 * Space Complexity: To create a representation of the tree as TreeNodes is O(N) - we need to create a new node in memory for each element in the array (N).
 *
 * But Space Complexity can be changed to O(1) if decide to only traverse the array in DFS and not creating nodes.
 */
var maxDepth = function (binary) {
  if (binary.length < 1) return 0;

  const dfs = (i) => {
    if (!binary[i]) return 0;

    return Math.max(dfs(binary[i * 2 + 1]), dfs(binary[i * 2 + 1])) + 1;
  };

  return dfs(0) + 1;
};

test("should work - Binary Array DFS Recursive", () => {
  expect(maxDepth([3, 9, 20, null, null, 15, 7])).toBe(3);
  expect(maxDepth([1, null, 2])).toBe(2);
});

/**
 *
 * In a Breadth First Search solution the strategy is to count the amount of "layers" we can navigate until we reach the end
 */
const BFS_solution = (binary) => {
  if (binary.length < 1) return 0;

  const queue = [0];
  let level = 0;

  while (queue.length > 0) {
    const range = queue.length;
    // let's add to the queue all the children of the current nodes,
    for (let i = 0; i < range; i++) {
      const idx = queue.shift() * 2;

      if (binary[idx + 1]) queue.push(idx + 1); // enqueue left child index

      if (binary[idx + 2]) queue.push(idx + 2); // enqueue right child index
    }

    level++;
  }

  return level;
};

test("should work - Binary Array BFS Iterative", () => {
  expect(BFS_solution([3, 9, 20, null, null, 15, 7])).toBe(3);
  expect(BFS_solution([1, null, 2])).toBe(2);
});

/**
 * When working directly with a Tree and not with an Array
 */

const Tree_DFS_solution = (root) => {
  if (!root) return 0;

  return (
    Math.max(Tree_DFS_solution(root.left), Tree_DFS_solution(root.left)) + 1
  );
};
test("should work - Tree DFS Recursive", () => {
  expect(
    Tree_DFS_solution(convertArrayToTree([3, 9, 20, null, null, 15, 7]))
  ).toBe(3);
  expect(Tree_DFS_solution(convertArrayToTree([1, null, 2]))).toBe(2);
});
