// https://leetcode.com/problems/number-of-islands/
// Given an m x n 2D binary grid grid which represents a map of '1's(land) and '0's(water), return the number of islands.

// An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.
// Linear scan the 2d grid map, if a node contains a '1', then it is a root node that triggers a Depth First Search. During DFS, every visited node should be set as '0' to mark as visited node. Count the number of root nodes that trigger DFS, this number would be the number of islands since each DFS starting at some root identifies an island.

// Time complexity : O(M×N) where M is the number of rows and N is the number of columns.

// Space complexity : worst case O(M×N) in case that the grid map is filled with lands where DFS goes by M×N deep.

/**
 * @param {character[][]} grid
 * @return {number}
 */
export const numIslands = (grid) => {
  let m = grid.length;
  let n = grid[0].length;

  let islands = 0;

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === "1") {
        // If the value is one, it means it's an unvisited cell,
        // and therefore, it's the start of a new islands
        islands++;

        // we run DFS to look for all the neighbors that are 1,
        // so that we can mark the boundaries of the islands
        dfs(grid, r, c, m, n);
      }
    }
  }

  return islands;
};

function dfs(matrix, r, c, m, n) {
  // we check for out of bounds AND invalid values
  if (r < 0 || c < 0 || r > m - 1 || c > n - 1 || matrix[r][c] !== "1") {
    return;
  }

  // we mark the cell as visited
  matrix[r][c] = "2";

  // we run DFS on all neighbors until we either meet a cell that is 0, 2 or out of bounds
  dfs(matrix, r + 1, c, m, n);
  dfs(matrix, r - 1, c, m, n);
  dfs(matrix, r, c - 1, m, n);
  dfs(matrix, r, c + 1, m, n);
}
