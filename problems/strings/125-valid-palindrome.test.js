// https://leetcode.com/problems/valid-palindrome/

/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  s = s.trim();

  if (!s) return true;

  s = s.toLowerCase().replace(/[^0-9a-zA-Z]/g, "");

  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    if (s[left] !== s[right]) return false;

    left++;
    right--;
  }

  return true;
};

test("Two Pointers - isPalindrome", () => {
  expect(isPalindrome("A man, a plan, a canal: Panama")).toBeTruthy();
  expect(isPalindrome(" ")).toBeTruthy();
  expect(isPalindrome("ab_a")).toBeTruthy();
  expect(isPalindrome("race a car")).toBeFalsy();
});

var isPalindrome2 = function (s) {
  let a = s
    .trim()
    .toLowerCase()
    .replace(/[^0-9a-zA-Z]/g, "");
  let b = a.split("").reverse().join("");

  return a === b;
};

test("Reverse - isPalindrome", () => {
  expect(isPalindrome2("A man, a plan, a canal: Panama")).toBeTruthy();
  expect(isPalindrome2(" ")).toBeTruthy();
  expect(isPalindrome2("ab_a")).toBeTruthy();
  expect(isPalindrome2("race a car")).toBeFalsy();
});
