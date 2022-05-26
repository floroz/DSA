/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function (s) {
  let count = 0;

  const countSub = (i, j) => {
    while (i >= 0 && j < s.length && s[i] === s[j]) {
      count++;
      i--;
      j++;
    }
  };

  for (let i = 0; i < s.length; i++) {
    // check for ODD palindromes
    countSub(i, i);
    // check for EVEN palindromes
    countSub(i, i + 1);
  }

  return count;
};

test("longestPalindrome", () => {
  expect(countSubstrings("abc")).toBe(3);
  expect(countSubstrings("aaa")).toBe(6);
});
