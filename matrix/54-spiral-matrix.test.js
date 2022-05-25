// https://leetcode.com/problems/spiral-matrix/

// Given an m x n matrix, return all elements of the matrix in spiral order.

// Example
// Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
// Output: [1,2,3,6,9,8,7,4,5]

function spiralOrder_iterative1(matrix) {
  if (matrix.length < 1) return [];

  const res = [];

  if (matrix.length == 0) {
    return res;
  }

  let rowStart = 0;
  let rowEnd = matrix.length - 1;
  let colStart = 0;
  let colEnd = matrix[0].length - 1;

  while (rowStart <= rowEnd && colStart <= colEnd) {
    // Traverse Right
    for (let j = colStart; j <= colEnd; j++) {
      res.push(matrix[rowStart][j]);
    }
    rowStart++;

    // Traverse Down
    for (let j = rowStart; j <= rowEnd; j++) {
      res.push(matrix[j][colEnd]);
    }
    colEnd--;

    if (rowStart <= rowEnd) {
      // Traverse Left
      for (let j = colEnd; j >= colStart; j--) {
        res.push(matrix[rowEnd][j]);
      }
    }
    rowEnd--;

    if (colStart <= colEnd) {
      // Traver Up
      for (let j = rowEnd; j >= rowStart; j--) {
        res.push(matrix[j][colStart]);
      }
    }
    colStart++;
  }

  return res;
}

function spiralOrder_iterative2(matrix) {
  if (matrix.length < 1) return [];

  const res = [];
  if (matrix.length == 0 || matrix[0].length == 0) return res;

  let rowStart = 0;
  let rowEnd = matrix.length - 1;
  let colStart = 0;
  let colEnd = matrix[0].length - 1;

  while (true) {
    for (let i = colStart; i <= colEnd; i++) res.push(matrix[rowStart][i]);
    rowStart++;
    if (colStart > colEnd || rowStart > rowEnd) break;

    for (let i = rowStart; i <= rowEnd; i++) res.push(matrix[i][colEnd]);
    colEnd--;
    if (colStart > colEnd || rowStart > rowEnd) break;

    for (let i = colEnd; i >= colStart; i--) res.push(matrix[rowEnd][i]);
    rowEnd--;
    if (colStart > colEnd || rowStart > rowEnd) break;

    for (let i = rowEnd; i >= rowStart; i--) res.push(matrix[i][colStart]);
    colStart++;
    if (colStart > colEnd || rowStart > rowEnd) break;
  }

  return res;
}

test("iterative1", () => {
  expect(
    spiralOrder_iterative1([
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ])
  ).toStrictEqual([1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7, 11, 10]);
  expect(
    spiralOrder_iterative1([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ])
  ).toStrictEqual([1, 2, 3, 6, 9, 8, 7, 4, 5]);
});

test("iterative2", () => {
  expect(
    spiralOrder_iterative2([
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ])
  ).toStrictEqual([1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7, 11, 10]);
  expect(
    spiralOrder_iterative2([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ])
  ).toStrictEqual([1, 2, 3, 6, 9, 8, 7, 4, 5]);
});
