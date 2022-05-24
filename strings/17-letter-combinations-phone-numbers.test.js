// https://leetcode.com/problems/letter-combinations-of-a-phone-number/

// Given a string containing digits from 2 - 9 inclusive, return all possible letter combinations that the number could represent.Return the answer in any order.
// A mapping of digit to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.
// ****** visual example: https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Telephone-keypad2.svg/200px-Telephone-keypad2.svg.png

// Example 1
// Input: digits = "23"
// Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
// Example 2:

// Input: digits = ""
// Output: []
// Example 3:
// Input: digits = "2"
// Output: ["a","b","c"]

// ****** Constraints:

// 0 <= digits.length <= 4
// digits[i] is a digit in the range ['2', '9'].

// Time O(3^N * 4^M)
//   N is the number of digits in the input that maps to 3 letters (e.g. 2, 3, 4, 5, 6, 8)
//   M is the number of digits in the input that maps to 4 letters (e.g. 7, 9)
//
// Space O(3^N * 4^M) since one has to keep O(3^N * 4^M) solutions.
var letterCombinations = function (digits) {
  if (!digits || digits.length === 0) return [];

  const digitMap = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };

  const res = [];

  const backtrack = (i, str) => {
    if (i === digits.length) {
      res.push(str);
      return;
    }

    const digit = digits[i];

    for (const char of digitMap[digit]) {
      const ans = str + char;
      backtrack(i + 1, ans);
    }
  };

  backtrack(0, "");

  return res;
};

// const phone = {
//   2: ["a", "b", "c"],
//   3: ["d", "e", "f"],
//   4: ["g", "h", "i"],
//   5: ["j", "k", "l"],
//   6: ["m", "m", "o"],
//   7: ["p", "q", "r", "s"],
//   8: ["t", "u", "v"],
//   9: ["v", "w", "y", "z"],
// };
