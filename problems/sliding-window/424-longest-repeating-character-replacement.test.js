//https://leetcode.com/problems/longest-repeating-character-replacement/

// Time Complexity O(N)

// The time complexity of the above algorithm will be O(N) where ‘N’ is the number of letters in the input string.

// Space Complexity O(1)

// As we are expecting only the lower case letters in the input string, we can conclude that the space complexity will be O(26), to store each letter’s frequency in the HashMap, which is asymptotically equal to O(1).

/**
 * @param {string} str
 * @param {number} k
 * @return {number}
 */
const characterReplacement = (str, k) => {
  const frequencyMap = {};
  let maxWindow = 0;
  let mostRepeatedCharCount = 0;
  let left = 0;

  for (let right = 0; right < str.length; right++) {
    // next character we're looking at
    const char = str[right];
    // update the count of the char
    if (!frequencyMap[char]) frequencyMap[char] = 0;
    frequencyMap[char]++;

    // we track of the most repeating character
    mostRepeatedCharCount = Math.max(mostRepeatedCharCount, frequencyMap[char]);

    // the most repeated character is what we need to understand how the size
    // of the window compare against it.
    // we can take the size of the window, subtract our most repeated character count, and also substract the K swaps we're allowed to do.
    // if we're left with any excess character, it means our window won't be valid

    // Example 1: window is 'AAABAC' and K = 1
    // window size is 6, the mostRepeatedCharCount is 4 ('A')
    // Then (6 - 4) = 2   ---> 2 > K ---> true
    // NOT VALID

    // Example 2: window is 'AACAAC' and K = 2
    // window size is 6, mostRepeatedCharCount is 4 ('A')
    // (windowSize - mostRepeatedCharCount) = 2
    //  2  > K (2) ? false
    // IS VALID

    while (right - left + 1 - mostRepeatedCharCount > k) {
      // let's decrease the occurances of the left element
      // and shift our left pointer forward
      frequencyMap[str[left]]--;
      left++;
    }

    // update max window with latest windowSize
    maxWindow = Math.max(maxWindow, right - left + 1);
  }

  return maxWindow;
};

test("characterReplacement", () => {
  expect(characterReplacement("ABAB", 2)).toBe(4);
  expect(characterReplacement("AABABBA", 1)).toBe(4);
  expect(characterReplacement("ABBB", 2)).toBe(4);
});
