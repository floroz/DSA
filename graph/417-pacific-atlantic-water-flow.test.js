// https://leetcode.com/problems/pacific-atlantic-water-flow

/**
 *
 * Depth First Solution
 *
 * Starting from one ocean (a column and a row adjacent to the bounds) we try to move towards the other ocean (by starting from a column and increase the row, and starting from a row and increase a column).
 *
 * Whenever we are able to reach a cell, we mark it as visited by saving it in the dedicated set of the ocean (pacific set, atlantic set).
 * At the end of both operations, we can check the intersection between the two, to find the cells that are reachable from both oceans.
 *
 *
 */

// Time complexity: O(M * N), where MM is the number of rows and NN is the number of columns.

// In the worst case, such as a matrix where every value is equal, we would visit every cell twice. This is because we perform 2 traversals, and during each traversal, we visit each cell exactly once. There are M * NM⋅N cells total, which gives us a time complexity of O(2 * M * N) = O(M * N)O(2⋅M⋅N)=O(M*N).

// Space complexity: O(M * N), where MM is the number of rows and NN is the number of columns.

// The extra space we use comes from our queues, and the data structure we use to keep track of what cells have been visited. Similar to the time complexity, for a given ocean, the amount of space we will use scales linearly with the number of cells. For example, in the Java implementation, to keep track of what cells have been visited, we simply used 2 matrices that have the same dimensions as the input matrix.

export const pacificAtlantic = (heights) => {
  if (heights.length < 1 || heights[0].length < 1) return [];

  const rows = heights.length;
  const cols = heights[0].length;

  // we need two separate DS to keep track of visited cells
  const pac_set = new Set();
  const atl_set = new Set();

  const dfs = (row, col, set, prev_height) => {
    // already visited
    if (set.has(toSetValue(row, col))) return;

    // out of bounds
    if (row >= rows || col >= cols || row < 0 || col < 0) return;

    // water cannot flow
    if (prev_height > heights[row][col]) return;

    // at this point we've visiting a new cell
    set.add(toSetValue(row, col));

    // run dfs on all neighbors
    dfs(row + 1, col, set, heights[row][col]);
    dfs(row - 1, col, set, heights[row][col]);
    dfs(row, col + 1, set, heights[row][col]);
    dfs(row, col - 1, set, heights[row][col]);
  };

  for (let row = 0; row < rows; row++) {
    dfs(row, 0, pac_set, heights[row][0]);
    dfs(row, cols - 1, atl_set, heights[row][cols - 1]);
  }

  for (let c = 0; c < cols; c++) {
    dfs(0, c, pac_set, heights[0][c]);
    dfs(rows - 1, c, atl_set, heights[rows - 1][c]);
  }

  // find the intersection between the coordinates that are both in the pacific and in the atlantic set
  const cell_reachable_from_both_ocean = Array.from(
    new Set(Array.from(atl_set).filter((element) => pac_set.has(element)))
  ).map(fromSetValue);
  return cell_reachable_from_both_ocean;
};

function toSetValue(a, b) {
  return a + "," + b;
}

function fromSetValue(str) {
  return str.split(",").map(Number);
}

test("it works", () => {
  const res = pacificAtlantic([
    [1, 2, 2, 3, 5],
    [3, 2, 3, 4, 4],
    [2, 4, 5, 3, 1],
    [6, 7, 1, 4, 5],
    [5, 1, 1, 2, 4],
  ]);

  const expected = [
    [0, 4],
    [1, 3],
    [1, 4],
    [2, 2],
    [3, 0],
    [3, 1],
    [4, 0],
  ];
  expect(res.length).toBe(expected.length);
  expect(res).toEqual(expect.arrayContaining(expected));
});
