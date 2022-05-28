// https://leetcode.com/problems/set-matrix-zeroes/

// Strategy: Using  the first row and column as a memory to keep track of all the 0's in the entire matrix.
// Time: O(M*N)
// Space: O(1)

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function (matrix) {
  // Use first row and first column as markers.
  let firstRow = false;
  let firstCol = false;

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      // if matrix[i][j] = 0, mark respected row and col marker = 0; indicating
      // that later this respective row and col must be marked 0;
      if (matrix[i][j] == 0) {
        // And because you are altering first row and column,
        // you need to  have two variables to track their own status.
        // So, for ex, if any one of the first row is 0, fr = 0,
        // and at the end set all first row to 0;
        if (i == 0) firstRow = true;
        if (j == 0) firstCol = true;
        matrix[0][j] = 0;
        matrix[i][0] = 0;
      }
    }
  }

  // starting from ROW = 1 and COL = 1
  for (let i = 1; i < matrix.length; i++) {
    for (let j = 1; j < matrix[0].length; j++) {
      // we check if first row or first column is marked
      if (matrix[i][0] == 0 || matrix[0][j] == 0) {
        // if it's marked, the value must be mutated
        matrix[i][j] = 0;
      }
    }
  }

  if (firstRow) {
    // if first row was maked too, we need to mutate
    // those values in the original matrix
    for (let j = 0; j < matrix[0].length; j++) {
      matrix[0][j] = 0;
    }
  }
  if (firstCol) {
    // if first col was maked too, we need to mutate
    // those values in the original matrix
    for (let i = 0; i < matrix.length; i++) {
      matrix[i][0] = 0;
    }
  }

  return matrix; // returning for unit test purposes
};

// Strategy: Marking Rows and Cols with 0s so that can be all mutated in one-pass
// Time: O(M*N)
// Space: O(M + N) - only the marked rows and columns

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function (matrix) {
  const rowSet = new Set();
  const colSet = new Set();

  // let's mark the columns and rows that have a 0
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (!matrix[row][col]) {
        rowSet.add(row);
        colSet.add(col);
      }
    }
  }

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (rowSet.has(row) || colSet.has(col)) {
        matrix[row][col] = 0;
      }
    }
  }

  return matrix; // returning for unit test purposes
};

// Strategy: Recursion using a deep copy to keep track of original 0s
// Time: O(M*N)
// Space: O(M*N) - an entire new matrix

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes3 = function (matrix) {
  // we make a deep clone of our matrix
  const copy = JSON.parse(JSON.stringify(matrix));

  // loop through each cell
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      // when we find a 0, we traverse to shift values
      if (!copy[i][j]) dfs(i, j);
    }
  }

  function dfs(row, col, dir = "all") {
    // shift value
    matrix[row][col] = 0;

    // determine which direction to go
    if (row - 1 >= 0 && (dir === "all" || dir === "up"))
      dfs(row - 1, col, "up");

    if (row + 1 <= matrix.length - 1 && (dir === "all" || dir === "down"))
      dfs(row + 1, col, "down");

    if (col - 1 >= 0 && (dir === "all" || dir === "left"))
      dfs(row, col - 1, "left");

    if (col + 1 <= matrix[row].length - 1 && (dir === "all" || dir === "right"))
      dfs(row, col + 1, "right");
  }

  return matrix; // returning for unit test purposes
};

test("setZeroes", () => {
  expect(
    setZeroes([
      [0, 1, 2, 0],
      [3, 4, 5, 2],
      [1, 3, 1, 5],
    ])
  ).toStrictEqual([
    [0, 0, 0, 0],
    [0, 4, 5, 0],
    [0, 3, 1, 0],
  ]);

  expect(
    setZeroes([
      [1, 2, 3, 4],
      [5, 0, 7, 8],
      [0, 10, 11, 12],
      [13, 14, 15, 0],
    ])
  ).toStrictEqual([
    [0, 0, 3, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);
});
