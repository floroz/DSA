// https://leetcode.com/problems/longest-substring-without-repeating-characters/

// Time Complexity O(N)

// The time complexity of the above algorithm will be O(N) where ‘N’ is the number of characters in the input string.

// Space Complexity  O(K) K = number of distinct character

// The space complexity of the algorithm will be O(K) where K is the number of distinct characters in the input string.This also means K <= NK <= N, because in the worst case, the whole string might not have any repeating character so the entire string will be added to the HashMap.Having said that, since we can expect a fixed set of characters in the input string(e.g., 26 for English letters), we can say that the algorithm runs in fixed space O(1); in this case, we can use a fixed - size array instead of the HashMap.

var lengthOfLongestSubstring = function (s) {
  // keep track of duplicate
  const visited = new Set();

  let left = 0;
  // size of window/substring
  let windowSize = 0;

  // we look at each element with the right pointer
  for (let right = 0; right < s.length; right++) {
    while (visited.has(s[right])) {
      // if the item on the right is in the set
      // we need to increase the left pointer until that's removed
      visited.delete(s[left]);
      left++;
    }

    // once we don't have more duplicate
    // we add the current right and update the size of the window
    visited.add(s[right]);

    const currentSize = right - left + 1;
    windowSize = Math.max(windowSize, currentSize);
  }

  return windowSize;
};

test("lengthOfLongestSubstring", () => {
  expect(lengthOfLongestSubstring("abcabcbb")).toBe(3);
  expect(lengthOfLongestSubstring("bbbbb")).toBe(1);
  expect(lengthOfLongestSubstring("pwwkew")).toBe(3);
  expect(lengthOfLongestSubstring("6^4@25")).toBe(6);
  expect(lengthOfLongestSubstring("  ")).toBe(1);
  expect(lengthOfLongestSubstring("")).toBe(0);
  expect(lengthOfLongestSubstring("aab")).toBe(2);
});
