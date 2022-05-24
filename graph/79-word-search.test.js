// https://leetcode.com/problems/word-search/

// Given an m x n grid of characters board and a string word, return true if word exists in the grid.

// The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

// Example 1:
// Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
// Output: true

// Example 2:
// Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
// Output: true

// Example 3:
// Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
// Output: false

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
  if (!word || board.length === 0) return false;

  const rows = board.length;
  const cols = board[0].length;

  const find = (r, c, word) => {
    if (word.length === 0) return true;

    // out of bounds
    if (r < 0 || c < 0 || r >= rows || c >= cols) return false;

    const cell = board[r][c];

    if (cell !== word[0]) return false;

    board[r][c] = "*"; // invalidate cell so cannot be read twice during this search

    const res =
      find(r + 1, c, word.substr(1)) ||
      find(r - 1, c, word.substr(1)) ||
      find(r, c + 1, word.substr(1)) ||
      find(r, c - 1, word.substr(1));

    board[r][c] = cell; // restore cell value before next iteration

    return res;
  };

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (find(i, j, word)) return true;
    }
  }

  return false;
};

test("exist", () => {
  expect(
    exist(
      [
        ["A", "B", "C", "E"],
        ["S", "F", "C", "S"],
        ["A", "D", "E", "E"],
      ],
      "ABCCED"
    )
  ).toBeTruthy();

  expect(
    exist(
      [
        ["A", "B", "C", "E"],
        ["S", "F", "C", "S"],
        ["A", "D", "E", "E"],
      ],
      "SEE"
    )
  ).toBeTruthy();

  expect(
    exist(
      [
        ["A", "B", "C", "E"],
        ["S", "F", "C", "S"],
        ["A", "D", "E", "E"],
      ],
      "ABCB"
    )
  ).toBeFalsy();

  expect(exist([["a"]], "a")).toBeTruthy();

  expect(
    exist(
      [
        ["A", "B", "C", "E"],
        ["S", "F", "E", "S"],
        ["A", "D", "E", "E"],
      ],
      "ABCESEEEFS"
    )
  ).toBeTruthy();
});
