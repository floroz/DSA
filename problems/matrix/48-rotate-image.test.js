// https://leetcode.com/problems/rotate-image/
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = i; j < matrix[0].length; j++) {
      let temp = matrix[i][j];
      matrix[i][j] = matrix[j][i];
      matrix[j][i] = temp;
    }
  }

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length / 2; j++) {
      let temp = matrix[i][j];
      matrix[i][j] = matrix[i][matrix[0].length - j - 1];
      matrix[i][matrix[0].length - j - 1] = temp;
    }
  }

  return matrix;
};

// Time: O(N^2)
// Space: O(1) technically we do not allocate an extra data structure,
// but our current matrix increases linearly as the size of our input so O(N)
var rotate1 = function (matrix) {
  const n = matrix.length;

  // bottom is our pointer that scans from the last row, to the first one
  let bottom = n - 1;
  // insertCol is the pointer to know where to place the next column
  let insertCol = n;

  // we want to scan all rows from bottom to top
  // O(N)
  while (bottom >= 0) {
    // newRol e insertCol help us know where to add elements
    let newRow = 0;
    // loop through all the column of the initial matrix dimensions (length of a column is M)
    for (let col = 0; col < n; col++) {
      // rotate the element into the new position
      matrix[newRow][insertCol] = matrix[bottom][col];
      // increase row for next insertion
      newRow++;
    }

    // once we're done scanning the row, let's move to the next one (previous)
    bottom--;
    // let's update where our next column is going to be
    insertCol++;
  }

  // at this point we should have a (N x M) * 2 Matrix
  // and the first 3 elements in the rows are going to be the non-rotated one
  // so we want to go row by row, and remove them
  // we know how many thanks to the original dimension M and N of the matrix
  // O(N^2)
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      matrix[row].shift();
    }
  }

  return matrix;
};

test("rotate", () => {
  expect(
    rotate([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ])
  ).toStrictEqual([
    [7, 4, 1],
    [8, 5, 2],
    [9, 6, 3],
  ]);
});
