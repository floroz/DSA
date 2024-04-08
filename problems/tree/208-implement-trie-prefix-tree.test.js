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

class Trie {
  root = new TrieNode();

  insert(word) {
    function dfs(node, word) {
      if (word) {
        const char = word[0];
        // more characther to add
        if (!node.children.has(char)) {
          // shift first character as new node and add to parent children map
          node.children.set(char, new TrieNode());
          // continue with the next characters
        }
        return dfs(node.children.get(char), word.substr(1));
      } else {
        // nothing left to add, let's mark the last character as the
        // end of the word
        node.end = true;
      }
    }

    dfs(this.root, word);
  }

  find(word) {
    function dfs(node, word) {
      // returns undefined if the node doesn't exist
      if (!node) return undefined;

      // if the word exist
      if (word) {
        const char = word[0];
        if (node.children.has(char)) {
          const nextNode = node.children.get(char);

          return dfs(nextNode, word.substr(1));
        } else {
          // char is not present in the children map
          // means our word doesn't exist in the Trie
          return undefined;
        }
        // we're done searching and we can return the node matching
        // the last char
      } else return node;
    }

    return dfs(this.root, word);
  }

  search(word) {
    const node = this.find(word);

    return node ? node.end : false;
  }

  startsWith(prefix) {
    const node = this.find(prefix);

    return !!node;
  }
}

test("#1 examples", () => {
  const trie = new Trie();

  trie.insert("apple");

  expect(trie.search("apple")).toBeTruthy();
  expect(trie.search("app")).toBeFalsy();
  expect(trie.startsWith("app")).toBeTruthy();

  trie.insert("app");

  expect(trie.search("app")).toBeTruthy();
});
