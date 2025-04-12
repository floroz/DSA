import { describe, expect, it } from "vitest";

/**
 * Trie is a tree-like data structure that stores a dynamic set of strings.
 * It is used to store a dynamic set of strings to allow for quick lookups.
 * It is used in many applications like autocomplete, spell checkers, and IP routing.
 */
class TrieNode {
  isWord = false;
  children: TrieNode[] = [];
  constructor(public value: string) {}

  /**
   * Time complexity: O(n) where n is the length of the word
   */
  add(value: string): void {
    if (!value) {
      return;
    }

    // we are at the end of the word
    if (value.length === 1) {
      const foundNode = this.children.find((node) => node.value === value);

      // if a node already existed, we just mark it as a completed word
      if (foundNode) {
        foundNode.isWord = true;
        return;
      } else {
        // if the node doesn't exist, we create a new node and mark it as a completed word
        const newNode = new TrieNode(value);
        newNode.isWord = true;
        this.children.push(newNode);
        return;
      }
    } else {
      // if we are not at the end of the word, we keep traversing the trie by the next char
      const char = value[0];
      value = value.slice(1);

      const foundNode = this.children.find((node) => node.value === char);

      // if the node already exists, we keep traversing
      if (foundNode) {
        foundNode.add(value);
      } else {
        // if the node doesn't exist, we create a new node and keep traversing
        const newNode = new TrieNode(char);
        this.children.push(newNode);
        newNode.add(value);
      }
    }
  }

  /**
   * Time complexity: O(n) where n is the length of the word
   */
  delete(word: string) {
    if (!word) {
      return false;
    }

    if (word.length === 1) {
      const foundNode = this.children.find((node) => node.value === word);

      if (foundNode) {
        foundNode.isWord = false;
        return true;
      }
      return false;
    } else {
      const char = word[0];
      word = word.slice(1);

      const foundNode = this.children.find((node) => node.value === char);

      if (foundNode) {
        return foundNode.delete(word);
      }
      return false;
    }
  }

  /**
   * Time complexity: O(n) where n is the length of the word
   */
  find(word: string) {
    if (!word) {
      return this.isWord;
    }

    const char = word[0];
    word = word.slice(1);

    const foundNode = this.children.find((node) => node.value === char);

    if (foundNode) {
      return foundNode.find(word);
    }

    return false;
  }
}

class Trie {
  #root = new TrieNode("");

  add(value: string) {
    return this.#root.add(value);
  }
  delete(word: string) {
    return this.#root.delete(word);
  }

  find(word: string): boolean {
    return this.#root.find(word);
  }
}

describe("Tries", () => {
  it("should insert word", () => {
    const trie = new Trie();
    trie.add("hello");
    expect(trie.find("hello")).toBe(true);
  });

  it("should delete word", () => {
    const trie = new Trie();
    trie.add("hello");
    trie.delete("hello");
    expect(trie.find("hello")).toBe(false);
  });

  it("should not find word", () => {
    const trie = new Trie();
    trie.add("hello");
    expect(trie.find("hello")).toBe(true);
    expect(trie.find("world")).toBe(false);
  });

  it("should delete a prefix word", () => {
    const trie = new Trie();
    trie.add("hello");
    trie.add("helloworld");
    expect(trie.find("hello")).toBe(true);
    trie.delete("hello");
    expect(trie.find("hello")).toBe(false);
    expect(trie.find("helloworld")).toBe(true);
  });
});
