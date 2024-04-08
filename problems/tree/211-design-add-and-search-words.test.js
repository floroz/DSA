// https://leetcode.com/problems/design-add-and-search-words-data-structure/

// Design a data structure that supports adding new words and finding if a string matches any previously added string.

// Implement the WordDictionary class:

// WordDictionary() Initializes the object.
// void addWord(word) Adds word to the data structure, it can be matched later.
// bool search(word) Returns true if there is any string in the data structure that matches word or false otherwise. word may contain dots '.' where dots can be matched with any letter.

// Example:

// Input
// ["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
// [[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]
// Output
// [null,null,null,null,false,true,true,true]

// Explanation
// WordDictionary wordDictionary = new WordDictionary();
// wordDictionary.addWord("bad");
// wordDictionary.addWord("dad");
// wordDictionary.addWord("mad");
// wordDictionary.search("pad"); // return False
// wordDictionary.search("bad"); // return True
// wordDictionary.search(".ad"); // return True
// wordDictionary.search("b.."); // return True

class TrieNode {
  constructor() {
    this.children = new Map();
    this._end = false;
  }

  get end() {
    return this._end;
  }

  set end(v) {
    this._end = !!v;
  }
}

/**
 * Tries or Prefix Tree is a tree that can have up to 27 children for each node.
 */
class WordDictionary {
  root = new TrieNode();

  addWord(word) {
    function dfs(node, word) {
      if (word) {
        if (!node.children.has(word[0]))
          node.children.set(word[0], new TrieNode());
        return dfs(node.children.get(word[0]), word.substr(1));
      } else {
        node.end = true;
      }
    }

    dfs(this.root, word);
  }

  search(word) {
    let node = this.root;

    function dfs(node, word) {
      // returns false if the node doesn't exist
      if (!node) return false;

      // if the word exist
      if (word) {
        //skipping any calculation if the word[0] is .

        if (word[0] === ".") {
          // Since we don't know what should be the next node so, need to go through all of them one by one
          let out = false;
          for (let val of node.children.keys()) {
            // Any one of the nodes will return true for the upcoming character in word after .
            // So, taking an OR operation
            out = out || dfs(node.children.get(val), word.substr(1));
          }
          return out;
        } else if (node.children.has(word[0])) {
          // If the node has encountered a word then the simple stuff
          return dfs(node.children.get(word[0]), word.substr(1));
        }
        // otherwise return false when the above two are false
        else {
          return false;
        }
      }
      // If the word doesn't exist but it could have existed so just checking if the node is the end node and returning the result
      else return node.end;
    }

    return dfs(node, word);
  }
}

test("#1 examples", () => {
  const trie = new WordDictionary();

  trie.addWord("bad");
  trie.addWord("dad");
  trie.addWord("mad");

  expect(trie.search("bad")).toBeTruthy();
  expect(trie.search("dad")).toBeTruthy();
  expect(trie.search("fad")).toBeFalsy();
  expect(trie.search(".ad")).toBeTruthy();
  expect(trie.search("..d")).toBeTruthy();
  expect(trie.search("...")).toBeTruthy();
  expect(trie.search("b..")).toBeTruthy();
  expect(trie.search("ba.")).toBeTruthy();
});

test("#2 - examples", () => {
  const trie = new WordDictionary();

  trie.addWord("a");
  trie.addWord("ab");

  expect(trie.search("a")).toBeTruthy();
  expect(trie.search("a.")).toBeTruthy();
  expect(trie.search("ab")).toBeTruthy();
  expect(trie.search(".b")).toBeTruthy();
  expect(trie.search(".a")).toBeFalsy();
  expect(trie.search("ab.")).toBeFalsy();
  expect(trie.search(".ab")).toBeFalsy();
  expect(trie.search(".")).toBeTruthy();
  expect(trie.search("..")).toBeTruthy();
});

test("#3 - examples", () => {
  const trie = new WordDictionary();

  trie.addWord("at");
  trie.addWord("and");
  trie.addWord("an");
  trie.addWord("add");

  expect(trie.search("a")).toBeFalsy();
  expect(trie.search(".at")).toBeFalsy();

  trie.addWord("bat");

  expect(trie.search(".at")).toBeTruthy();
  expect(trie.search("an.")).toBeTruthy();
  expect(trie.search("a.d")).toBeTruthy();
  expect(trie.search("b.")).toBeFalsy();
  expect(trie.search(".")).toBeFalsy();

  expect(trie.search("a.d.")).toBeFalsy();
});
