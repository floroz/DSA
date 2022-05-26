// https://leetcode.com/problems/group-anagrams/

// Given an array of strings strs, group the anagrams together. You can return the answer in any order.

// An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

// Example 1:

// Input: strs = ["eat","tea","tan","ate","nat","bat"]
// Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
// Example 2:

// Input: strs = [""]
// Output: [[""]]
// Example 3:

// Input: strs = ["a"]
// Output: [["a"]]

// O(S*N Log N)
var groupAnagrams = function (strs) {
  if (!strs.length) return [];

  if (strs.length === 1) return [[strs[0]]];

  // we sort all the strings so anagrams will simply be duplicated
  const sorted = strs.map((str) => str.split("").sort().join(""));

  // we create a map to be able to create groups
  const map = {};

  // for every item, we add the position of the index (which reflects the original input position) to match a specific set of anagrams
  for (let i = 0; i < sorted.length; i++) {
    const groups = map[sorted[i]] || [];
    map[sorted[i]] = [...groups, i];
  }

  const res = [];

  // for all the groups we've created, we collect the indexes and return the item from the original array
  Object.values(map).forEach((group) =>
    res.push(group.map((idx) => strs[idx]))
  );

  return res;
};

test("1- groupAnagrams", () => {
  expect(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"])).toEqual(
    expect.arrayContaining([[["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]])
  );
});

// Time Complexity: O(n*k) where n is the size of input array and k is the maximum length of string in input array
// Space Complexity: O(n)
var groupAnagrams2 = function (strs) {
  let res = {};

  for (let str of strs) {
    let count = new Array(26).fill(0);

    for (let char of str) {
      count[char.charCodeAt() - "a".charCodeAt()]++; // ASCI value subtraction
    }

    // we create an identifier by serializing the alphabet count to a string
    // if two words have the same string 'key', then they're anagrams
    let key = count.join("-");

    if (res[key]) {
      res[key].push(str);
    } else {
      res[key] = [str];
    }
  }

  return Object.values(res);
};

test("2- groupAnagrams", () => {
  expect(groupAnagrams2(["eat", "tea", "tan", "ate", "nat", "bat"])).toEqual(
    expect.arrayContaining([[["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]])
  );
});
