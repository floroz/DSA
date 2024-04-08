// https://leetcode.com/problems/minimum-window-substring/

// Time Complexity O(N + M)

// The time complexity of the above algorithm will be O(N + M) where ‘N’ and ‘M’ are the number of characters in the input string and the pattern respectively.

// Space Complexity O(M)

// The space complexity of the algorithm is O(M) since in the worst case, the whole pattern can have distinct characters which will go into the HashMap. In the worst case, we also need O(N)O(N) space for the resulting substring, which will happen when the input string is a permutation of the pattern.

/**
 * @param {string} str
 * @param {string} pattern
 * @return {string}
 */
var minWindow = function (str, pattern) {
  // edge cases
  if (!str || pattern.length > str.length) return "";
  if (!pattern) return str;

  let minWindow = "";

  const frequencyMap = new Map();

  // build frequency map
  for (let char of pattern) {
    if (!frequencyMap.get(char)) frequencyMap.set(char, 0);
    frequencyMap.set(char, frequencyMap.get(char) + 1);
  }

  // keep track of chars matched
  let matched = 0;

  // slow pointer
  let left = 0;

  for (let right = 0; right < str.length; right++) {
    let char = str[right];

    if (frequencyMap.has(char)) {
      const newFrequency = frequencyMap.get(char) - 1;

      if (newFrequency === 0) matched++;

      frequencyMap.set(char, newFrequency);

      while (matched === frequencyMap.size) {
        const currentWindow = str.substring(left, right + 1);

        if (!minWindow) {
          // no result set yet, update with current
          minWindow = currentWindow;
        } else {
          minWindow =
            // update window with the smallest one
            minWindow.length > currentWindow.length ? currentWindow : minWindow;
        }

        // shrink window
        const previous = str[left];
        left++;

        // update frequency map if left char was included
        if (frequencyMap.has(previous)) {
          const freq = frequencyMap.get(previous);

          if (freq === 0) matched--;

          frequencyMap.set(previous, freq + 1);
        }
      }
    }
  }

  return minWindow;
};

test("minWindow", () => {
  expect(minWindow("ADOBECODEBANC", "ABC")).toBe("BANC");
  expect(minWindow("a", "a")).toBe("a");
  expect(minWindow("a", "aa")).toBe("");
  expect(minWindow("aa", "aa")).toBe("aa");
});
