/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  let longest = "";

  const findLongestPalindrome = (str, i, j) => {
    while (i >= 0 && j < str.length && str[i] === str[j]) {
      i -= 1;
      j += 1;
    }
    // last two valid indexes before the loop broke, where i+1 and j-1
    // because the second index of slice is non-inclusive, we can simply pass j (but it will return an array until, and including j-1)
    return str.slice(i + 1, j);
  };

  // loop through each character as a starting middle
  for (let i = 0; i < s.length; i++) {
    // ODD palindrome where we start from it's midpoint
    const current1 = findLongestPalindrome(s, i, i);
    // EVEN palindrome where we start already by comparing a char with its neighbour
    const current2 = findLongestPalindrome(s, i, i + 1);

    // find longest result
    const longerPalindrome =
      current1.length > current2.length ? current1 : current2;

    // if local result is greater than our final result, update it
    if (longerPalindrome.length > longest.length) {
      longest = longerPalindrome;
    }
  }
  return longest.length > 1 ? longest : "";
};

test("longestPalindrome", () => {
  expect(longestPalindrome("babad")).toBe("bab");
  expect(longestPalindrome("cbbd")).toBe("bb");
  expect(longestPalindrome("abcdefghi")).toBe("");
});
