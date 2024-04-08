// https://leetcode.com/problems/valid-parentheses/

// Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

// An input string is valid if:

// Open brackets must be closed by the same type of brackets.
// Open brackets must be closed in the correct order.

// Example 1:

// Input: s = "()"
// Output: true
// Example 2:

// Input: s = "()[]{}"
// Output: true
// Example 3:

// Input: s = "(]"
// Output: false

var isValid = function (s) {
  const stack = [];

  for (let i = 0; i < s.length; i++) {
    let c = s.charAt(i);
    switch (c) {
      case "(":
        stack.push(")");
        break;
      case "[":
        stack.push("]");
        break;
      case "{":
        stack.push("}");
        break;
      default:
        if (c !== stack.pop()) {
          return false;
        }
    }
  }

  return stack.length === 0;
};

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid_recursion = function (s) {
  if (!s || !s.trim().length) return true;

  const cleanup = (sub) => {
    if (!sub) return true;
    else if (sub.includes("[]")) {
      return cleanup(sub.replace("[]", ""));
    } else if (sub.includes("()")) {
      return cleanup(sub.replace("()", ""));
    } else if (sub.includes("{}")) {
      return cleanup(sub.replace("{}", ""));
    } else {
      return false;
    }
  };

  return cleanup(s);
};

test("should ", () => {
  expect(isValid("()[]{}")).toBeTruthy();
  expect(isValid("([)]")).toBeFalsy();
  expect(
    isValid("(((((((((({{{{{{{{{((((([][)]))))}}}}}}}}}))))))))))")
  ).toBeFalsy();
});
