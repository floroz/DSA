// https://leetcode.com/problems/longest-substring-without-repeating-characters/

// Time Complexity = O(N)
// Space Complexity = O(N)

var lengthOfLongestSubstring = function (s) {
  // keep track of duplicate
  const seen = new Set();

  // left pointer
  let left = 0;
  // size of window/substring
  let windowSize = 0;

  // we look at each element with the right pointer
  for (let right = 0; right < s.length; right++) {
    while (seen.has(s[right])) {
      // if the item on the right is in the set
      // we need to increase the left pointer until that's removed
      seen.delete(s[left]);
      left++;
    }

    // once we don't have more duplicate
    // we add the current right and update the size of the window
    seen.add(s[right]);
    windowSize = Math.max(windowSize, right - left + 1);
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
