//https://leetcode.com/problems/longest-repeating-character-replacement/

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
const characterReplacement = (str, k) => {
  const charCount = {};
  let maxWindow = 0;
  let maxCharCount = 0;
  let left = 0;

  for (let right = 0; right < str.length; right++) {
    // next character we're looking at
    const char = str[right];
    // update the count of the char
    charCount[char] = charCount[char] ? charCount[char] + 1 : 1;

    if (charCount[char] > maxCharCount) maxCharCount = charCount[char];

    // if the difference between the size of the window, and the
    // occurrances of our most present character is greater than K
    // it means the window is not valid
    // Example: window is 'AAABAC' and K = 1
    // The length is 6, the max occurance is 4 (four times 'A')
    // Then (6 - 4) = 2   ---> 2 > K ---> true
    // The window would not be valid
    while (right - left + 1 - maxCharCount > k) {
      // let's decrease the occurances of the left element
      // and shift our left pointer forward
      charCount[str[left]]--;
      left++;
    }

    // update window size
    maxWindow = Math.max(maxWindow, right - left + 1);
  }

  return maxWindow;
};

test("characterReplacement", () => {
  expect(characterReplacement("ABAB", 2)).toBe(4);
  expect(characterReplacement("AABABBA", 1)).toBe(4);
  expect(characterReplacement("ABBB", 2)).toBe(4);
});
