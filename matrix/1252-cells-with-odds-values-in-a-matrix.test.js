/**
 * @param {number} m
 * @param {number} n
 * @param {number[][]} indices
 * @return {number}
 */
var oddCells = function (m, n, indices) {
  if (!indices || !indices.length) return 0;

  const matrix = [];

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (!matrix[i]) matrix[i] = [];
      matrix[i][j] = 0;
    }
  }

  indices.forEach(([row, col]) => {
    for (let c = 0; c < n; c++) {
      matrix[row][c]++;
    }

    for (let r = 0; r < m; r++) {
      matrix[r][col]++;
    }
  });

  let sum = 0;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] % 2 !== 0) sum++;
    }
  }

  return sum;
};

test("oddCells ", () => {
  expect(
    oddCells(2, 3, [
      [0, 1],
      [1, 1],
    ])
  ).toBe(6);
});
