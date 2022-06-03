// https://leetcode.com/problems/longest-string-chain/

// 1. Sort the words by length, shortst to longest
// 2. For every word, we check if the predecesor that makes up this word exists. If no, we set the chain value for this word to 1, if yes, we'll increase it by one.

// For example, with the array of words ['a', 'b', 'ba', 'bca', 'bda', 'bdca'], for the first word a, since it's length is only 1, there is no predecor that can make this current word, hence we set in our memory a:1, same with b.

// Now when we get to ba, we remove b from ba, and we can imagine the word as no _ a, we ask ourselves, does a exist in memory?
// yes it does, which means, we have a letter in memory that could complete the full word ba (It might look like we are trying to fill in the blank for the letter b, but we are actually saying, 'okay, if we have the value b already, does a exist in memory?'

// since it does, our chain value for ba is 2, because a --> ba

var longestStrChain = function (words) {
  var dp = {};

  words.sort((a, b) => a.length - b.length);

  for (var word of words) {
    let longest = 0;

    for (var i = 0; i < word.length; i++) {
      const pre = word.slice(0, i) + word.slice(i + 1);
      longest = Math.max(longest, (dp[pre] || 0) + 1);
    }

    dp[word] = longest;
  }

  return Math.max(...Object.values(dp));
};

test("longestStrChain", () => {
  expect(longestStrChain(["a", "b", "ba", "bca", "bda", "bdca"])).toBe(4);
  expect(longestStrChain(["xbc", "pcxbcf", "xb", "cxbc", "pcxbc"])).toBe(5);
  expect(longestStrChain(["a", "b", "ab", "bac"])).toBe(2);
});
