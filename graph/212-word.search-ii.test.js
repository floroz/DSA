// https://leetcode.com/problems/word-search-ii/

// Given an m x n board of characters and a list of strings words, return all words on the board.

// Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring.The same letter cell may not be used more than once in a word.

//   Example 1:
// Input: board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]
// Output: ["eat","oath"]

/**
 * Brute force solution
 */
var findWords_brute = function (board, words) {
  if (!words || !words.length) return [];

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

  const rejected = [];

  const match = words.filter((word) => {
    const isRejected = rejected.some((r) => word.startsWith(r));

    if (isRejected) return false;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const res = find(i, j, word);
        if (res) return true;
      }
    }
    rejected.push(word);
    return false;
  });

  return match;
};

test("findWords - brute force", () => {
  expect(
    findWords_brute(
      [
        ["o", "a", "a", "n"],
        ["e", "t", "a", "e"],
        ["i", "h", "k", "r"],
        ["i", "f", "l", "v"],
      ],
      ["oath", "pea", "eat", "rain"]
    )
  ).toEqual(expect.arrayContaining(["eat", "oath"]));

  expect(
    findWords_brute(
      [
        ["a", "b"],
        ["c", "d"],
      ],
      ["abcb"]
    )
  ).toEqual(expect.arrayContaining([]));

  expect(findWords_brute([["a", "a"], ["aaa"]], ["aaa"])).toEqual(
    expect.arrayContaining([])
  );
});

/**
 * Using Trie + DFS
 */
class TrieNode {
  constructor() {
    this.children = new Map();
    this.isWord = false;
  }

  addWord(word, node = this) {
    if (!word) {
      node.isWord = true;
      return;
    }

    const char = word[0];

    if (!node.children.has(char)) {
      node.children.set(char, new TrieNode());
    }

    this.addWord(word.substr(1), node.children.get(char));
  }
}

var findWords = function (board, words) {
  if (!words || !words.length) return [];

  const rows = board.length;
  const cols = board[0].length;

  const root = new TrieNode();

  for (let w of words) {
    root.addWord(w);
  }

  const find = (row, col, node) => {
    // out of bounds
    if (row < 0 || col < 0 || row >= rows || col >= cols) return false;

    if (!board[row][col]) return false;

    if (node.isWord) {
      node.isWord = false;
      return true;
    }

    const cell = board[row][col];
    const childNode = node.children.get(cell);

    if (!childNode || !cell) return false;

    board[row][col] = 0; // invalidate cell so cannot be read twice during this search

    const res =
      find(row + 1, col, childNode) ||
      find(row - 1, col, childNode) ||
      find(row, col + 1, childNode) ||
      find(row, col - 1, childNode);

    board[row][col] = cell; // restore cell value before next iteration

    return res;
  };

  const match = words.filter((word) => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const res = find(i, j, root);
        if (res) return true;

        if (root.children.get(board[i][j] && find(i, j, root))) return true;
      }
    }
    return false;
  });

  return match;
};
test("findWords - Trie + DFS", () => {
  expect(
    findWords(
      [
        ["o", "a", "a", "n"],
        ["e", "t", "a", "e"],
        ["i", "h", "k", "r"],
        ["i", "f", "l", "v"],
      ],
      ["oath", "pea", "eat", "rain"]
    )
  ).toEqual(expect.arrayContaining(["oath", "eat"]));

  expect(
    findWords(
      [
        ["a", "b"],
        ["c", "d"],
      ],
      ["abcb"]
    )
  ).toEqual(expect.arrayContaining([]));

  expect(findWords([["a", "a"], ["aaa"]], ["aaa"])).toEqual(
    expect.arrayContaining([])
  );
});
