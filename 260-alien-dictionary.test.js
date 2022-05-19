// https://leetcode.com/problems/alien-dictionary/
// There is a new alien language that uses the English alphabet. However, the order among the letters is unknown to you.

// You are given a list of strings words from the alien language's dictionary, where the strings in words are sorted lexicographically by the rules of this new language.

// Return a string of the unique letters in the new alien language sorted in lexicographically increasing order by the new language's rules. If there is no solution, return "". If there are multiple solutions, return any of them.

// A string s is lexicographically smaller than a string t if at the first letter where they differ, the letter in s comes before the letter in t in the alien language. If the first min(s.length, t.length) letters are the same, then s is smaller if and only if s.length < t.length.

// Example 1:
// Input: words = ["wrt","wrf","er","ett","rftt"]
// Output: "wertf"

// Example 2:
// Input: words = ["z","x"]
// Output: "zx"

// Example 3:
// Input: words = ["z","x","z"]
// Output: ""
// Explanation: The order is invalid, so return "".

export var alienOrder = function (words) {
  let graph = {};
  words.forEach((word) => {
    word.split("").forEach((char) => (graph[char] = []));
  }); // initialize graph entry for every character
  // build the relationship graph
  for (let i = 0; i < words.length - 1; i++) {
    let top = words[i];
    let down = words[i + 1];
    let minLength = Math.min(top.length, down.length);
    for (let j = 0; j < minLength; j++) {
      if (top[j] != down[j]) {
        graph[top[j]].push(down[j]);
        break; // only need to find the first pair
      }
    }
  }
  let visiting = new Set(),
    visited = new Set(),
    result = [];
  // regular graph dfs
  var dfs = function (char) {
    if (visiting.has(char)) return false;
    if (visited.has(char)) return true;
    visiting.add(char);
    for (let n of graph[char]) {
      if (!dfs(n)) return false;
    }
    visiting.delete(char);
    visited.add(char);
    result.push(char);
    return true;
  };

  for ([key, val] of Object.entries(graph)) {
    if (!dfs(key)) return "";
  }
  return result.reverse().join("");
};

test("should work", () => {
  expect(alienOrder(["wrt", "wrf", "er", "ett", "rftt"])).toBe("wertf");
  expect(alienOrder(["z", "x"])).toBe("zx");
  expect(alienOrder(["z", "x", "z"])).toBe("");
  expect(alienOrder(["abc", "abcd", "frtw"])).toBe("");
});
