// https://leetcode.com/problems/substring-with-concatenation-of-all-words/

// Time Complexity O(N * M * Len)

// The time complexity of the above algorithm will be O(N * M * Len) where ‘N’ is the number of characters in the given string, ‘M’ is the total number of words, and ‘Len’ is the length of a word.

// Space Complexity O(M+N)

// The space complexity of the algorithm is O(M) since at most, we will be storing all the words in the two HashMaps. In the worst case, we also need O(N)space for the resulting list. So, the overall space complexity of the algorithm will be O(M+N).

/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
var findSubstring = function (str, words) {
  if (!words || !words.length) return [];

  const wordFrequency = {};

  for (let word of words) {
    if (!(word in wordFrequency)) {
      wordFrequency[word] = 0;
    }

    wordFrequency[word]++;
  }

  const result = [];

  const wordsCount = words.length;
  const wordLength = words[0].length;

  const len = wordsCount * wordLength;

  for (let i = 0; i < str.length - len + 1; i++) {
    const wordSeen = {};

    for (let j = 0; j < wordsCount; j++) {
      const nextWordIndex = i + j * wordLength;

      // Get the next word from the string
      const word = str.substring(nextWordIndex, nextWordIndex + wordLength);

      // Add the word to the wordsSeen map
      if (!(word in wordSeen)) {
        wordSeen[word] = 0;
      }

      wordSeen[word]++;

      // No need to process further if the word
      // has higher frequency than required
      if (wordSeen[word] > (wordFrequency[word] || 0)) {
        break;
      }

      if (j + 1 === wordsCount) {
        // if we found all words store the index
        result.push(i);
      }
    }
  }

  return result;
};

test("findSubstring", () => {
  expect(findSubstring("barfoothefoobarman", ["foo", "bar"])).toEqual([0, 9]);

  expect(
    findSubstring("wordgoodgoodgoodbestword", ["word", "good", "best", "word"])
  ).toEqual([]);

  expect(
    findSubstring("barfoofoobarthefoobarman", ["bar", "foo", "the"])
  ).toEqual([6, 9, 12]);

  expect(findSubstring("ababaab", ["ab", "ba", "ba"])).toEqual([1]);

  expect(findSubstring("ababaab", ["ab", "ba", "ba"])).toEqual([1]);
});
