// https://leetcode.com/problems/word-search-ii/

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
  const trie = new TrieNode();
  const res = [];

  for (let word of words) {
    trie.addWord(word);
  }

  //Here we loop through entire board, if char at those coords is in
  //our trie on the root level, we call our traverse function.
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      const char = board[row][col];
      if (trie.children.has(char)) traverse(row, col);
    }
  }

  return res;

  //Function takes row, col and node.  First time called, node is root
  //level of our trie, as the function runs node stays in sync with where
  //our recursive calls are at.
  function traverse(row, col, node = trie, str = "") {
    //Further down in this function we set board[row][col] to 0 before trying
    //neighboring coordinates.  The line below keeps us from visiting the same
    //cell more than once.
    if (!board[row][col]) return;

    //Here we capture the char on the board at coords, and we also move down
    //within the trie to the level that matches that char.
    const char = board[row][col];
    const curNode = node.children.get(char);

    //If there is no curNode (I.e.- Current letter not within our trie node),
    //we return, because our sequence of correct letters has been broken.
    if (!curNode) return;

    // let's continue build the string we've search so far
    // in our prefix tree
    str += char;

    //If current node is a Word, we push the word we build so far
    // We then set end to null to keep from pushing the same word more than once.
    if (curNode.isWord) {
      res.push(str);
      curNode.isWord = false;
    }

    //Here we set board[row][col] to 0 in order to keep track of where we
    //have already visited.  Then we try all options and set it back afterward.
    board[row][col] = 0;
    if (col - 1 >= 0) traverse(row, col - 1, curNode, str);
    if (col + 1 < board[row].length) traverse(row, col + 1, curNode, str);
    if (row - 1 >= 0) traverse(row - 1, col, curNode, str);
    if (row + 1 < board.length) traverse(row + 1, col, curNode, str);
    board[row][col] = char;
  }
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
