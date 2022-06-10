// https://leetcode.com/problems/find-all-anagrams-in-a-string
// For detail explanation, the same pattern and algorithm is explained in sliding-window/567-permutation-in-string.test.js

// Time Complexity: O(N) N is the input size of s
// Space Complexity O(K) K is the input size of p (necessary to build our frequency map)

/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
  let frequencyMap = new Map();

  // build a frequency map
  for (let char of p) {
    if (!frequencyMap.has(char)) frequencyMap.set(char, 0);
    frequencyMap.set(char, frequencyMap.get(char) + 1);
  }

  let match = 0;

  let startIndices = [];

  let left = 0;

  const windowSize = p.length;

  for (let right = 0; right < s.length; right++) {
    let rightChar = s[right];

    if (frequencyMap.has(rightChar)) {
      const newFreq = frequencyMap.get(rightChar) - 1;

      if (newFreq === 0) match++;

      if (match === frequencyMap.size) startIndices.push(left);

      frequencyMap.set(rightChar, newFreq);
    }

    // if our window is not fully expanded yet
    // let's move on with the next iteration
    if (right - left + 1 === windowSize) {
      const leftChar = s[left];

      if (frequencyMap.has(leftChar)) {
        const freq = frequencyMap.get(leftChar);

        if (freq === 0) match--;

        frequencyMap.set(leftChar, freq + 1);
      }

      left++;
    }
  }

  return startIndices;
};

test("findAnagrams", () => {
  expect(findAnagrams("cbaebabacd", "abc")).toEqual(
    expect.arrayContaining([0, 6])
  );
  expect(findAnagrams("abab", "ab")).toEqual(expect.arrayContaining([0, 1, 2]));
});
